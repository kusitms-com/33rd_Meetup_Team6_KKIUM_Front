'use client';

import * as React from 'react';

import type { ExperienceItem } from '@/app/(pages)/experience/_components/ExperienceCardGrid';
import { mapExperienceDetailToItem } from '@/app/(pages)/experience/_utils/mapExperienceResponse';
import { useExperienceDetail } from '@/hooks/experience/useExperiences';

interface UseExperienceBoardDetailParams {
  selectedExperienceId?: string;
  selectedExperience?: ExperienceItem;
  panelOpen: boolean;
}

export function useExperienceBoardDetail({
  selectedExperienceId,
  selectedExperience,
  panelOpen,
}: UseExperienceBoardDetailParams) {
  const selectedExperienceNumericId = selectedExperienceId ? Number(selectedExperienceId) : null;
  const {
    data: selectedExperienceDetail,
    isError: isDetailError,
    isFetching: isDetailFetching,
    isPending: isDetailPending,
  } = useExperienceDetail(
    Number.isFinite(selectedExperienceNumericId) ? selectedExperienceNumericId : null,
  );
  const selectedExperienceDetailMatches =
    selectedExperienceDetail?.experienceId === selectedExperienceNumericId;
  const selectedExperienceDetailItem = React.useMemo(
    () =>
      selectedExperienceDetail && selectedExperienceDetailMatches
        ? mapExperienceDetailToItem(selectedExperienceDetail)
        : null,
    [selectedExperienceDetail, selectedExperienceDetailMatches],
  );

  const panelExperience = selectedExperienceDetailItem ?? selectedExperience;
  const showDetailLoading =
    panelOpen &&
    Boolean(selectedExperienceId) &&
    (isDetailPending || (isDetailFetching && !selectedExperienceDetailMatches));

  return {
    panelExperience,
    isDetailError,
    showDetailLoading,
  };
}
