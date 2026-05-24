'use client';

import * as React from 'react';

import {
  APPLY_COVER_LETTER_MAX_QUESTIONS,
  applyCoverLetterQuestionsMock,
  type ApplyCoverLetterQuestion,
} from '../../_constants/applyCoverLetterMockData';
import { cn } from '@/lib/utils';

import { ApplyCoverLetterQuestionEditor } from './ApplyCoverLetterQuestionEditor';
import { ApplyCoverLetterQuestionNav } from './ApplyCoverLetterQuestionNav';

export interface ApplyCoverLetterRightPanelProps {
  className?: string;
  initialQuestions?: ApplyCoverLetterQuestion[];
}

function createQuestionId() {
  return `cover-letter-q-${crypto.randomUUID()}`;
}

function createEmptyQuestion(index: number): ApplyCoverLetterQuestion {
  return {
    id: createQuestionId(),
    title: `${index}번 문항`,
    content: '',
  };
}

export function ApplyCoverLetterRightPanel({
  className,
  initialQuestions = applyCoverLetterQuestionsMock,
}: ApplyCoverLetterRightPanelProps) {
  const [questions, setQuestions] = React.useState(initialQuestions);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const activeQuestion = questions[activeIndex];

  const handleAddQuestion = () => {
    setQuestions((prev) => {
      if (prev.length >= APPLY_COVER_LETTER_MAX_QUESTIONS) {
        return prev;
      }

      setActiveIndex(prev.length);
      return [...prev, createEmptyQuestion(prev.length + 1)];
    });
  };

  const handleContentChange = (content: string) => {
    setQuestions((prev) =>
      prev.map((question, index) => (index === activeIndex ? { ...question, content } : question)),
    );
  };

  const handleTitleChange = (title: string) => {
    setQuestions((prev) =>
      prev.map((question, index) => (index === activeIndex ? { ...question, title } : question)),
    );
  };

  React.useEffect(() => {
    if (activeIndex >= questions.length) {
      setActiveIndex(Math.max(0, questions.length - 1));
    }
  }, [activeIndex, questions.length]);

  if (!activeQuestion) {
    return null;
  }
  //현재는 무조건 자소서 문항이 있다는 가정하에 구현됨 
  return (
    <section
      data-slot="cover-letter-right-panel"
      className={cn('flex h-full min-h-0 w-full min-w-0 flex-col gap-6 pb-4', className)}
    >
      <ApplyCoverLetterQuestionNav
        className="mt-6 shrink-0"
        questionCount={questions.length}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onAddQuestion={handleAddQuestion}
      />

      <ApplyCoverLetterQuestionEditor
        order={activeIndex + 1}
        title={activeQuestion.title}
        value={activeQuestion.content}
        onChange={handleContentChange}
        onTitleChange={handleTitleChange}
        onAiDraftClick={() => {
        }}
      />
    </section>
  );
}
