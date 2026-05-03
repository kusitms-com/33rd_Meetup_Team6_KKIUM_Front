import type { SVGProps } from 'react';

export function ApplicationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16 4L16.75 4.75V7.3125H15.25V5.5H8.75V7.3125H7.25V4.75L8 4H16Z"
        fill="currentColor"
      />
      <path
        d="M21.875 7V19L21 19.875H3L2.125 19V7L3 6.125H21L21.875 7ZM7.125 8V18H8.875V8H7.125ZM15.125 8V18H16.875V8H15.125Z"
        fill="currentColor"
      />
    </svg>
  );
}
