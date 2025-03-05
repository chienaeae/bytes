import { Outlet } from 'react-router';

import { Header } from '@/components/header/Header';

export function AIChatLayout() {
  return (
    <div className="min-w-screen flex flex-col">
      <Header />
      <main className="flex h-[calc(90dvh)] flex-col items-center p-4 md:px-24 gap-4">
        <div className="z-10 max-w-5xl w-full h-full text-sm flex">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
