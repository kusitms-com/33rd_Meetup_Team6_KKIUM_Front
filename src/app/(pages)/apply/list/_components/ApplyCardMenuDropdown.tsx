import { NomalStarIcon } from '@/components/common/icons/NomalStarIcon';
import { PencilIcon } from '@/components/common/icons/PencilIcon';
import { TrashIcon } from '@/components/common/icons/TrashIcon';

export function ApplyCardMenuDropdown() {
  return (
    <div
      className="absolute right-0 top-9 z-20 inline-flex w-48 flex-col overflow-hidden rounded-lg border border-border-default bg-background-w shadow-lg"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="inline-flex h-10 w-full cursor-pointer items-center justify-between border-b border-gray-300 px-3 py-1 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-default"
      >
        <span className="body-1-bold text-gray-600">제목 수정하기</span>
        <PencilIcon className="size-6 text-gray-600" />
      </button>

      <button
        type="button"
        className="inline-flex h-10 w-full cursor-pointer items-center justify-between border-b border-gray-300 px-3 py-1 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-default"
      >
        <span className="body-1-bold text-gray-600">목표 공고 등록하기</span>
        <NomalStarIcon className="size-6 text-gray-600" />
      </button>

      <button
        type="button"
        className="inline-flex h-10 w-full cursor-pointer items-center justify-between px-3 py-1 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-default"
      >
        <span className="body-1-bold text-red-300">삭제</span>
        <TrashIcon className="size-6 text-red-300" />
      </button>
    </div>
  );
}
