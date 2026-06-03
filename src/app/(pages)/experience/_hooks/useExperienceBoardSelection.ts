'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import type { ExperienceCategory } from '@/app/(pages)/experience/_utils/ExperienceCategory';
import { EXPERIENCE_ORDER_CATEGORIES } from '@/app/(pages)/experience/_utils/experienceOrder';

interface ExperienceSelectionItem {
  id: string;
}

interface UseExperienceBoardSelectionParams {
  initialSelectedExperienceId?: string;
  keyword?: string;
}

function isExperienceCategory(category: string | null): category is ExperienceCategory {
  return EXPERIENCE_ORDER_CATEGORIES.includes(category as ExperienceCategory);
}

export function useExperienceBoardSelection({
  initialSelectedExperienceId,
  keyword,
}: UseExperienceBoardSelectionParams) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedExperienceIdFromQuery = searchParams.get('selected') ?? initialSelectedExperienceId;
  const selectedCategoryFromQuery = searchParams.get('category');
  const initialSelectedCategory = isExperienceCategory(selectedCategoryFromQuery)
    ? selectedCategoryFromQuery
    : 'all';
  const [selectedCategory, setSelectedCategory] =
    React.useState<ExperienceCategory>(initialSelectedCategory);
  const [selectedExperienceId, setSelectedExperienceId] = React.useState<string | undefined>(
    selectedExperienceIdFromQuery,
  );
  const [panelOpen, setPanelOpen] = React.useState(Boolean(selectedExperienceIdFromQuery));
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAppliedInitialSelectionRef = React.useRef(false);
  const previousKeywordRef = React.useRef(keyword);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const applyInitialSelectedExperience = React.useCallback(
    (experiences: readonly ExperienceSelectionItem[]) => {
      if (hasAppliedInitialSelectionRef.current || !selectedExperienceIdFromQuery) {
        return;
      }

      const initialSelectedExperience = experiences.find(
        (experience) => experience.id === selectedExperienceIdFromQuery,
      );

      if (!initialSelectedExperience) {
        return;
      }

      clearCloseTimer();
      setSelectedCategory(initialSelectedCategory);
      setSelectedExperienceId(initialSelectedExperience.id);
      setPanelOpen(true);
      hasAppliedInitialSelectionRef.current = true;
    },
    [clearCloseTimer, initialSelectedCategory, selectedExperienceIdFromQuery],
  );

  React.useEffect(() => {
    if (previousKeywordRef.current === keyword) {
      return;
    }

    previousKeywordRef.current = keyword;
    clearCloseTimer();
    setSelectedExperienceId(undefined);
    setPanelOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    params.delete('selected');

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    router.replace(params.size > 0 ? `/experience?${params.toString()}` : '/experience', {
      scroll: false,
    });
  }, [clearCloseTimer, keyword, router, searchParams, selectedCategory]);

  React.useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const handleCategoryChange = React.useCallback(
    (category: ExperienceCategory) => {
      clearCloseTimer();
      const nextPath = category === 'all' ? '/experience' : `/experience?category=${category}`;

      router.replace(nextPath, { scroll: false });
      setSelectedCategory(category);
      setSelectedExperienceId(undefined);
      setPanelOpen(false);
    },
    [clearCloseTimer, router],
  );

  const handleExperienceSelect = React.useCallback(
    (experience: ExperienceSelectionItem) => {
      clearCloseTimer();
      setSelectedExperienceId(experience.id);
      setPanelOpen(true);
      router.replace(`/experience?selected=${experience.id}&category=${selectedCategory}`, {
        scroll: false,
      });
    },
    [clearCloseTimer, router, selectedCategory],
  );

  const closeSelectedExperience = React.useCallback(() => {
    clearCloseTimer();
    setPanelOpen(false);
    setSelectedExperienceId(undefined);
    router.replace('/experience', { scroll: false });
  }, [clearCloseTimer, router]);

  const handlePanelClose = React.useCallback(() => {
    clearCloseTimer();
    setPanelOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setSelectedExperienceId(undefined);
      closeTimerRef.current = null;
    }, 300);
    router.replace('/experience', { scroll: false });
  }, [clearCloseTimer, router]);

  const handlePanelExpand = React.useCallback(
    (experienceId?: string) => {
      if (!experienceId) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      params.set('selected', experienceId);
      params.set('category', selectedCategory);
      params.set('view', 'detail');

      router.push(`/experience?${params.toString()}`);
    },
    [router, searchParams, selectedCategory],
  );

  return {
    selectedCategory,
    selectedExperienceId,
    panelOpen,
    applyInitialSelectedExperience,
    handleCategoryChange,
    handleExperienceSelect,
    closeSelectedExperience,
    handlePanelClose,
    handlePanelExpand,
  };
}
