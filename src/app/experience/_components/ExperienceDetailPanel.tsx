'use client';

import Image from 'next/image';
import * as React from 'react';

import type { ExperienceItem } from '@/app/experience/_components/ExperienceCardGrid';
import type { ExperienceCategory } from '@/app/experience/_components/ExperienceCategoryTab';
import { ExpandIcon } from '@/components/common/icons/ExpandIcon';
import { XIcon } from '@/components/common/icons/XIcon';
import { Tag } from '@/components/common/Tag';
import { DetailInput } from '@/components/common/DetailInput';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categoryMap: Record<
  Exclude<ExperienceCategory, 'all'>,
  {
    label: string;
    icon: string;
  }
> = {
  activity: {
    label: '학내외활동',
    icon: '/activity-selected.svg',
  },
  career: {
    label: '인턴/직무경력',
    icon: '/career-selected.svg',
  },
  education: {
    label: '수강/교육',
    icon: '/education-selected.svg',
  },
  etc: {
    label: '기타',
    icon: '/etc-selected.svg',
  },
};

const detailFields = [
  ['Situation', 'situation'],
  ['Task', 'task'],
  ['Action', 'action'],
  ['Result', 'result'],
  ['Taken', 'taken'],
] as const;

export interface ExperienceDetailPanelProps extends Omit<
  React.ComponentProps<'aside'>,
  'children'
> {
  experience: ExperienceItem;
  open: boolean;
  onExpand?: () => void;
  onEdit?: () => void;
  onClose: () => void;
}

export function ExperienceDetailPanel({
  experience,
  open,
  onExpand,
  onEdit,
  onClose,
  className,
  onKeyDown,
  ...props
}: ExperienceDetailPanelProps) {
  const category = categoryMap[experience.type];
  const titleId = React.useId();
  const [detail, setDetail] = React.useState(experience.detail);
  const panelRef = React.useRef<HTMLElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousExperienceIdRef = React.useRef(experience.id);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setEntered(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });

      return () => cancelAnimationFrame(id);
    }

    setEntered(false);
  }, [open]);

  React.useEffect(() => {
    const previousFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (open) {
      closeButtonRef.current?.focus();
    }

    return () => {
      if (previousFocusedElement?.isConnected) {
        previousFocusedElement.focus();
      }
    };
  }, [open]);

  React.useEffect(() => {
    // 같은 경험을 편집 중일 때 부모 렌더로 입력값이 초기화되지 않도록 id 변경만 추적
    if (previousExperienceIdRef.current === experience.id) {
      return;
    }

    previousExperienceIdRef.current = experience.id;
    setDetail(experience.detail);
  }, [experience.id, experience.detail]);

  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, open]);

  const handleDetailChange =
    (key: keyof ExperienceItem['detail']): React.ChangeEventHandler<HTMLTextAreaElement> =>
    (event) => {
      setDetail((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handlePanelKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || event.key !== 'Tab') {
      return;
    }

    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1);

    if (focusableElements.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      if (activeElement === firstElement || !panel.contains(activeElement)) {
        event.preventDefault();
        lastElement.focus();
      }

      return;
    }

    if (activeElement === lastElement || !panel.contains(activeElement)) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <aside
      ref={panelRef}
      data-slot="experience-detail-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={cn(
        'fixed top-0 right-0 z-40 flex h-dvh w-full max-w-[500px] flex-col bg-background-default px-6 pt-8 shadow-2xl',
        'transition-transform duration-300 ease-out will-change-transform',
        open && entered ? 'translate-x-0' : 'translate-x-full',
        className,
      )}
      onKeyDown={handlePanelKeyDown}
      {...props}
    >
      <header className="mb-6 grid h-8 grid-cols-[32px_1fr_32px] items-center">
        <button
          type="button"
          aria-label="경험 상세 확장 보기"
          className="flex size-8 cursor-pointer items-center justify-center text-primary"
          onClick={onExpand}
        >
          <ExpandIcon className="size-6" />
        </button>

        <h2 id={titleId} className="text-center heading-3-extra-bold text-strong">
          상세 경험
        </h2>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="경험 상세 패널 닫기"
          className="flex size-8 cursor-pointer items-center justify-center text-primary"
          onClick={onClose}
        >
          <XIcon className="size-6" />
        </button>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="heading-2-bold text-strong">{experience.title}</h3>
            <p className="body-3-regular text-quaternary">{experience.description}</p>
          </div>

          <Button type="button" variant="secondary" onClick={onEdit}>
            수정하기
          </Button>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex w-[83px] shrink-0 flex-col items-center gap-0.5">
            <Image src={category.icon} alt="" width={72} height={72} className="size-[72px]" />
            <span className="body-3-bold text-strong">{category.label}</span>
          </div>

          <dl className="flex flex-col gap-1.5 pt-2.5">
            {experience.detailInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <dt className="body-3-bold text-strong">{item.label}</dt>
                <dd className="body-3-regular text-secondary">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {experience.skillTags.map((tag, index) => (
              <Tag key={`skill-${tag}-${index}`} tone="skill">
                {tag}
              </Tag>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {experience.competencyTags.map((tag, index) => (
              <Tag key={`competency-${tag}-${index}`} tone="competency">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 h-px w-full shrink-0 bg-gray-300" />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto py-6">
        {detailFields.map(([label, key]) => (
          <div key={key} className="flex w-full flex-col gap-1.5">
            <div className="flex items-center justify-between px-2">
              <h3 className="body-2-bold text-[#1e2939]">{label}</h3>
            </div>
            <DetailInput value={detail[key]} maxLength={1000} onChange={handleDetailChange(key)} />
          </div>
        ))}
      </div>
    </aside>
  );
}
