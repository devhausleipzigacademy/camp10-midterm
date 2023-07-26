import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function RootLayout() {
  return (
    <div className="bg-dark text-white flex flex-col justify-between m-auto w-[375px] h-[667px] rounded-3xl">
      <div className="pt-8 px-5 flex-1 h-[580px]">
        <Outlet />
      </div>
      <Navbar/>
    </div>
  );
}