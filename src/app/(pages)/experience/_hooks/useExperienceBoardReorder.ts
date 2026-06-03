'use client';

import * as React from 'react';

import type { ExperienceCategory } from '@/app/(pages)/experience/_utils/ExperienceCategory';
import {
  parseOrderedExperienceIds,
  type ExperienceOrderMap,
} from '@/app/(pages)/experience/_utils/experienceOrder';
import type { PieceType } from '@/app/api/experience/types';
import { useUpdateExperienceOrder } from '@/hooks/experience/useExperiences';

const orderPieceTypeByCategory: Record<ExperienceCategory, PieceType> = {
  all: 'ALL',
  activity: 'ACTIVITY',
  career: 'CAREER',
  education: 'EDUCATION',
  etc: 'ETC',
};

interface UseExperienceBoardReorderParams {
  selectedCategory: ExperienceCategory;
  experienceOrderMap: ExperienceOrderMap;
  setExperienceOrderMap: React.Dispatch<React.SetStateAction<ExperienceOrderMap>>;
}

export function useExperienceBoardReorder({
  selectedCategory,
  experienceOrderMap,
  setExperienceOrderMap,
}: UseExperienceBoardReorderParams) {
  const updateExperienceOrderMutation = useUpdateExperienceOrder();

  const handleExperienceReorder = React.useCallback(
    (orderedExperienceIds: string[]) => {
      const previousOrderIds = experienceOrderMap[selectedCategory];
      const parsedExperienceIds = parseOrderedExperienceIds(orderedExperienceIds);

      if (!parsedExperienceIds) {
        return;
      }

      setExperienceOrderMap((currentOrderMap) => ({
        ...currentOrderMap,
        [selectedCategory]: orderedExperienceIds,
      }));

      updateExperienceOrderMutation.mutate(
        {
          type: orderPieceTypeByCategory[selectedCategory],
          experienceIds: parsedExperienceIds,
        },
        {
          onError: () => {
            setExperienceOrderMap((currentOrderMap) => ({
              ...currentOrderMap,
              [selectedCategory]: previousOrderIds,
            }));
          },
        },
      );
    },
    [experienceOrderMap, selectedCategory, setExperienceOrderMap, updateExperienceOrderMutation],
  );

  return {
    handleExperienceReorder,
  };
}
