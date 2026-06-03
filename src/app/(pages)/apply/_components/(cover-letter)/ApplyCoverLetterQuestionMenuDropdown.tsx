'use client';

import { EditIcon } from '@/components/common/icons/EditIcon';
import { MoreVerticalIcon } from '@/components/common/icons/MoreVerticalIcon';
import { TrashIcon } from '@/components/common/icons/TrashIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface ApplyCoverLetterQuestionMenuDropdownProps {
  disabled?: boolean;
  deleteDisabled?: boolean;
  isDeleting?: boolean;
  onEditTitle?: () => void;
  onDelete?: () => void;
  triggerClassName?: string;
}

export function ApplyCoverLetterQuestionMenuDropdown({
  disabled = false,
  deleteDisabled = false,
  isDeleting = false,
  onEditTitle,
  onDelete,
  triggerClassName,
}: ApplyCoverLetterQuestionMenuDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="문항 메뉴"
          disabled={disabled || isDeleting}
          className={cn(
            'flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-gray-main hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-default disabled:cursor-not-allowed disabled:opacity-50',
            triggerClassName,
          )}
        >
          <MoreVerticalIcon className="size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <DropdownMenuItem
          className="active:bg-gray-300"
          disabled={disabled}
          onSelect={(event) => {
            event.preventDefault();
            onEditTitle?.();
          }}
        >
          <span>문항 수정</span>
          <span className="flex size-8 items-center justify-center">
            <EditIcon className="size-6 text-tertiary" />
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          className="active:bg-gray-300"
          disabled={disabled || deleteDisabled || isDeleting}
          onSelect={(event) => {
            event.preventDefault();
            onDelete?.();
          }}
        >
          <span>{isDeleting ? '삭제 중…' : '문항 삭제'}</span>
          <span className="flex size-8 items-center justify-center">
            <TrashIcon className="size-6 text-red-300" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
