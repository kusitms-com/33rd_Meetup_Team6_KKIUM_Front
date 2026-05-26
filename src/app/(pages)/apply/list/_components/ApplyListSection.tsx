'use client';

import * as React from 'react';
import { arrayMove } from '@dnd-kit/helpers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';

import type { ApplyListItem } from '@/app/(pages)/apply/_constants/applyMockData';
import { ApplyCard } from './ApplyCard';
import { ApplyDetailSidebar } from './ApplyDetailSidebar';

export interface ApplyListSectionProps {
  cards: ApplyListItem[];
}

export function ApplyListSection({ cards }: ApplyListSectionProps) {
  const [orderedCards, setOrderedCards] = React.useState(cards);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setOrderedCards(cards);
  }, [cards]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const activeItem = React.useMemo(
    () => orderedCards.find((card) => card.id === activeId) ?? null,
    [orderedCards, activeId],
  );

  function handleClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setSidebarOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setActiveId(null);
      closeTimerRef.current = null;
    }, 560);
  }

  function handleCardOpen(cardId: string) {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveId(cardId);
    setSidebarOpen(true);
  }

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    if (event.canceled) {
      return;
    }

    const { source } = event.operation;

    if (!isSortable(source)) {
      return;
    }

    const { initialIndex, index } = source;

    if (initialIndex === index) {
      return;
    }

    setOrderedCards((prev) => arrayMove(prev, initialIndex, index));
  }, []);

  return (
    <>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 gap-5 [@media(min-width:1855px)]:grid-cols-3">
          {orderedCards.map((card, index) => (
            <SortableApplyCard
              key={card.id}
              card={card}
              index={index}
              selected={sidebarOpen && activeId === card.id}
              onCardClick={handleCardOpen}
            />
          ))}
        </div>
      </DragDropProvider>

      <ApplyDetailSidebar open={sidebarOpen} item={activeItem} onClose={handleClose} />
    </>
  );
}

interface SortableApplyCardProps {
  card: ApplyListItem;
  index: number;
  selected: boolean;
  onCardClick: (cardId: string) => void;
}

function SortableApplyCard({ card, index, selected, onCardClick }: SortableApplyCardProps) {
  const { ref, isDragSource } = useSortable({
    id: card.id,
    index,
    type: 'apply-card',
    accept: 'apply-card',
  });

  return (
    <div ref={ref} className={isDragSource ? 'relative z-10 opacity-90' : undefined}>
      <ApplyCard
        applyTitle={card.title}
        companyName={card.companyName}
        jobField={card.jobField}
        period={card.period}
        selected={selected}
        onCardClick={() => onCardClick(card.id)}
        className="max-w-none"
      />
    </div>
  );
}
