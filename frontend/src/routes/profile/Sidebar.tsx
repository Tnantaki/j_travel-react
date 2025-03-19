import { NavLink } from "react-router";
import Button from "../../components/common/Button";

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
    <div className="flex flex-col justify-between rounded-lg border-1 border-lg border-grey w-[200px] px-4 py-6 font-semibold text-lg gap-4">
      <div className="flex flex-col">
        {menu.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `p-2 text-center rounded-r-lg hover:bg-dark-grey-shade ${
                isActive &&
                "text-primary font-bold bg-dark-grey-shade border-l-2"
              }`
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <Button size="sm" rounded="full" className="bg-error border-error">
        Delete Account
      </Button>
    </div>
  );
};

export default Sidebar;
