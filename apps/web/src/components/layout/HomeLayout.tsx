import { Outlet } from 'react-router';

import Footer from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

export function HomeLayout() {
  return (
    <div className="w-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="outline w-full"></div>
      <Footer />
    </div>
  );
}
