'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { requestSocialLogin } from '@/app/_utils/authFetch';

export default function KakaoOAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!code) {
      router.replace('/login?error=missing_code');
      return;
    }

    void requestSocialLogin('kakao', code)
      .then(() => {
        router.replace('/');
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'auth_failed';
        router.replace(`/login?error=${encodeURIComponent(message)}`);
      });
  }, [router, searchParams]);

  return null;
}
