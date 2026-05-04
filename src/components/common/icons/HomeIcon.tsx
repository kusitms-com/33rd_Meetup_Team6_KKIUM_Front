import type { SVGProps } from 'react';

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M13 4L14 3H20L21 4V10L20 11H14L13 10V4Z" fill="currentColor" />
      <path d="M13 14L14 13H20L21 14V20L20 21H14L13 20V14Z" fill="currentColor" />
      <path d="M3 4L4 3H10L11 4V20L10 21H4L3 20V4Z" fill="currentColor" />
    </svg>
  );
}
