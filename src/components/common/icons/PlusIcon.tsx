import type { SVGProps } from 'react';

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M11.25 4H12.75V20H11.25V4Z" fill="currentColor" />
      <path d="M4 11.25H20V12.75H4V11.25Z" fill="currentColor" />
    </svg>
  );
}
