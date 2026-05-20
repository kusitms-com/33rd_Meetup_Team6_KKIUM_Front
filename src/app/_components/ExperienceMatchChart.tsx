'use client';

import Image from 'next/image';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };

export interface ExperienceMatchGaugeProps {
  title: string;
  percent: number;
  arcPath: string;
  arcFlipTranslateY: number;
  knob: Point;
  onCtaClick?: () => void;
}

export function ExperienceMatchGauge({
  title,
  percent,
  arcPath,
  arcFlipTranslateY,
  knob,
  onCtaClick,
}: ExperienceMatchGaugeProps) {
  return (
    <div className="inline-flex w-96 shrink-0 self-stretch flex-col items-center gap-0 overflow-hidden rounded-base bg-mint-50 p-5">
      <div className="relative h-[360px] w-80 overflow-hidden">
        <div className="absolute inset-x-0 top-0 inline-flex items-center justify-between">
          <h3 className="text-xl font-bold leading-8 text-strong">{title}</h3>
          <Info className="size-5 text-secondary" aria-hidden />
        </div>

        <svg
          viewBox="0 0 320 300"
          className="absolute left-0 top-[6px] h-[300px] w-80"
          aria-hidden
        >
          <defs>
            <linearGradient id="experience-match-progress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-mint-300)" />
              <stop offset="100%" stopColor="var(--color-mint-100)" />
            </linearGradient>
          </defs>
          <g transform={`translate(0 ${arcFlipTranslateY}) scale(1 -1)`}>
            <path
              d={arcPath}
              pathLength={100}
              className="stroke-gray-300"
              strokeWidth={14}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={arcPath}
              pathLength={100}
              stroke="url(#experience-match-progress)"
              strokeWidth={14}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${percent} 100`}
            />
            <circle cx={knob.x} cy={knob.y} r={16} fill="var(--color-mint-300)" />
            <circle cx={knob.x} cy={knob.y} r={10} fill="var(--color-white)" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-[69px] flex -translate-x-1/2 items-end gap-1">
          <span className="text-5xl font-extrabold leading-[64.75px] text-gray-900">{percent}</span>
          <span className="pb-3 text-base font-bold leading-6 text-gray-900">%</span>
        </div>

        <Image
          src="/character.svg"
          alt=""
          width={160}
          height={160}
          className="absolute bottom-20 left-1/2 h-auto w-[152px] -translate-x-1/2 object-contain"
          unoptimized
        />
      </div>

      <button
        type="button"
        onClick={onCtaClick}
        className={cn(
          '-mt-15 inline-flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-lg border border-border-default bg-background-w px-3 py-1',
          'body-1-bold text-tertiary outline-none transition-colors',
          'hover:bg-gray-50 focus-visible:shadow-focus-ring',
        )}
      >
        공고 확인하러 가기
      </button>
    </div>
  );
}
