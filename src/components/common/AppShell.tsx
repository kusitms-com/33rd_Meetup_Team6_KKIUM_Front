'use client';

import * as React from 'react';

import { Sidebar } from '@/components/common/Sidebar';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed] = React.useState(false);
  const sidebarWidth = collapsed ? '73px' : '252px';
  const appContentLeft = collapsed ? '89px' : '268px';

  React.useEffect(() => {
    document.documentElement.style.setProperty('--app-sidebar-width', sidebarWidth);
    document.documentElement.style.setProperty('--app-content-left', appContentLeft);

    return () => {
      document.documentElement.style.removeProperty('--app-sidebar-width');
      document.documentElement.style.removeProperty('--app-content-left');
    };
  }, [appContentLeft, sidebarWidth]);

  return (
    <div
      className={cn(
        'min-h-full p-4',
        // sidebar-width는 사이드바 자체 너비, content-left는 left-4 여백까지 포함한 콘텐츠 시작 위치
        collapsed
          ? '[--app-content-left:89px] [--app-sidebar-width:73px]'
          : '[--app-content-left:268px] [--app-sidebar-width:252px]',
      )}
    >
      <Sidebar collapsed={collapsed} />
      <main
        className={cn('min-h-[calc(100vh-32px)] min-w-0', collapsed ? 'ml-[73px]' : 'ml-[252px]')}
      >
        {children}
      </main>
    </div>
  );
}
