import { NavLink } from "react-router";

export interface ProfileMenu {
  label: string;
  to: string;
}

interface Props {
  menu: ProfileMenu[];
  closeMenu?: () => void;
}

const Sidebar = ({ menu, closeMenu }: Props) => {
  return (
    <div className="flex flex-col rounded-lg border-1 border-lg border-grey w-[200px] px-4 py-6 text-2xl gap-4">
      {menu.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `p-2 text-center rounded-r-lg hover:bg-dark-grey-shade hover:scale-[1.1] ${
              isActive && "text-primary font-bold bg-dark-grey-shade border-l-2"
            }`
          }
          onClick={closeMenu}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
