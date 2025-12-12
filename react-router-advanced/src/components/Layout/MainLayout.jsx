import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';

const MainLayout = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;