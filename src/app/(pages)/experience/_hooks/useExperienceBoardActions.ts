'use client';

import * as React from 'react';

import type { ExperienceItem } from '@/app/(pages)/experience/_components/ExperienceCardGrid';
import type { ExperienceDetailSaveValue } from '@/app/(pages)/experience/_components/ExperienceDetailContent';
import { mapExperienceItemToUpdateRequest } from '@/app/(pages)/experience/_utils/mapExperienceItemToUpdateRequest';
import {
  removeExperienceFromOrderMap,
  type ExperienceOrderMap,
} from '@/app/(pages)/experience/_utils/experienceOrder';
import {
  useDeleteExperience,
  useUpdateExperience,
  useUpdateExperienceTitle,
} from '@/hooks/experience/useExperiences';

interface UseExperienceBoardActionsParams {
  panelExperience?: ExperienceItem | null;
  selectedExperienceId?: string;
  closeSelectedExperience: () => void;
  setExperienceOrderMap: React.Dispatch<React.SetStateAction<ExperienceOrderMap>>;
}

export function useExperienceBoardActions({
  panelExperience,
  selectedExperienceId,
  closeSelectedExperience,
  setExperienceOrderMap,
}: UseExperienceBoardActionsParams) {
  const deleteExperienceMutation = useDeleteExperience();
  const updateExperienceMutation = useUpdateExperience();
  const updateExperienceTitleMutation = useUpdateExperienceTitle();
  const [deleteTargetExperience, setDeleteTargetExperience] = React.useState<ExperienceItem | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleExperienceTitleSave = React.useCallback(
    async (experience: ExperienceItem, nextTitle: string) => {
      const experienceId = Number(experience.id);

      if (!Number.isInteger(experienceId) || experienceId <= 0) {
        throw new Error('수정할 경험 정보를 확인하지 못했습니다.');
      }

      await updateExperienceTitleMutation.mutateAsync({
        experienceId,
        request: { title: nextTitle },
      });
    },
    [updateExperienceTitleMutation],
  );

  const handleExperienceDeleteRequest = React.useCallback((experience: ExperienceItem) => {
    setDeleteTargetExperience(experience);
  }, []);

  const handleDeleteDialogOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open && !deleteExperienceMutation.isPending) {
        setDeleteTargetExperience(null);
      }
    },
    [deleteExperienceMutation.isPending],
  );

  const handleExperienceDeleteConfirm = React.useCallback(
    async (experience: ExperienceItem) => {
      const experienceId = Number(experience.id);

      if (!Number.isInteger(experienceId) || experienceId <= 0) {
        setErrorMessage('삭제할 경험 정보를 확인하지 못했습니다.');
        setDeleteTargetExperience(null);
        return;
      }

      try {
        await deleteExperienceMutation.mutateAsync(experienceId);

        setExperienceOrderMap((currentOrderMap) =>
          removeExperienceFromOrderMap(currentOrderMap, experience.id),
        );

        if (selectedExperienceId === experience.id) {
          closeSelectedExperience();
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : '경험 삭제 중 오류가 발생했습니다.',
        );
      } finally {
        setDeleteTargetExperience(null);
      }
    },
    [
      closeSelectedExperience,
      deleteExperienceMutation,
      selectedExperienceId,
      setExperienceOrderMap,
    ],
  );

  const handleExperienceDetailSave = React.useCallback(
    async (nextExperience: ExperienceDetailSaveValue) => {
      if (!panelExperience) {
        throw new Error('수정할 경험 정보를 확인하지 못했습니다.');
      }

      const experienceId = Number(panelExperience.id);

      if (!Number.isInteger(experienceId) || experienceId <= 0) {
        throw new Error('수정할 경험 정보를 확인하지 못했습니다.');
      }

      const updatedExperience = {
        ...panelExperience,
        ...nextExperience,
      };

      await updateExperienceMutation.mutateAsync({
        experienceId,
        request: mapExperienceItemToUpdateRequest(updatedExperience),
      });
    },
    [panelExperience, updateExperienceMutation],
  );

  const handleErrorDialogOpenChange = React.useCallback((open: boolean) => {
    if (!open) {
      setErrorMessage('');
    }
  }, []);

  return {
    deleteTargetExperience,
    errorMessage,
    isDeletingExperience: deleteExperienceMutation.isPending,
    handleExperienceTitleSave,
    handleExperienceDeleteRequest,
    handleDeleteDialogOpenChange,
    handleExperienceDeleteConfirm,
    handleExperienceDetailSave,
    handleErrorDialogOpenChange,
  };
}
