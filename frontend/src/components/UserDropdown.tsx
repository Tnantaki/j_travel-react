import { useState } from "react";
import { Link } from "react-router";
import UserService from "../services/user";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { label: "Profile", to: "/account/profile" },
    { label: "Signout", to: "/login", logout: () => UserService.logout() },
  ];

  return (
    <div className="flex justify-center items-center p-8">
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="inline-flex size-12 bg-gray-600 rounded-full focus:outline-none">
          {/* <img src="" alt="" /> */}
        </button>

        {/* Dropdown menu */}
        <div
          className={`absolute overflow-hidden right-0 w-56 rounded-md shadow-lg bg-linear-light-modal transition-all duration-200 ease-in-out transform origin-top-right z-10
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
        >
          <div>
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="block p-3 text-sm text-char-pri hover:bg-frame-sec-shade"
                onClick={() => {
                  if (item.logout) {
                    item.logout();
                  }
                  setIsOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
