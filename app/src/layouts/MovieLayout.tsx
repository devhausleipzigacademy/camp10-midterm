import { Outlet } from 'react-router-dom';

export function MovieLayout() {
  return (
    <div className="bg-dark flex flex-col justify-between m-auto w-[375px] h-[667px] rounded-3xl">
      <Outlet />
    </div>
  );
}
