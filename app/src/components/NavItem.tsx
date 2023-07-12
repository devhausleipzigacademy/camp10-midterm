import { NavLink } from 'react-router-dom';

type NavItemProps = {
  link: string;
  icon: React.ReactNode;
};

export function NavItem({ link, icon }: NavItemProps) {
  return (
    <NavLink
      className={({ isActive }) => {
        return `${isActive ? 'text-white' : 'text-white-dimmed'} text-[1.5rem]`;
      }}
      to={link}
    >
      {icon}
    </NavLink>
  );
}
