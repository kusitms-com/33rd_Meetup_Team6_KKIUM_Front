'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  hasApiAccessToken,
  isAuthExemptPath,
  isPublicAuthPath,
} from '@/app/_utils/authFetch';
import { Sidebar } from '@/components/common/Sidebar';

const SIDEBAR_WIDTH = {
  collapsed: '73px',
  expanded: '252px',
} as const;
const MOBILE_LANDING_MEDIA_QUERY = '(max-width: 767px)';

function isRootPath(pathname: string) {
  return (pathname.replace(/\/$/, '') || '/') === '/';
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MOBILE_LANDING_MEDIA_QUERY).matches;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed] = React.useState(false);
  const [canRender, setCanRender] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => hasApiAccessToken());
  const [isMobile, setIsMobile] = React.useState(false);

  const isRoot = isRootPath(pathname);
  const hideSidebar =
    isPublicAuthPath(pathname) || (isRoot && !isAuthenticated && isMobile);
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;
  const appShellStyle = {
    '--app-sidebar-width': hideSidebar ? '0px' : sidebarWidth,
    '--app-content-left': hideSidebar ? '0px' : sidebarWidth,
  } as React.CSSProperties;

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_LANDING_MEDIA_QUERY);
    const syncMobile = () => setIsMobile(mediaQueryList.matches);

    syncMobile();
    mediaQueryList.addEventListener('change', syncMobile);

    return () => mediaQueryList.removeEventListener('change', syncMobile);
  }, []);

  React.useEffect(() => {
    if (isPublicAuthPath(pathname)) {
      setCanRender(true);
      return;
    }

    if (isAuthExemptPath(pathname)) {
      setIsAuthenticated(hasApiAccessToken());
      setCanRender(true);
      return;
    }

    const hasAccess = hasApiAccessToken();

    setIsAuthenticated(hasAccess);

    if (hasAccess) {
      setCanRender(true);
      return;
    }

    if (isRootPath(pathname) && isMobileViewport()) {
      setCanRender(true);
      return;
    }

    if (!hasAccess) {
      setCanRender(false);
      router.replace('/login');
      return;
    }
  }, [pathname, router]);

  React.useEffect(() => {
    const width = hideSidebar ? '0px' : sidebarWidth;
    document.documentElement.style.setProperty('--app-sidebar-width', width);
    document.documentElement.style.setProperty('--app-content-left', width);

    return () => {
      document.documentElement.style.removeProperty('--app-sidebar-width');
      document.documentElement.style.removeProperty('--app-content-left');
    };
  }, [hideSidebar, sidebarWidth]);

  if (!canRender) {
    return null;
  }

  return (
    <div
      style={appShellStyle}
      className="min-h-dvh bg-background-default"
    >
      {!hideSidebar && <Sidebar collapsed={collapsed} />}
      <main className={`ml-(--app-sidebar-width) min-h-dvh min-w-0 ${hideSidebar ? 'pt-0' : 'pt-[30px]'}`}>
        <div className={hideSidebar ? undefined : 'mx-20'}>{children}</div>
      </main>
    </div>
  );
}
