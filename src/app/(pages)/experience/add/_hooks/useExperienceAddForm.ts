'use client';

import { useCallback, useState } from 'react';

import type { ExperienceAnalyzeResponse } from '@/app/api/experience/add/types';
import {
  createEmptyBasicInfoForm,
  createEmptyCoreInfoForm,
  createEmptyResultInfoForm,
} from '@/app/(pages)/experience/add/_types/experienceAddForm';
import {
  mapAnalyzeResponseToBasicInfoForm,
  mapAnalyzeResponseToCoreInfoForm,
  mapAnalyzeResponseToResultInfoForm,
} from '@/app/(pages)/experience/add/_utils/mapAnalyzeResponseToBasicInfoForm';

export function useExperienceAddForm() {
  const [basicInfo, setBasicInfo] = useState(createEmptyBasicInfoForm);
  const [coreInfo, setCoreInfo] = useState(createEmptyCoreInfoForm);
  const [resultInfo, setResultInfo] = useState(createEmptyResultInfoForm);

  const applyAnalyzeResponse = useCallback((analyzeResponse: ExperienceAnalyzeResponse) => {
    setBasicInfo(mapAnalyzeResponseToBasicInfoForm(analyzeResponse));
    setCoreInfo(mapAnalyzeResponseToCoreInfoForm(analyzeResponse));
    setResultInfo(mapAnalyzeResponseToResultInfoForm(analyzeResponse));
  }, []);

  const resetForm = useCallback(() => {
    setBasicInfo(createEmptyBasicInfoForm());
    setCoreInfo(createEmptyCoreInfoForm());
    setResultInfo(createEmptyResultInfoForm());
  }, []);

  return {
    basicInfo,
    coreInfo,
    resultInfo,
    setBasicInfo,
    setCoreInfo,
    setResultInfo,
    applyAnalyzeResponse,
    resetForm,
  };
}
