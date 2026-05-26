import Image from 'next/image';

import type { ExperienceItem } from '@/app/(pages)/experience/_components/ExperienceCardGrid';
import type { ExperienceCategory } from '@/app/(pages)/experience/_components/ExperienceCategoryTab';
import { XIcon } from '@/components/common/icons/XIcon';
import { cn } from '@/lib/utils';

const iconMap: Record<Exclude<ExperienceCategory, 'all'>, string> = {
  activity: '/activity-selected.svg',
  career: '/career-selected.svg',
  education: '/education-selected.svg',
  etc: '/etc-selected.svg',
};

export interface ApplyCoverLetterSelectedExperienceCardProps {
  experience: ExperienceItem;
  className?: string;
  onRemove?: () => void;
}

export function ApplyCoverLetterSelectedExperienceCard({
  experience,
  className,
  onRemove,
}: ApplyCoverLetterSelectedExperienceCardProps) {
  return (
    <div
      data-slot="cover-letter-selected-experience-card"
      className={cn(
        'flex w-full items-center justify-between gap-3 bg-background-w p-3',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center">
          <Image
            src={iconMap[experience.type]}
            alt=""
            aria-hidden
            width={40}
            height={40}
            className="size-10"
          />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="line-clamp-1 body-1-bold text-strong">{experience.title}</p>
          <p className="inline-flex min-w-0 items-center gap-1.5 text-xs leading-4 text-gray-700">
            <span className="shrink-0">기간</span>
            <span className="truncate">{experience.period || '2026.04.01~04.28'}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`${experience.title} 선택 해제`}
        onClick={onRemove}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background-w text-primary outline-none transition-colors hover:bg-gray-100 focus-visible:shadow-focus-ring"
      >
        <XIcon className="size-6" />
      </button>
    </div>
  );
}
