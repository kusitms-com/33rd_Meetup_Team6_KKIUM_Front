import { getAccessTokenFromSession } from '@/app/_utils/authFetch';

export function resolveApplyAccessToken(): string | null {
  return getAccessTokenFromSession();
}

export function hasApplyApiAccess(): boolean {
  return getAccessTokenFromSession() != null;
}
