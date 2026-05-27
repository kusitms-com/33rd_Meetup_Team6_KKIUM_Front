import type * as React from 'react';

import { NotionIcon } from '@/components/common/icons/NotionIcon';
import type { Tag } from '@/components/common/Tag';

export function NotionPageIcon({ icon }: { icon?: string | null }) {
  if (!icon) {
    return <NotionIcon className="size-6" />;
  }

  const urlIcon = parseHttpUrlIcon(icon);

  if (urlIcon) {
    return (
      <span
        aria-hidden="true"
        className="size-6 rounded-sm bg-cover bg-center"
        style={{ backgroundImage: `url(${JSON.stringify(urlIcon.href)})` }}
      />
    );
  }

  return <span className="text-xl leading-none">{icon}</span>;
}

export function isUrlIcon(icon: string) {
  return parseHttpUrlIcon(icon) !== null;
}

function parseHttpUrlIcon(icon: string) {
  try {
    const url = new URL(icon);

    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

export function getNotionTypeLabel(type?: string | null) {
  return type === 'database' ? '데이터베이스' : '페이지';
}

export function getNotionTagTone(type?: string | null): React.ComponentProps<typeof Tag>['tone'] {
  return type === 'database' ? 'skill' : 'competency';
}

export function formatLastEditedTime(lastEditedTime?: string | null) {
  if (!lastEditedTime) {
    return '최근 수정일 정보 없음';
  }

  const date = new Date(lastEditedTime);

  if (Number.isNaN(date.getTime())) {
    return lastEditedTime;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
