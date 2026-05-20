import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface NullTypeProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = '아직 직무 유형을 파악할 수 없어요.';
const DEFAULT_DESCRIPTION = '경험을 추가하면 직무 유형을 분석해드릴께요.';

export function NullType({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  className,
  ...props
}: NullTypeProps) {
  return (
    <div
      data-slot="null-type"
      className={cn('relative h-80 w-96 overflow-hidden rounded-xl border border-gray-300 bg-background-w', className)}
      {...props}
    >
      <div className="absolute left-5 top-[26px] inline-flex w-80 items-start justify-between">
        <h3 className="text-xl font-extrabold leading-7 text-gray-main">나의 직무 유형</h3>
        <div className="size-8" aria-hidden />
      </div>

      <div className="absolute left-1/2 top-[70px] -translate-x-1/2">
        <Image src="/nullType.svg" alt="" width={312} height={180} className="h-[180px] w-[312px] object-contain" priority={false} />
      </div>

      <div className="absolute left-1/2 top-[259.61px] inline-flex w-96 -translate-x-1/2 flex-col items-center justify-start gap-1 text-center">
        <p className="text-base font-bold leading-6 text-strong">{title}</p>
        <p className="w-96 text-base font-normal leading-6 text-gray-700">{description}</p>
      </div>
    </div>
  );
}
