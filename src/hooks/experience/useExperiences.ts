'use client';

import {
  skipToken,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteExperience,
  getExperienceDetail,
  getExperiences,
  updateExperience,
  updateExperienceOrder,
  updateExperienceTitle,
  type GetExperiencesParams,
} from '@/app/api/experience';
import type {
  ExperienceOrderUpdateRequest,
  ExperienceTitleUpdateRequest,
  ExperienceUpdateRequest,
} from '@/app/api/experience/types';

export const experienceQueryKeys = {
  all: ['experiences'] as const,
  lists: () => [...experienceQueryKeys.all, 'list'] as const,
  list: (params?: GetExperiencesParams) =>
    [...experienceQueryKeys.lists(), params ?? null] as const,
  infiniteList: (params?: GetExperiencesParams) =>
    [...experienceQueryKeys.lists(), 'infinite', params ?? null] as const,
  details: () => [...experienceQueryKeys.all, 'detail'] as const,
  detail: (experienceId: number | null | undefined) =>
    [...experienceQueryKeys.details(), experienceId ?? null] as const,
};

export function useExperiences(params?: GetExperiencesParams) {
  return useQuery({
    queryKey: experienceQueryKeys.list(params),
    queryFn: () => getExperiences(params),
  });
}

export function useInfiniteExperiences(params?: GetExperiencesParams) {
  return useInfiniteQuery({
    queryKey: experienceQueryKeys.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getExperiences({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor != null ? lastPage.nextCursor : undefined,
  });
}

export function useExperienceDetail(experienceId: number | null | undefined) {
  return useQuery({
    queryKey: experienceQueryKeys.detail(experienceId),
    queryFn: experienceId != null ? () => getExperienceDetail(experienceId) : skipToken,
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      experienceId,
      request,
    }: {
      experienceId: number;
      request: ExperienceUpdateRequest;
    }) => updateExperience(experienceId, request),
    onSuccess: (_, { experienceId }) => {
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.detail(experienceId) });
    },
  });
}

export function useUpdateExperienceTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      experienceId,
      request,
    }: {
      experienceId: number;
      request: ExperienceTitleUpdateRequest;
    }) => updateExperienceTitle(experienceId, request),
    onSuccess: (_, { experienceId }) => {
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.detail(experienceId) });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: (_, experienceId) => {
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.detail(experienceId) });
    },
  });
}

export function useUpdateExperienceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ExperienceOrderUpdateRequest) => updateExperienceOrder(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: experienceQueryKeys.lists() });
    },
  });
}
