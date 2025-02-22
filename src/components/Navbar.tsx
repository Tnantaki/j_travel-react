import { NavLink } from "react-router";
import { useState } from "react";
import Nav from "./Nav";
import logo from "@img/logo.svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Packages", to: "/packages" },
    { label: "Booking", to: "/booking" },
    { label: "About", to: "/about" },
  ];

  return (
    <div className="bg-dark-secondary h-10 sm:h-16 absolute flex w-full sec-padding z-50">
      <div className="flex justify-between items-center page-container">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} className="h-7 sm:h-10" />
        </NavLink>
        {/* Desktop Menu */}
        <Nav
          className="hidden md:flex justify-between items-center grow md:ms-10 lg:ms-30"
          menu={menuItems}
        />
        {/* Mobile Menu Button */}
        <button
          className="md:hidden hover:text-primary hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="stroke-current fill-current size-5 sm:size-7"
            viewBox="0 0 18 12"
          >
            <path d="M1 12C0.71667 12 0.479337 11.904 0.288004 11.712C0.0966702 11.52 0.000670115 11.2827 3.44827e-06 11C-0.000663218 10.7173 0.0953369 10.48 0.288004 10.288C0.48067 10.096 0.718003 10 1 10H17C17.2833 10 17.521 10.096 17.713 10.288C17.905 10.48 18.0007 10.7173 18 11C17.9993 11.2827 17.9033 11.5203 17.712 11.713C17.5207 11.9057 17.2833 12.0013 17 12H1ZM1 7C0.71667 7 0.479337 6.904 0.288004 6.712C0.0966702 6.52 0.000670115 6.28267 3.44827e-06 6C-0.000663218 5.71733 0.0953369 5.48 0.288004 5.288C0.48067 5.096 0.718003 5 1 5H17C17.2833 5 17.521 5.096 17.713 5.288C17.905 5.48 18.0007 5.71733 18 6C17.9993 6.28267 17.9033 6.52033 17.712 6.713C17.5207 6.90567 17.2833 7.00133 17 7H1ZM1 2C0.71667 2 0.479337 1.904 0.288004 1.712C0.0966702 1.52 0.000670115 1.28267 3.44827e-06 1C-0.000663218 0.717333 0.0953369 0.48 0.288004 0.288C0.48067 0.0960001 0.718003 0 1 0H17C17.2833 0 17.521 0.0960001 17.713 0.288C17.905 0.48 18.0007 0.717333 18 1C17.9993 1.28267 17.9033 1.52033 17.712 1.713C17.5207 1.90567 17.2833 2.00133 17 2H1Z" />
          </svg>
        </button>

        {/* Mobile Menu Dropdown Container */}
        <div
          className={`absolute right-0 top-full z-40 overflow-hidden bg-dark-secondary transition-all duration-300 ease-in-out ${
            isOpen ? "border-gray-500 w-[220px] md:border-s" : "w-0"
          } lg:hidden`}
        >
          <Nav
            className="flex flex-col p-6 gap-4"
            menu={menuItems}
            closeMenu={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
