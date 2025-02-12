import { NavLink } from "react-router";
import Button from "./Button";

const Navbar = () => {
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/" },
    { title: "About", href: "/" },
  ];
  return (
    <nav className="flex w-full wrapper bg-zinc-700 h-20 justify-between items-center absolute z-50">
      <NavLink to='/'>
        <img src={"./logo.svg"} className="size-24" />
      </NavLink>
      <div className="uppercase flex justify-between gap-40 text-xl font-bold text-white font-inter">
        {menuItems.map((item) => (
          <NavLink key={item.title} to={item.href} className="">
            {item.title}
          </NavLink>
        ))}
      </div>
      <NavLink to="/login">
        <Button size="sm" primary={true}>
          Login
        </Button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
