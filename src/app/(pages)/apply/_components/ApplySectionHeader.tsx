import { InformationIcon } from '@/components/common/icons/InformationIcon';
import { cn } from '@/lib/utils';

export interface ApplySectionHeaderProps {
  title: string;
  className?: string;
  onInfoClick?: () => void;
}

export function ApplySectionHeader({ title, className, onInfoClick }: ApplySectionHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <h2 className="text-2xl font-extrabold leading-9 text-strong">{title}</h2>

      <button
        type="button"
        aria-label={`${title} 정보`}
        className="flex size-5 shrink-0 items-center justify-center text-secondary"
        onClick={onInfoClick}
      >
        <InformationIcon className="size-5" />
      </button>
    </div>
  );
}
