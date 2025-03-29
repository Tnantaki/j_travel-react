import { NavLink, useLocation, useNavigate, useNavigation } from "react-router";
import Button from "../../components/common/Button";
import { useState } from "react";
import { IoReorderTwo } from "react-icons/io5";

export interface ProfileMenu {
  label: string;
  to: string;
}

interface Props {
  menu: ProfileMenu[];
}

const Topbar = ({ menu }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()

  // Find the active menu item
  const activeItem = menu.find((item) => location.pathname === item.to);

  return (
    <div className="flex lg:hidden sec-padding fixed flex-row w-full h-10 items-center border-b-1 border-slate-400 bg-frame-sec font-semibold text-lg gap-2">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-char-pri hover:text-primary hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoReorderTwo className="size-6 sm:size-8" />
      </button>
      <p className="text-char-pri">My Profile &gt;</p>
      <p className="text-char-pri-tint">{activeItem?.label}</p>
      {/* Mobile Menu Dropdown Container */}
      <div
        className={`absolute left-0 top-full z-40 overflow-hidden bg-frame-sec transition-all duration-300 ease-in-out ${
          isOpen ? "border-gray-500 w-[220px] border-1" : "w-0"
        } lg:hidden`}
      >
        <div className="flex flex-col items-start p-1 gap-1">
          {menu.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `p-1 w-full text-base text-start rounded-r-lg hover:bg-frame-pri ${
                  isActive && "text-primary font-bold bg-frame-ter border-l-2"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            size="sm"
            rounded="full"
            className="bg-info-error border-info-error mt-2 w-full text-base"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
