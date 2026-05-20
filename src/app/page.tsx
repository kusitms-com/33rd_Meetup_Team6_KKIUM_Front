'use client';

import { useState } from 'react';

import { ExperienceMatch } from '@/app/_components/ExperienceMatch';
import { BubbleChart } from '@/app/_components/BubbleChart';
import { ExperienceUpdateCard } from '@/app/_components/ExperienceUpdateCard';
import { JobTypeCard } from '@/app/_components/JobTypeCard';
import { NullComponent } from '@/app/_components/NullComponent';
import { ChevronLeftIcon } from '@/components/common/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/components/common/icons/ChevronRightIcon';

export default function Home() {
  const hasMatchData = true;
  const targetPostingCount = 3;
  const [currentPostingIndex, setCurrentPostingIndex] = useState(0);
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(today);
  const canGoPrev = hasMatchData && currentPostingIndex > 0;
  const canGoNext = hasMatchData && currentPostingIndex < targetPostingCount - 1;

  const handlePrevPosting = () => {
    if (!canGoPrev) return;
    setCurrentPostingIndex((prev) => prev - 1);
  };

  const handleNextPosting = () => {
    if (!canGoNext) return;
    setCurrentPostingIndex((prev) => prev + 1);
  };

  return (
    <section className="flex w-full min-w-0 flex-col items-stretch gap-6 px-8 pb-12 lg:px-32">
      <div className="inline-flex w-68 flex-col items-start gap-2">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-base font-bold leading-6 text-gray-900">{`${month}월 ${day}일 ${weekday}`}</p>
          <h1 className="text-3xl font-extrabold leading-[47.36px] text-strong">경험 한눈에 보기</h1>
        </div>
        <p className="text-base font-bold leading-6 text-gray-500">나의 경험을 한눈에 분석하고 관리하세요</p>
      </div>

      <div className="inline-flex h-8 w-48 items-center gap-3">
        <button
          type="button"
          disabled={!canGoPrev}
          aria-label="이전 목표 공고"
          className="flex size-8 items-center justify-center rounded text-gray-500 outline-none hover:bg-gray-100 focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-40"
          onClick={handlePrevPosting}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <div className="text-xl font-extrabold leading-8 text-black">{`목표 공고${currentPostingIndex + 1}`}</div>
        <button
          type="button"
          disabled={!canGoNext}
          aria-label="다음 목표 공고"
          className="flex size-8 items-center justify-center rounded text-gray-800 outline-none hover:bg-gray-100 focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-40"
          onClick={handleNextPosting}
        >
          <ChevronRightIcon className="size-6" />
        </button>
      </div>

      {hasMatchData ? (
        <ExperienceMatch />
      ) : (
        <NullComponent />
      )}

      <div className="inline-flex w-full min-w-0 items-stretch gap-5">
        <ExperienceUpdateCard />
        <JobTypeCard />
        <BubbleChart />
      </div>
    </section>
  );
}
