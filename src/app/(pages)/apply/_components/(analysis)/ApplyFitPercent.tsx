import { cn } from '@/lib/utils';

function clampPercent(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export interface ApplyFitPercentProps {
  value: number;
  size?: 'lg' | 'sm';
  className?: string;
}

export function ApplyFitPercent({ value, size = 'sm', className }: ApplyFitPercentProps) {
  const percent = clampPercent(value);

  if (size === 'lg') {
    return (
      <span className={cn('inline-flex items-end gap-0.5 tabular-nums', className)}>
        <span className="text-[30px] font-extrabold leading-[47.36px] text-strong">{percent}</span>
        <span className="pb-1.5 text-xl font-bold leading-8 text-strong">%</span>
      </span>
    );
  }

  return (
    <span className={cn('title-1-bold leading-8 text-mint-400 tabular-nums', className)}>
      {percent}%
    </span>
  );
}
