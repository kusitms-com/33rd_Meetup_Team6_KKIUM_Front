'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

import {
  createJdAi,
  deleteJd,
  getJdList,
  parseJdOcr,
  parseJdUrl,
  toggleJdTarget,
  updateJdTitle,
} from '@/app/api/apply';
import type {
  CreateJdAiRequest,
  JdListResponse,
  JdListParams,
  JdId,
  ParseJdUrlRequest,
  UpdateJdTitleRequest,
} from '@/app/api/apply/types';

export const applyJobPostingQueryKeys = {
  all: ['apply-job-postings'] as const,
  lists: () => [...applyJobPostingQueryKeys.all, 'list'] as const,
  infiniteList: (params?: Omit<JdListParams, 'page'>) =>
    [...applyJobPostingQueryKeys.lists(), 'infinite', params ?? null] as const,
  details: () => [...applyJobPostingQueryKeys.all, 'detail'] as const,
  detail: (jdId: JdId | null | undefined) =>
    [...applyJobPostingQueryKeys.details(), jdId ?? null] as const,
};

export function useInfiniteApplyJobPostings(params?: Omit<JdListParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: applyJobPostingQueryKeys.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getJdList({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useUpdateApplyJobPostingTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jdId, request }: { jdId: JdId; request: UpdateJdTitleRequest }) =>
      updateJdTitle(jdId, request),
    onSuccess: (_, { jdId, request }) => {
      queryClient.setQueriesData<InfiniteData<JdListResponse>>(
        { queryKey: applyJobPostingQueryKeys.lists() },
        (data) => {
          if (!data) {
            return data;
          }

          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === String(jdId) ? { ...item, title: request.title } : item,
              ),
            })),
          };
        },
      );
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.detail(jdId) });
    },
  });
}

export function useParseApplyJobPostingUrl() {
  return useMutation({
    mutationFn: (request: ParseJdUrlRequest) => parseJdUrl(request),
  });
}

export function useParseApplyJobPostingOcr() {
  return useMutation({
    mutationFn: (file: File) => parseJdOcr(file),
  });
}

export function useCreateApplyJobPostingWithAi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateJdAiRequest) => createJdAi(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.lists() });
    },
  });
}

export function useToggleApplyTargetJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleJdTarget,
    onSuccess: (_, jdId) => {
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.detail(jdId) });
    },
  });
}

export function useDeleteApplyJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJd,
    onSuccess: (_, jdId) => {
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: applyJobPostingQueryKeys.detail(jdId) });
    },
  });
}
