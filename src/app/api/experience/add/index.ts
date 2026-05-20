import { api } from '@/app/api/client';

import type { ExperienceAnalyzeResponse } from './types';

export function analyzeExperiencePdf(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return api.post<ExperienceAnalyzeResponse>('/api/v1/experiences/analyze/pdf', formData);
}
