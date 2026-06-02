import { CORE_EXPERIENCE_FIELDS } from '@/app/(pages)/experience/add/_constants/experienceCoreQuestions';
import { EXPERIENCE_TYPE_FIELD_GROUPS } from '@/app/(pages)/experience/add/_constants/experienceTypeOptions';
import type {
  ExperienceAddBasicInfoForm,
  ExperienceAddCoreInfoForm,
  ExperienceAddResultInfoForm,
} from '@/app/(pages)/experience/add/_types/experienceAddForm';

interface GetExperienceAddNextStepDisabledParams {
  isAnalyzing: boolean;
  isSaving: boolean;
  isBasicInfoStep: boolean;
  isCoreInfoStep: boolean;
  isResultStep: boolean;
  basicInfo: ExperienceAddBasicInfoForm;
  coreInfo: ExperienceAddCoreInfoForm;
  resultInfo: ExperienceAddResultInfoForm;
}

export function getExperienceAddNextStepDisabled({
  isAnalyzing,
  isSaving,
  isBasicInfoStep,
  isCoreInfoStep,
  isResultStep,
  basicInfo,
  coreInfo,
  resultInfo,
}: GetExperienceAddNextStepDisabledParams) {
  return (
    isAnalyzing ||
    isSaving ||
    (isBasicInfoStep && !isBasicInfoComplete(basicInfo)) ||
    (isCoreInfoStep && !isCoreInfoComplete(coreInfo)) ||
    (isResultStep && !isResultStepComplete({ basicInfo, coreInfo, resultInfo }))
  );
}

export function isBasicInfoComplete(basicInfo: ExperienceAddBasicInfoForm) {
  if (!basicInfo.type) return false;

  return EXPERIENCE_TYPE_FIELD_GROUPS[basicInfo.type].every((fieldGroup) =>
    fieldGroup.fields.every((field) => hasText(basicInfo[field.name])),
  );
}

export function isCoreInfoComplete(coreInfo: ExperienceAddCoreInfoForm) {
  return CORE_EXPERIENCE_FIELDS.every((field) => hasText(coreInfo[field.name]));
}

export function isResultStepComplete({
  basicInfo,
  coreInfo,
  resultInfo,
}: {
  basicInfo: ExperienceAddBasicInfoForm;
  coreInfo: ExperienceAddCoreInfoForm;
  resultInfo: ExperienceAddResultInfoForm;
}) {
  return (
    isBasicInfoComplete(basicInfo) &&
    isCoreInfoComplete(coreInfo) &&
    hasTag(resultInfo.skillTags) &&
    hasTag(resultInfo.competencyTags)
  );
}

function hasText(value: string | null | undefined) {
  return (value ?? '').trim().length > 0;
}

function hasTag(tags: string[]) {
  return tags.some(hasText);
}
