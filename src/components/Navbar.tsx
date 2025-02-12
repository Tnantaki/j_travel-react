import { NavLink } from "react-router";
import Button from "./Button";

const Navbar = () => {
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/packages" },
    { title: "Booking", href: "/booking" },
    { title: "About", href: "/about" },
  ];
  return (
    <nav className="flex w-full wrapper bg-zinc-700 h-18 justify-between items-center absolute z-50">
      <NavLink to='/'>
        <img src={"./logo.svg"} className="size-24" />
      </NavLink>
      <div className="uppercase flex justify-between gap-40 text-xl font-bold text-white font-inter">
        {menuItems.map((item) => (
          <NavLink key={item.title} to={item.href} className={({isActive}) => `hover:text-primary hover:scale-[1.1] ${isActive && 'text-primary'}`}>
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
