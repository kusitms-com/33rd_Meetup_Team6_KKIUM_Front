'use client';

import * as React from 'react';

import { ApplyAddJobPostingModal } from './_components/ApplyAddJobPostingModal';
import { ApplyListSection } from './_components/ApplyListSection';
import { SearchBar } from '@/components/common/SearchBar';
import { useDebouncedValue } from '@/hooks/experience/useDebouncedValue';

export default function ApplyListPage() {
  const [keyword, setKeyword] = React.useState('');
  const debouncedKeyword = useDebouncedValue(keyword.trim(), 300);

  return (
    <section className="w-full px-32">
      <div className="flex w-full min-w-0 max-w-[1560px] flex-col gap-5">
        <h1 className="max-w-[687px] text-2xl font-extrabold leading-9 text-gray-main">
          지원 관리
        </h1>

        <div className="flex w-full min-w-0 items-center">
          <SearchBar
            placeholder="공고명, 기업명, 모집 분야를 검색해주세요"
            className="h-11 w-[551px]"
            value={keyword}
            onChange={(event) => setKeyword(event.currentTarget.value)}
            onClear={() => setKeyword('')}
          />
          <div className="ml-auto shrink-0">
            <ApplyAddJobPostingModal />
          </div>
        </div>

        <ApplyListSection keyword={debouncedKeyword} />
      </div>
    </section>
  );
}
