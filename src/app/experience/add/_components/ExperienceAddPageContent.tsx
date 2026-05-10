'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ExperienceAddProgress } from '@/app/experience/add/_components/ExperienceAddProgress';
import { EXPERIENCE_ADD_STEPS } from '@/app/experience/add/_constants/experienceAddSteps';
import { ChevronLeftIcon } from '@/components/common/icons/ChevronLeftIcon';

export function ExperienceAddPageContent() {
  const router = useRouter();
  const [currentStepIndex] = useState(0);
  const currentStep = EXPERIENCE_ADD_STEPS[currentStepIndex];

  return (
    <div className="mx-20 mt-5 flex flex-col">
      <header className="flex items-center gap-2">
        <button
          type="button"
          aria-label="이전 페이지로 이동"
          className="flex size-8 cursor-pointer items-center justify-center"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="size-6 text-strong" />
        </button>
        <h1 className="title-1-bold text-strong">경험 추가하기</h1>
      </header>

      <main className="mt-[50px] flex flex-col gap-10">
        <ExperienceAddProgress currentStepIndex={currentStepIndex} />

        <section
          aria-label={currentStep}
          className="rounded-xl border border-border-default bg-background-w px-[30px] py-5"
        >
          <p className="body-1-bold text-strong">{currentStep}</p>
        </section>
      </main>
    </div>
  );
}
