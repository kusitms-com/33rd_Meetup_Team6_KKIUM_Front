import { LottieAnimation } from '@/components/common/LottieAnimation';
import { cn } from '@/lib/utils';

interface LoadingLottieProps {
  className?: string;
}

export function LoadingLottie({ className }: LoadingLottieProps) {
  return (
    <LottieAnimation
      src="/lotties/loading.lottie"
      className={cn('size-[155px]', className)}
    />
  );
}
