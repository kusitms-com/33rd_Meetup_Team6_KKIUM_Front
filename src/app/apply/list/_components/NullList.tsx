import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type NullListProps = React.ComponentProps<'div'>;

export function NullList({ className, ...props }: NullListProps) {
  return (
    <div
      data-slot="apply-null-list"
      className={cn(
        'inline-flex h-[823px] w-full flex-col items-center justify-center gap-3 py-64',
        className,
      )}
      {...props}
    >
      <Image
        src="/null.svg"
        alt=""
        width={174}
        height={138}
        className="h-auto w-[174px] max-w-full shrink-0"
      />

      <div className="flex flex-col items-center gap-1">
        <p className="text-center body-1-bold text-strong">아직 생성된 공고가 없어요</p>
        <p className="max-w-96 text-center body-1-regular text-gray-700">
          공고를 추가해 파일에 끼워넣어볼까요?
        </p>
      </div>
    </div>
  );
}
