import { NavLink } from "react-router";
import Button from "../../components/common/Button";
import { useState } from "react";
import ModalPassword from "../../components/modals/ModalPassword";

export interface ProfileMenu {
  label: string;
  to: string;
}

interface Props {
  menu: ProfileMenu[];
  closeMenu?: () => void;
}

const Sidebar = ({ menu, closeMenu }: Props) => {
  const [IsOpenPassword, setIsOpenPassword] = useState<boolean>(false);

  return (
    <div className="hidden lg:flex flex-col justify-between rounded-lg border-1 border-slate-400 bg-frame-sec-tint xl:max-w-[200px] p-2 xl:px-4 xl:py-6 font-semibold text-lg gap-4">
      <div className="flex flex-col gap-2">
        {menu.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `p-2 text-center rounded-r-lg hover:bg-frame-pri ${
                isActive && "text-primary font-bold bg-frame-ter border-l-2"
              }`
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          rounded="round"
          onClick={() => setIsOpenPassword(true)}
        >
          Change Password
        </Button>
        <Button
          size="sm"
          rounded="round"
          className="bg-info-error border-info-error"
        >
          Delete Account
        </Button>
      </div>
      <ModalPassword
        isOpen={IsOpenPassword}
        onClose={() => setIsOpenPassword(false)}
      />
    </div>
  );
};

export default Sidebar;
