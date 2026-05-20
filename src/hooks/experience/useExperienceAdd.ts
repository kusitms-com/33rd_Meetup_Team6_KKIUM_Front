'use client';

import { useMutation } from '@tanstack/react-query';

import { analyzeExperiencePdf } from '@/app/api/experience/add';

export function useAnalyzeExperiencePdf() {
  return useMutation({
    mutationFn: analyzeExperiencePdf,
  });
}
