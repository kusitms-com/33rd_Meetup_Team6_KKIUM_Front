'use client';

import * as React from 'react';

import { CalendarIcon } from '@/components/common/icons/CalendarIcon';
import { type CalendarDateRange, RangeCalendar } from '@/components/common/RangeCalendar';
import {
  type SingleMonthCalendarDateRange,
  SingleMonthRangeCalendar,
} from '@/components/common/SingleMonthRangeCalendar';
import { cn } from '@/lib/utils';

export type ExperienceDetailDateRange = CalendarDateRange | SingleMonthCalendarDateRange;

interface ExperienceDetailPeriodPickerProps {
  value: string;
  isPage: boolean;
  open: boolean;
  top: number | null;
  rootRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  selectedDateRange: CalendarDateRange | null;
  onToggle: () => void;
  onChange: (nextRange: ExperienceDetailDateRange | null) => void;
}

export function ExperienceDetailPeriodPicker({
  value,
  isPage,
  open,
  top,
  rootRef,
  buttonRef,
  selectedDateRange,
  onToggle,
  onChange,
}: ExperienceDetailPeriodPickerProps) {
  return (
    <div ref={rootRef} className="relative flex items-center gap-1">
      <button
        ref={buttonRef}
        type="button"
        aria-label="기간 선택"
        aria-expanded={open}
        className="flex min-w-0 cursor-pointer items-center gap-1 rounded-sm text-secondary focus-visible:shadow-focus-ring focus-visible:outline-none"
        onClick={onToggle}
      >
        <CalendarIcon className="size-[21px] shrink-0 text-tertiary" />
        <span>{value}</span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="기간 선택"
          className={cn(
            'z-60',
            isPage
              ? 'absolute top-full left-0 mt-2'
              : 'fixed right-[max(1rem,calc((min(100vw,500px)-24rem)/2))]',
          )}
          style={isPage ? undefined : { top: top ?? undefined }}
        >
          {isPage ? (
            <RangeCalendar
              value={selectedDateRange}
              defaultVisibleMonth={selectedDateRange?.start ?? new Date()}
              onChange={onChange}
            />
          ) : (
            <SingleMonthRangeCalendar
              value={selectedDateRange}
              defaultVisibleMonth={selectedDateRange?.start ?? new Date()}
              onChange={onChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
