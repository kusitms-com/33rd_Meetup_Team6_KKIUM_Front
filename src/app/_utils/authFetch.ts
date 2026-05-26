const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCESS_TOKEN_STORAGE_KEY = 'mg_access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'mg_refresh_token';

interface AuthFetchInit extends Omit<RequestInit, 'headers'> {
  headers?: HeadersInit;
}

interface SocialLoginData {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
}

interface SocialLoginResponse {
  status: number;
  code: string;
  message: string;
  data?: SocialLoginData;
}

function buildApiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set.');
  }

  const baseWithSlash = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return new URL(normalizedPath, baseWithSlash);
}

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage;
}

export function saveAuthTokensToSession(accessToken: string, refreshToken?: string) {
  const storage = getStorage();
  if (!storage) return;

  storage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);

  if (refreshToken) storage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  else storage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

export async function requestSocialLogin(provider: 'google' | 'kakao', code: string) {
  const loginType = provider.toUpperCase();
  const loginUrl = buildApiUrl(`auth/login/${loginType}`);
  loginUrl.searchParams.set('code', code);

  const response = await fetch(loginUrl.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Social login failed (${response.status})`);
  }

  const payload = (await response.json()) as SocialLoginResponse;
  const accessToken = payload?.data?.accessToken ?? payload?.data?.access_token;
  const refreshToken = payload?.data?.refreshToken ?? payload?.data?.refresh_token;

  if (!accessToken) {
    throw new Error('Access token is missing in social login response.');
  }

  saveAuthTokensToSession(accessToken, refreshToken);
}

export async function authFetch(path: string, init: AuthFetchInit = {}) {
  const storage = getStorage();
  const accessToken = storage?.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? null;

  if (!accessToken) {
    throw new Error('Access token session is missing.');
  }

  const url = buildApiUrl(path);
  const headers = new Headers(init.headers);

  headers.set('Authorization', `Bearer ${accessToken}`);

  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url.toString(), {
    ...init,
    headers,
    cache: init.cache ?? 'no-store',
  });
}
