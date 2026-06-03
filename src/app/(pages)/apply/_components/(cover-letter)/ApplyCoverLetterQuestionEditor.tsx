'use client';

import * as React from 'react';

import type { JdId } from '@/app/api/apply/types';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { APPLY_COVER_LETTER_AI_DRAFT_PANEL_BLEED } from '../../_constants/applyConstants';
import { useApplyResumeAiDraft } from '@/hooks/apply/useApplyResumeAiDraft';

import { AiDraftButton } from './AiDraftButton';
import { ApplyCoverLetterAiDraftPanel } from './AiDraftPanel';
import { ApplyCoverLetterQuestionMenuDropdown } from './ApplyCoverLetterQuestionMenuDropdown';

export interface ApplyCoverLetterQuestionEditorProps {
  questionId?: string;
  order: number;
  title: string;
  value: string;
  onChange: (value: string) => void;
  onCommitTitle?: (title: string) => void;
  hasSelectedExperiences?: boolean;
  hasAiDraft?: boolean;
  aiDraft?: string;
  onAiDraftChange?: (aiDraft: string) => void;
  jdId?: JdId | null;
  jdQuestionId?: number | null;
  selectedExperienceIds?: string[];
  canDeleteQuestion?: boolean;
  isDeletingQuestion?: boolean;
  isUpdatingTitle?: boolean;
  onDeleteQuestion?: () => void;
  className?: string;
}

function formatQuestionOrder(order: number) {
  return String(order).padStart(2, '0');
}

function isDefaultCoverLetterQuestionTitle(title: string) {
  return /^\d+번 문항$/.test(title.trim());
}

function getDefaultCoverLetterQuestionTitle(order: number) {
  return `${order}번 문항`;
}

export function ApplyCoverLetterQuestionEditor({
  questionId,
  order,
  title,
  value,
  onChange,
  onCommitTitle,
  hasSelectedExperiences = false,
  hasAiDraft = false,
  aiDraft = '',
  onAiDraftChange,
  jdId,
  jdQuestionId,
  selectedExperienceIds = [],
  canDeleteQuestion = true,
  isDeletingQuestion = false,
  isUpdatingTitle = false,
  onDeleteQuestion,
  className,
}: ApplyCoverLetterQuestionEditorProps) {
  const titleTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const dismissedAutoTitleEditQuestionIdsRef = React.useRef<Set<string>>(new Set());
  const [isTitleEditing, setIsTitleEditing] = React.useState(false);
  const [titleDraft, setTitleDraft] = React.useState(title);
  const isPlaceholderTitle = isDefaultCoverLetterQuestionTitle(title);
  const [aiDraftOpen, setAiDraftOpen] = React.useState(false);
  const [draftContent, setDraftContent] = React.useState('');
  const {
    cachedDraft,
    generateDraft,
    isGenerating: isAiDraftGenerating,
  } = useApplyResumeAiDraft(jdId, jdQuestionId, selectedExperienceIds);

  const storedDraftText = aiDraft.trim();
  const hasStoredAiDraft = hasAiDraft && storedDraftText.length > 0;

  React.useEffect(() => {
    if (!hasSelectedExperiences && !hasStoredAiDraft) {
      setAiDraftOpen(false);
      setDraftContent('');
      return;
    }

    if (hasStoredAiDraft) {
      setDraftContent(storedDraftText);
      setAiDraftOpen(true);
      return;
    }

    setAiDraftOpen(false);

    const resolvedDraft = cachedDraft.trim();
    setDraftContent(resolvedDraft);

    if (resolvedDraft.length > 0) {
      setAiDraftOpen(true);
    }
  }, [
    order,
    storedDraftText,
    hasStoredAiDraft,
    cachedDraft,
    hasSelectedExperiences,
  ]);

  const canUseAiDraft = hasSelectedExperiences || hasStoredAiDraft;
  const hasDraft = draftContent.trim().length > 0;
  const showAiDraftPanel = hasDraft && canUseAiDraft;
  const canGenerateAiDraft =
    hasSelectedExperiences &&
    !hasStoredAiDraft &&
    jdId != null &&
    jdQuestionId != null &&
    selectedExperienceIds.length > 0;

  const handleDraftGenerated = (draft: string) => {
    setDraftContent(draft);
    setAiDraftOpen(true);
    onAiDraftChange?.(draft);
  };

  const handleExpandedChange = (expanded: boolean) => {
    setAiDraftOpen(expanded);
  };

  React.useEffect(() => {
    if (!isTitleEditing) {
      setTitleDraft(title);
    }
  }, [title, isTitleEditing]);

  React.useEffect(() => {
    setIsTitleEditing(false);
  }, [questionId]);

  React.useEffect(() => {
    if (!questionId || !isPlaceholderTitle || isTitleEditing) {
      return;
    }

    if (dismissedAutoTitleEditQuestionIdsRef.current.has(questionId)) {
      return;
    }

    setTitleDraft('');
    setIsTitleEditing(true);
  }, [questionId, isPlaceholderTitle, isTitleEditing]);

  React.useEffect(() => {
    if (!isTitleEditing) {
      return;
    }

    const titleTextarea = titleTextareaRef.current;
    titleTextarea?.focus();

    if (titleTextarea && titleTextarea.value.length > 0) {
      titleTextarea.setSelectionRange(titleTextarea.value.length, titleTextarea.value.length);
    }
  }, [isTitleEditing, questionId]);

  const startTitleEditing = () => {
    setTitleDraft(isPlaceholderTitle ? '' : title);
    setIsTitleEditing(true);
  };

  const cancelTitleEditing = () => {
    if (questionId && isPlaceholderTitle) {
      dismissedAutoTitleEditQuestionIdsRef.current.add(questionId);
    }

    setTitleDraft(title);
    setIsTitleEditing(false);
  };

  const commitTitleEditing = () => {
    const nextTitle = titleDraft.trim();

    if (!nextTitle) {
      if (isPlaceholderTitle) {
        return;
      }

      cancelTitleEditing();
      return;
    }

    if (nextTitle === title.trim()) {
      cancelTitleEditing();
      return;
    }

    setIsTitleEditing(false);
    onCommitTitle?.(nextTitle);
  };

  const menuDisabled = isDeletingQuestion || isUpdatingTitle;

  return (
    <article
      data-slot="cover-letter-question-editor"
      className={cn(
        'flex min-h-0 w-full flex-1 flex-col gap-3 overflow-visible',
        className,
      )}
    >
      <div className="flex w-full min-w-0 items-start gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-0.5">
          <span className="shrink-0 pt-px text-xl font-bold leading-7 text-mint-300">
            {formatQuestionOrder(order)}.
          </span>
          <textarea
            ref={titleTextareaRef}
            value={isTitleEditing ? titleDraft : title}
            readOnly={!isTitleEditing}
            rows={2}
            onChange={(event) => {
              if (!isTitleEditing) {
                return;
              }

              setTitleDraft(event.target.value);
            }}
            onKeyDown={(event) => {
              if (!isTitleEditing || event.nativeEvent.isComposing) {
                return;
              }

              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                commitTitleEditing();
              }

              if (event.key === 'Escape') {
                event.preventDefault();
                cancelTitleEditing();
              }
            }}
            placeholder={
              isTitleEditing && titleDraft.length === 0
                ? getDefaultCoverLetterQuestionTitle(order)
                : undefined
            }
            aria-label={`${formatQuestionOrder(order)} 문항 제목`}
            aria-readonly={!isTitleEditing}
            className={cn(
              'min-h-14 max-h-14 min-w-0 flex-1 resize-none overflow-x-hidden overflow-y-auto border-none bg-transparent p-0 text-xl font-bold leading-7 wrap-break-word text-strong outline-none placeholder:text-tertiary focus-visible:ring-0',
              !isTitleEditing && 'cursor-default',
              isTitleEditing && 'ring-2 ring-border-default rounded-sm',
            )}
          />
        </div>
        <div className="mt-px flex shrink-0 items-center gap-1">
          <AiDraftButton
            hasDraft={hasDraft || hasStoredAiDraft}
            canGenerate={canGenerateAiDraft}
            isGenerating={isAiDraftGenerating}
            disabled={!canUseAiDraft || hasStoredAiDraft}
            onGenerate={generateDraft}
            onDraftGenerated={handleDraftGenerated}
          />
          <ApplyCoverLetterQuestionMenuDropdown
            disabled={menuDisabled}
            deleteDisabled={!canDeleteQuestion}
            isDeleting={isDeletingQuestion}
            onEditTitle={startTitleEditing}
            onDelete={onDeleteQuestion}
          />
        </div>
      </div>

      <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-visible">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="여기에 자기소개서를 작성해보세요."
          aria-label={`${formatQuestionOrder(order)} ${title} 답변`}
          className={cn(
            'h-full min-h-0 flex-1 resize-none border-none bg-transparent p-0 body-1-regular leading-6 text-strong shadow-none placeholder:text-tertiary focus-visible:border-none focus-visible:bg-transparent focus-visible:ring-0',
            showAiDraftPanel && !aiDraftOpen && 'pb-[47px]',
            showAiDraftPanel && aiDraftOpen && hasDraft && 'pb-56',
          )}
        />

        {showAiDraftPanel && (
          <ApplyCoverLetterAiDraftPanel
            expanded={aiDraftOpen}
            onExpandedChange={handleExpandedChange}
            draft={draftContent}
            hasDraft={hasDraft}
            className={APPLY_COVER_LETTER_AI_DRAFT_PANEL_BLEED}
          />
        )}
      </div>
    </article>
  );
}
