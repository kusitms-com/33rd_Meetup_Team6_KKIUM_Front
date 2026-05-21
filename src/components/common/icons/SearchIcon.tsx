import type { SVGProps } from 'react';

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 11C17 7.68629 14.3137 5 11 5C7.6863 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17L11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58173 3 11 3C15.4183 3 19 6.58172 19 11C19 15.4183 15.4183 19 11 19L11 17C14.3137 17 17 14.3137 17 11Z"
        fill="currentColor"
      />
      <path
        d="M14.7988 16.2129L16.213 14.7987L20.5887 19.1743L20.6329 19.9256L19.9258 20.6327L19.1745 20.5885L14.7988 16.2129Z"
        fill="currentColor"
      />
    </svg>
  );
}
