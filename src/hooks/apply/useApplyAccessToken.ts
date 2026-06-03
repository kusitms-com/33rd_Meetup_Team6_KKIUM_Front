'use client';

import { useEffect, useState } from 'react';

import { getAccessTokenFromSession } from '@/app/_utils/authFetch';

function readApplyAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return getAccessTokenFromSession();
}

export function resolveApplyAccessToken(): string | null {
  return getAccessTokenFromSession();
}

export function hasApplyApiAccess(): boolean {
  return getAccessTokenFromSession() != null;
}

export function useApplyAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(readApplyAccessToken);

  useEffect(() => {
    const syncToken = () => {
      setAccessToken(readApplyAccessToken());
    };

    syncToken();

    window.addEventListener('storage', syncToken);
    window.addEventListener('focus', syncToken);

    return () => {
      window.removeEventListener('storage', syncToken);
      window.removeEventListener('focus', syncToken);
    };
  }, []);

  return accessToken;
}

export function useHasApplyApiAccess() {
  const accessToken = useApplyAccessToken();
  return accessToken != null;
}
