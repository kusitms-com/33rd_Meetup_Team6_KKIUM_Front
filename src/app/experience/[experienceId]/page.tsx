import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ExperienceDetailPageContent } from '@/app/experience/[experienceId]/_components/ExperienceDetailPageContent';

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  const numericExperienceId = Number(experienceId);

  if (!Number.isFinite(numericExperienceId)) {
    notFound();
  }

  return (
    <Suspense>
      <ExperienceDetailPageContent experienceId={numericExperienceId} />
    </Suspense>
  );
}
