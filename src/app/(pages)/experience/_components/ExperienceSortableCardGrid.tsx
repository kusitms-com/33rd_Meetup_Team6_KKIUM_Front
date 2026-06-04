'use client';

import { arrayMove } from '@dnd-kit/helpers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import * as React from 'react';

import {
  EXPERIENCE_CARD_GRID_CLASS_NAME,
  type ExperienceCardGridProps,
} from '@/app/(pages)/experience/_components/ExperienceCardGrid';
import { SortableExperienceCard } from '@/app/(pages)/experience/_components/SortableExperienceCard';
import { cn } from '@/lib/utils';

type ExperienceSortableCardGridProps = Omit<ExperienceCardGridProps, 'sortable'>;

export function ExperienceSortableCardGrid({
  experiences,
  selectedExperienceId,
  onExperienceClick,
  onExperienceDelete,
  onExperienceReorder,
  onExperienceTitleSave,
  className,
  ...props
}: ExperienceSortableCardGridProps) {
  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) {
        return;
      }

      const { source } = event.operation;

      if (!isSortable(source)) {
        return;
      }

      const { initialIndex, index } = source;

      if (initialIndex === index) {
        return;
      }

      const nextExperiences = arrayMove(experiences, initialIndex, index);

      onExperienceReorder?.(nextExperiences.map((experience) => experience.id));
    },
    [experiences, onExperienceReorder],
  );

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div
        data-slot="experience-card-grid"
        className={cn(EXPERIENCE_CARD_GRID_CLASS_NAME, className)}
        {...props}
      >
        {experiences.map((experience, index) => (
          <SortableExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            selected={selectedExperienceId === experience.id}
            onClick={onExperienceClick}
            onDelete={onExperienceDelete}
            onTitleSave={onExperienceTitleSave}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
