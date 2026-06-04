import dynamic from 'next/dynamic';
import * as React from 'react';

import { ExperienceCard } from '@/app/(pages)/experience/_components/ExperienceCard';
import type { ExperienceCategory } from '@/app/(pages)/experience/_components/ExperienceCategoryTab';
import { cn } from '@/lib/utils';

export const EXPERIENCE_CARD_GRID_CLASS_NAME =
  'grid w-full grid-cols-2 gap-x-4 gap-y-5 min-[1720px]:grid-cols-3';

export interface ExperienceItem {
  id: string;
  type: Exclude<ExperienceCategory, 'all'>;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  period: string;
  detailInfo: {
    label: string;
    value: string;
  }[];
  basicDetail: {
    name?: string;
    teamNum?: string;
    role?: string;
    contributionRate?: string;
    company?: string;
    employmentStatus?: string;
    organizationName?: string;
  };
  skillTags: string[];
  competencyTags: string[];
  detail: {
    situation: string;
    task: string;
    action: string;
    result: string;
    taken: string;
  };
}

export interface ExperienceCardGridProps extends React.ComponentProps<'div'> {
  experiences: ExperienceItem[];
  selectedExperienceId?: string;
  sortable?: boolean;
  onExperienceClick?: (experience: ExperienceItem) => void;
  onExperienceDelete?: (experience: ExperienceItem) => Promise<void> | void;
  onExperienceReorder?: (experienceIds: string[]) => void;
  onExperienceTitleSave?: (experience: ExperienceItem, nextTitle: string) => Promise<void> | void;
}

export type ExperienceSortableCardGridProps = Omit<ExperienceCardGridProps, 'sortable'> & {
  onReady?: () => void;
};

const ExperienceSortableCardGrid = dynamic<ExperienceSortableCardGridProps>(
  () => import('@/app/(pages)/experience/_components/ExperienceSortableCardGrid'),
  { ssr: false },
);

export function ExperienceCardGrid({
  experiences,
  selectedExperienceId,
  sortable = false,
  onExperienceClick,
  onExperienceDelete,
  onExperienceReorder,
  onExperienceTitleSave,
  className,
  ...props
}: ExperienceCardGridProps) {
  const [sortableGridReady, setSortableGridReady] = React.useState(false);

  React.useEffect(() => {
    if (!sortable) {
      setSortableGridReady(false);
    }
  }, [sortable]);

  const handleSortableGridReady = React.useCallback(() => {
    setSortableGridReady(true);
  }, []);

  const grid = (
    <div
      data-slot="experience-card-grid"
      className={cn(EXPERIENCE_CARD_GRID_CLASS_NAME, className)}
      {...props}
    >
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          type={experience.type}
          title={experience.title}
          period={experience.period}
          skillTags={experience.skillTags}
          competencyTags={experience.competencyTags}
          selected={selectedExperienceId === experience.id}
          className="max-w-none"
          onClick={() => onExperienceClick?.(experience)}
          onDelete={() => onExperienceDelete?.(experience)}
          onTitleSave={(nextTitle) => onExperienceTitleSave?.(experience, nextTitle)}
        />
      ))}
    </div>
  );

  if (!sortable) {
    return grid;
  }

  return (
    <>
      {!sortableGridReady && grid}
      <ExperienceSortableCardGrid
        experiences={experiences}
        selectedExperienceId={selectedExperienceId}
        onExperienceClick={onExperienceClick}
        onExperienceDelete={onExperienceDelete}
        onExperienceReorder={onExperienceReorder}
        onExperienceTitleSave={onExperienceTitleSave}
        onReady={handleSortableGridReady}
        className={cn(className, !sortableGridReady && 'hidden')}
        {...props}
      />
    </>
  );
}
