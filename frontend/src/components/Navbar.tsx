import { NavLink } from "react-router";
import { useState } from "react";
import Nav from "./Nav";
import logo from "@img/logo.svg";
import { PiListBold } from "react-icons/pi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Packages", to: "/packages" },
    { label: "Booking", to: "/booking" },
    { label: "About", to: "/about" },
  ];

  return (
    <div className="bg-frame-red h-10 sm:h-16 flex w-full sec-padding z-50 shadow-lg fixed">
      <div className="flex justify-between items-center page-container">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} className="h-7 sm:h-10" />
        </NavLink>
        {/* Desktop Menu */}
        <Nav
          className="hidden md:flex gap-4 justify-between items-center grow md:ms-10 lg:ms-30"
          menu={menuItems}
        />
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-char-sec hover:text-primary hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <PiListBold className="size-6 sm:size-8" />
        </button>

        {/* Mobile Menu Dropdown Container */}
        <div
          className={`absolute right-0 top-full z-40 overflow-hidden bg-frame-sec transition-all duration-300 ease-in-out ${
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
