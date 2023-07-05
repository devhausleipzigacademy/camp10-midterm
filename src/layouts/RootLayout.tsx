import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';


export function RootLayout() {
  return (
    <div className="bg-dark text-white flex flex-col justify-between m-auto w-[375px] h-[667px] rounded-3xl">
      <div className="m-auto">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
