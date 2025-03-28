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

const Topbar = ({ menu, closeMenu }: Props) => {
  return (
    <div className="flex lg:hidden sec-padding fixed flex-row w-full h-10 justify-between rounded-b-lg border-1 border-slate-400 bg-frame-sec font-semibold text-lg gap-4">
      <div className="flex flex-row gap-1">
        {menu.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `p-1 text-center rounded-b-lg hover:bg-frame-pri ${
                isActive &&
                "text-primary font-bold bg-frame-ter border-t-2"
              }`
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <Button size="sm" rounded="full" className="bg-info-error border-info-error">
        Delete Account
      </Button>
    </div>
  );
};

export default Topbar;
