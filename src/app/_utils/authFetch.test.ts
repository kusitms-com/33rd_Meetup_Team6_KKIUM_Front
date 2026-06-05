function createSessionStorage() {
  const store = new Map<string, string>();

  return {
    getItem: jest.fn((key: string) => store.get(key) ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: jest.fn((key: string) => {
      store.delete(key);
    }),
  };
}

function mockBrowserSession() {
  const sessionStorage = createSessionStorage();
  const replace = jest.fn();

  Object.defineProperty(globalThis, 'window', {
    value: {
      sessionStorage,
      location: {
        pathname: '/experience',
        replace,
      },
    },
    configurable: true,
  });

  return {
    replace,
    sessionStorage,
  };
}

function createApiResponse(data: unknown, status = 200) {
  return new Response(
    JSON.stringify({
      status,
      code: 'SUCCESS',
      message: 'OK',
      data,
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

describe('requestSocialLogin', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });
  });

  test('adds local redirect type when kakao redirect uri is localhost', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.kkium.com';
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI =
      'http://localhost:3000/oauth/kakao/callback';

    const fetchMock = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 200,
          code: 'SUCCESS',
          message: 'OK',
          data: {
            accessToken: 'access-token',
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    global.fetch = fetchMock;

    const { requestSocialLogin } = await import('./authFetch');

    await requestSocialLogin('kakao', 'authorization-code');

    const requestUrl = new URL(fetchMock.mock.calls[0][0]);

    expect(requestUrl.searchParams.get('redirectType')).toBe('LOCAL');
  });

  test('includes credentials so refresh token cookie can be stored', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.kkium.com';
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI =
      'http://localhost:3000/oauth/google/callback';

    const fetchMock = jest.fn().mockResolvedValue(createApiResponse({ accessToken: 'access-token' }));
    global.fetch = fetchMock;

    const { requestSocialLogin } = await import('./authFetch');

    await requestSocialLogin('google', 'authorization-code');

    expect(fetchMock.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        credentials: 'include',
      }),
    );
  });
});

describe('authFetch token reissue', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_BASE_URL: 'https://api.kkium.com/api/v1',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });
  });

  test('reissues access token and retries original request once after 401', async () => {
    const { sessionStorage } = mockBrowserSession();
    sessionStorage.setItem('mg_access_token', 'expired-token');

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(createApiResponse({ accessToken: 'new-token' }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));
    global.fetch = fetchMock;

    const { authFetch, getAccessTokenFromSession } = await import('./authFetch');

    const response = await authFetch('experiences');

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(new URL(fetchMock.mock.calls[1][0]).pathname).toBe('/api/v1/auth/reissue');
    expect(fetchMock.mock.calls[1][1]).toEqual(
      expect.objectContaining({
        credentials: 'include',
        method: 'POST',
      }),
    );
    expect((fetchMock.mock.calls[2][1].headers as Headers).get('Authorization')).toBe(
      'Bearer new-token',
    );
    expect(getAccessTokenFromSession()).toBe('new-token');
  });

  test('redirects to login when token reissue fails', async () => {
    const { replace, sessionStorage } = mockBrowserSession();
    sessionStorage.setItem('mg_access_token', 'expired-token');

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 401 }));
    global.fetch = fetchMock;

    const { authFetch, getAccessTokenFromSession } = await import('./authFetch');

    await expect(authFetch('experiences')).rejects.toThrow('Unauthorized');

    expect(getAccessTokenFromSession()).toBeNull();
    expect(replace).toHaveBeenCalledWith('/login');
  });

  test('shares one token reissue request across concurrent 401 responses', async () => {
    const { sessionStorage } = mockBrowserSession();
    sessionStorage.setItem('mg_access_token', 'expired-token');

    const fetchMock = jest.fn((input: string) => {
      const url = new URL(input);
      if (url.pathname === '/api/v1/auth/reissue') {
        return Promise.resolve(createApiResponse({ accessToken: 'new-token' }));
      }
      const headers = fetchMock.mock.calls.at(-1)?.[1]?.headers as Headers | undefined;
      if (headers?.get('Authorization') === 'Bearer new-token') {
        return Promise.resolve(new Response('ok', { status: 200 }));
      }
      return Promise.resolve(new Response(null, { status: 401 }));
    });
    global.fetch = fetchMock;

    const { authFetch } = await import('./authFetch');

    await Promise.all([authFetch('experiences'), authFetch('users/me')]);

    const reissueCallCount = fetchMock.mock.calls.filter(
      ([input]) => new URL(input).pathname === '/api/v1/auth/reissue',
    ).length;

    expect(reissueCallCount).toBe(1);
  });
});

describe('requestLogout', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_BASE_URL: 'https://api.kkium.com/api/v1',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });
  });

  test('calls logout api with credentials and clears local access token', async () => {
    const { sessionStorage } = mockBrowserSession();
    sessionStorage.setItem('mg_access_token', 'access-token');

    const fetchMock = jest.fn().mockResolvedValue(new Response(null, { status: 200 }));
    global.fetch = fetchMock;

    const { getAccessTokenFromSession, requestLogout } = await import('./authFetch');

    await requestLogout();

    expect(new URL(fetchMock.mock.calls[0][0]).pathname).toBe('/api/v1/auth/logout');
    expect(fetchMock.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        credentials: 'include',
        method: 'POST',
      }),
    );
    expect(getAccessTokenFromSession()).toBeNull();
  });

  test('clears local access token even when logout api fails', async () => {
    const { sessionStorage } = mockBrowserSession();
    sessionStorage.setItem('mg_access_token', 'access-token');

    const fetchMock = jest.fn().mockRejectedValue(new Error('network error'));
    global.fetch = fetchMock;

    const { getAccessTokenFromSession, requestLogout } = await import('./authFetch');

    await expect(requestLogout()).rejects.toThrow('network error');

    expect(getAccessTokenFromSession()).toBeNull();
  });
});
