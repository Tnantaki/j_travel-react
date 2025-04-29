import { NavLink } from "react-router";
import LinkButton from "./common/LinkButton";
import UserService from "../services/user-service";
import UserDropdown from "./UserDropdown";

export interface NavMenu {
  label: string;
  to: string;
}

interface Props {
  menu: NavMenu[];
  className?: string;
  closeMenu?: () => void;
}

const Nav = ({ menu, className, closeMenu }: Props) => {
  const user = UserService.getCurrentUser();

  return (
    <nav className={`${className} font-medium text-lg text-char-sec h-full`}>
      {menu.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `uppercase hover:text-primary flex justify-center grow-1 h-full items-center transition-colors duration-300 ${
              isActive && "text-primary font-bold bg-frame-red-shade"
            }`
          }
          onClick={closeMenu}
        >
          {link.label}
        </NavLink>
      ))}
      {!user && (
        <LinkButton to="/login" size="sm" onClick={closeMenu}>
          Login
        </LinkButton>
      )}
      {user && <UserDropdown />}
    </nav>
  );
};

export default Nav;
