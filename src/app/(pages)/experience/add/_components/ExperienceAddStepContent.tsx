import { ExperienceAddBasicInfoStep } from '@/app/(pages)/experience/add/_components/ExperienceAddBasicInfoStep';
import { ExperienceAddAnalyzingStep } from '@/app/(pages)/experience/add/_components/ExperienceAddAnalyzingStep';
import { ExperienceAddCompleteStep } from '@/app/(pages)/experience/add/_components/ExperienceAddCompleteStep';
import { ExperienceAddCoreStep } from '@/app/(pages)/experience/add/_components/ExperienceAddCoreStep';
import type { ExperienceMaterial } from '@/app/(pages)/experience/add/_components/ExperienceAddMaterialModal';
import { ExperienceAddResultStep } from '@/app/(pages)/experience/add/_components/ExperienceAddResultStep';
import { ExperienceAddUploadStep } from '@/app/(pages)/experience/add/_components/ExperienceAddUploadStep';
import { EXPERIENCE_ADD_STEPS } from '@/app/(pages)/experience/add/_constants/experienceAddSteps';
import type { ExperienceAddBasicInfoForm } from '@/app/(pages)/experience/add/_types/experienceAddForm';

interface ExperienceAddStepContentProps {
  currentStepIndex: number;
  isAnalyzing?: boolean;
  materials: ExperienceMaterial[];
  onMaterialsChange: (materials: ExperienceMaterial[]) => void;
  basicInfo: ExperienceAddBasicInfoForm;
  onBasicInfoChange: (basicInfo: ExperienceAddBasicInfoForm) => void;
}

export function ExperienceAddStepContent({
  currentStepIndex,
  isAnalyzing = false,
  materials,
  onMaterialsChange,
  basicInfo,
  onBasicInfoChange,
}: ExperienceAddStepContentProps) {
  const currentStep = EXPERIENCE_ADD_STEPS[currentStepIndex] ?? EXPERIENCE_ADD_STEPS[0];

  if (isAnalyzing) {
    return <ExperienceAddAnalyzingStep />;
  }

  if (currentStepIndex === 0) {
    return <ExperienceAddUploadStep materials={materials} onMaterialsChange={onMaterialsChange} />;
  }

  if (currentStepIndex === 1) {
    return <ExperienceAddBasicInfoStep value={basicInfo} onChange={onBasicInfoChange} />;
  }

  if (currentStepIndex === 2) {
    return <ExperienceAddCoreStep />;
  }

  if (currentStepIndex === 3) {
    return <ExperienceAddResultStep />;
  }

  if (currentStepIndex === EXPERIENCE_ADD_STEPS.length) {
    return <ExperienceAddCompleteStep />;
  }

  return (
    <section
      aria-label={currentStep}
      className="rounded-xl border border-border-default bg-background-w px-[30px] py-5"
    >
      <p className="body-1-bold text-strong">{currentStep}</p>
    </section>
  );
}
