import type { Tag } from '@/components/common/Tag';

export function isUrlIcon(icon: string) {
  return icon.startsWith('http://') || icon.startsWith('https://');
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
