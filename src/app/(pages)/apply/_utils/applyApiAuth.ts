import { getAccessTokenFromSession } from '@/app/_utils/authFetch';

export function resolveApplyAccessToken(): string | null {
  return getAccessTokenFromSession();
}

export function hasApplyApiAccess(): boolean {
  return resolveApplyAccessToken() != null;
}

export function isUsingSessionAccessToken(): boolean {
  return getAccessTokenFromSession() != null;
}
