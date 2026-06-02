'use client';

import { useCallback, useEffect, useState } from 'react';

import { EXPERIENCE_ADD_STEPS } from '@/app/(pages)/experience/add/_constants/experienceAddSteps';

export function useExperienceAddStep() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isCompleteStep = currentStepIndex === EXPERIENCE_ADD_STEPS.length;
  const isBasicInfoStep = currentStepIndex === 1;
  const isCoreInfoStep = currentStepIndex === 2;
  const isResultStep = currentStepIndex === EXPERIENCE_ADD_STEPS.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentStepIndex]);

  const goPreviousStep = useCallback(() => {
    setCurrentStepIndex((stepIndex) => Math.max(stepIndex - 1, 0));
  }, []);

  const goNextStep = useCallback(() => {
    setCurrentStepIndex((stepIndex) => Math.min(stepIndex + 1, EXPERIENCE_ADD_STEPS.length));
  }, []);

  return {
    currentStepIndex,
    isFirstStep,
    isCompleteStep,
    isBasicInfoStep,
    isCoreInfoStep,
    isResultStep,
    goPreviousStep,
    goNextStep,
  };
}
