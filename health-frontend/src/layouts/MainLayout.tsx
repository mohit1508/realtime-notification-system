import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      <main className="mb-auto max-w-[1400px] mx-auto py-4 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
