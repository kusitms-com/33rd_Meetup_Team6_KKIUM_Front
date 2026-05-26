import { LoadingState } from '@/components/common/LoadingState';

export function ExperienceAddAnalyzingStep() {
  return (
    <LoadingState message="경험을 분석해 끼우는 중이에요.." ariaLabel="경험 분석 중" />
  );
}
