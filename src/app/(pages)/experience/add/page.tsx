import { Suspense } from 'react';

import { ExperienceAddPageContent } from '@/app/(pages)/experience/add/_components/ExperienceAddPageContent';

export default function ExperienceAddPage() {
  return (
    <Suspense fallback={null}>
      <ExperienceAddPageContent />
    </Suspense>
  );
}
