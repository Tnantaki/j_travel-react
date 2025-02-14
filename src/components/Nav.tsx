import { NavLink } from "react-router";
import LinkButton from "./LinkButton";

export interface NavMenu {
  label: string;
  to: string;
}

interface Props {
  menu: NavMenu[];
  className?: string;
  closeMenu?: () => void
}

const Nav = ({ menu, className, closeMenu }: Props) => {
  return (
    <nav className={`${className} font-medium text-lg`}>
      {menu.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `uppercase hover:text-primary hover:scale-[1.1] ${isActive && "text-primary font-bold"}`
          }
          onClick={closeMenu}
        >
          {link.label}
        </NavLink>
      ))}
      <LinkButton to="/login" size="sm" primary={true} onClick={closeMenu}>Login</LinkButton>
    </nav>
  );
};

export default Nav;