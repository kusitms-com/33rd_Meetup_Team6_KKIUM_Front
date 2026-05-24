export const APPLY_COVER_LETTER_MAX_QUESTIONS = 5;

export type ApplyCoverLetterQuestion = {
  id: string;
  title: string;
  content: string;
};

export const applyCoverLetterQuestionsMock: ApplyCoverLetterQuestion[] = [
  { id: 'cover-letter-q1', title: '직무 경험', content: '' },
  { id: 'cover-letter-q2', title: '성장 과정', content: '' },
  { id: 'cover-letter-q3', title: '입사 후 포부', content: '' },
];
