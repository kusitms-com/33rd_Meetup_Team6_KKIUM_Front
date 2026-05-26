import { notFound } from 'next/navigation';
import { OAuthCallbackClient, type OAuthProvider } from './_components/OAuthCallbackClient';

interface OAuthCallbackPageProps {
  params: Promise<{
    provider: string;
  }>;
}

function isOAuthProvider(value: string): value is OAuthProvider {
  return value === 'google' || value === 'kakao';
}

export function generateStaticParams() {
  return [{ provider: 'google' }, { provider: 'kakao' }];
}

export default async function OAuthCallbackPage({ params }: OAuthCallbackPageProps) {
  const resolvedParams = await params;
  const provider = resolvedParams.provider;

  if (!isOAuthProvider(provider)) {
    notFound();
  }

  return <OAuthCallbackClient provider={provider} />;
}
