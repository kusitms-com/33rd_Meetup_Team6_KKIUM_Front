'use client';

import * as React from 'react';

import type { ExperienceCategory } from '@/app/(pages)/experience/_utils/ExperienceCategory';
import {
  areExperienceOrderMapsEqual,
  createExperienceOrderMap,
  syncExperienceOrderMap,
  type ExperienceOrderItem,
} from '@/app/(pages)/experience/_utils/experienceOrder';

interface UseExperienceBoardOrderParams<TExperience extends ExperienceOrderItem> {
  experiences: readonly TExperience[];
  selectedCategory: ExperienceCategory;
}

export function useExperienceBoardOrder<TExperience extends ExperienceOrderItem>({
  experiences,
  selectedCategory,
}: UseExperienceBoardOrderParams<TExperience>) {
  const [experienceOrderMap, setExperienceOrderMap] = React.useState(() =>
    createExperienceOrderMap(experiences),
  );

  React.useEffect(() => {
    setExperienceOrderMap((currentOrderMap) => {
      const nextOrderMap = syncExperienceOrderMap(currentOrderMap, experiences, selectedCategory);

      if (areExperienceOrderMapsEqual(currentOrderMap, nextOrderMap)) {
        return currentOrderMap;
      }

      return nextOrderMap;
    });
  }, [experiences, selectedCategory]);

  const experienceMap = React.useMemo(
    () => new Map(experiences.map((experience) => [experience.id, experience])),
    [experiences],
  );

  const filteredExperiences = React.useMemo(
    () =>
      experienceOrderMap[selectedCategory]
        .map((id) => experienceMap.get(id))
        .filter((experience): experience is TExperience => Boolean(experience)),
    [experienceMap, experienceOrderMap, selectedCategory],
  );

  return {
    experienceOrderMap,
    setExperienceOrderMap,
    filteredExperiences,
  };
}
