'use client';

import { StarIcon } from '@/components/common/icons/StarIcon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface ApplyCoverLetterQuestionEditorProps {
  order: number;
  title: string;
  value: string;
  onChange: (value: string) => void;
  onTitleChange: (title: string) => void;
  onAiDraftClick?: () => void;
  className?: string;
}

function formatQuestionOrder(order: number) {
  return String(order).padStart(2, '0');
}

export function ApplyCoverLetterQuestionEditor({
  order,
  title,
  value,
  onChange,
  onTitleChange,
  onAiDraftClick,
  className,
}: ApplyCoverLetterQuestionEditorProps) {
  return (
    <article
      data-slot="cover-letter-question-editor"
      className={cn(
        'flex min-h-0 w-full flex-1 flex-col gap-3 overflow-hidden pr-10',
        className,
      )}
    >
      <div className="flex w-full min-w-0 items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-0.5">
          <span className="shrink-0 text-xl font-bold leading-7 text-mint-300">
            {formatQuestionOrder(order)}.
          </span>
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            aria-label={`${formatQuestionOrder(order)} 문항 제목`}
            className="h-7 min-w-0 flex-1 border-none bg-transparent p-0 text-xl font-bold leading-7 text-strong outline-none placeholder:text-tertiary focus-visible:ring-0"
          />
        </div>
        <Button
          type="button"
          variant="ai"
          size="small"
          className="shrink-0"
          leftIcon={<StarIcon className="text-on-fill" />}
          onClick={onAiDraftClick}
        >
          AI 초안
        </Button>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="여기에 자기소개서를 작성해보세요."
          aria-label={`${formatQuestionOrder(order)} ${title} 답변`}
          className="h-full min-h-0 flex-1 resize-none border-none bg-transparent p-0 body-1-regular leading-6 text-strong shadow-none placeholder:text-tertiary focus-visible:border-none focus-visible:bg-transparent focus-visible:ring-0"
        />
      </div>
    </article>
  );
}
