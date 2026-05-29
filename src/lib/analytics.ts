export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function canUseGtag() {
  return Boolean(
    GA_MEASUREMENT_ID && typeof window !== 'undefined' && typeof window.gtag === 'function',
  );
}

export function trackPageView(pathname: string) {
  if (!canUseGtag()) return;

  window.gtag?.('event', 'page_view', {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  });
}
