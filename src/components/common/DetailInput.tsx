import * as React from 'react';

import { cn } from '@/lib/utils';

export function DetailInput({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="detail-input"
      className={cn(
        'min-h-[146px] w-full resize-none rounded-[14px] bg-background-default px-3 py-4 body-3-regular text-[#364153] outline-none placeholder:text-[#364153] disabled:cursor-not-allowed disabled:text-gray-600',
        className,
      )}
      {...props}
    />
  );
}
