'use client';

import { create } from 'zustand';

export type ApplyHighlightKeyword = {
  keyword: string;
  sources: string[];
};

type ApplyHighlightKeywordState = {
  experienceId: number | null;
  keywords: ApplyHighlightKeyword[];
  setKeywords: (experienceId: number, keywords: ApplyHighlightKeyword[]) => void;
  clearKeywords: () => void;
};

export const useApplyHighlightKeywordStore = create<ApplyHighlightKeywordState>((set) => ({
  experienceId: null,
  keywords: [],
  setKeywords: (experienceId, keywords) => {
    set({ experienceId, keywords });
  },
  clearKeywords: () => {
    set({ experienceId: null, keywords: [] });
  },
}));
