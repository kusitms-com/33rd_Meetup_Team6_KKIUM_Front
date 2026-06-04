import { Suspense } from 'react';

import { ApplyPageClient } from './_components/ApplyPageClient';

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyPageClient />
    </Suspense>
  );
}
