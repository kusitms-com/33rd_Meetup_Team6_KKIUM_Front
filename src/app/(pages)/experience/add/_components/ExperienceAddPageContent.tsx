'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { ExperienceMaterial } from '@/app/(pages)/experience/add/_components/ExperienceAddMaterialModal';
import { ExperienceAddProgress } from '@/app/(pages)/experience/add/_components/ExperienceAddProgress';
import { ExperienceAddStepContent } from '@/app/(pages)/experience/add/_components/ExperienceAddStepContent';
import { EXPERIENCE_ADD_STEPS } from '@/app/(pages)/experience/add/_constants/experienceAddSteps';
import { createEmptyBasicInfoForm } from '@/app/(pages)/experience/add/_types/experienceAddForm';
import { mapAnalyzeResponseToBasicInfoForm } from '@/app/(pages)/experience/add/_utils/mapAnalyzeResponseToBasicInfoForm';
import { ChevronLeftIcon } from '@/components/common/icons/ChevronLeftIcon';
import { Button } from '@/components/ui/button';
import { useAnalyzeExperiencePdf } from '@/hooks/experience/useExperienceAdd';

export function ExperienceAddPageContent() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [materials, setMaterials] = useState<ExperienceMaterial[]>([]);
  const [basicInfo, setBasicInfo] = useState(createEmptyBasicInfoForm);
  const analyzePdfMutation = useAnalyzeExperiencePdf();
  const isAnalyzingPdf = analyzePdfMutation.isPending;
  const isFirstStep = currentStepIndex === 0;
  const isCompleteStep = currentStepIndex === EXPERIENCE_ADD_STEPS.length;

  const goPreviousStep = () => {
    setCurrentStepIndex((stepIndex) => Math.max(stepIndex - 1, 0));
  };

  const goNextStep = async () => {
    if (currentStepIndex === 0) {
      const selectedMaterial = materials[0];

      if (selectedMaterial?.type === 'pdf') {
        try {
          const analyzeResponse = await analyzePdfMutation.mutateAsync(selectedMaterial.file);
          setBasicInfo(mapAnalyzeResponseToBasicInfoForm(analyzeResponse));
        } catch (error) {
          window.alert(error instanceof Error ? error.message : 'PDF 분석 중 오류가 발생했습니다.');
          return;
        }
      } else {
        setBasicInfo(createEmptyBasicInfoForm());
      }
    }

    setCurrentStepIndex((stepIndex) => Math.min(stepIndex + 1, EXPERIENCE_ADD_STEPS.length));
  };

  return (
    <div className="mx-20 flex min-h-dvh flex-col py-5">
      <header className="flex items-center gap-2">
        <button
          type="button"
          aria-label="이전 페이지로 이동"
          className="flex size-8 cursor-pointer items-center justify-center"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="size-6 text-strong" />
        </button>
        <h1 className="title-1-bold text-strong">경험 추가하기</h1>
      </header>

      <main className="mt-[50px] flex flex-1 flex-col gap-10">
        <ExperienceAddProgress currentStepIndex={currentStepIndex} />
        <ExperienceAddStepContent
          currentStepIndex={currentStepIndex}
          isAnalyzing={isAnalyzingPdf}
          materials={materials}
          onMaterialsChange={setMaterials}
          basicInfo={basicInfo}
          onBasicInfoChange={setBasicInfo}
        />
      </main>

      {!isCompleteStep && (
        <footer className="mt-10 flex justify-end gap-4">
          {!isAnalyzingPdf && (
            <Button type="button" className="w-40" disabled={isFirstStep} onClick={goPreviousStep}>
              이전
            </Button>
          )}
          <Button type="button" className="w-40" disabled={isAnalyzingPdf} onClick={goNextStep}>
            다음
          </Button>
        </footer>
      )}
    </div>
  );
}
