import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import profileService from "../services/profile-service";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const items = [
    { label: "Profile", to: "/account/profile" },
    { label: "Signout", to: "/login", logout: true },
  ];

  useEffect(() => {
    const { request, cancel } = profileService.getProfile();

    const reqProfile = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          return;
        }

        setProfileImage(data.profileImage);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    reqProfile();
    return () => {
      cancel(); // cancel request in case user navigate away before get response
    };
  });

  return (
    <div className="flex justify-center items-center p-8">
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="inline-flex size-12 bg-gray-600 rounded-full focus:outline-none overflow-hidden">
          {profileImage && (
            <img
              src={profileImage}
              alt="profile image"
              className="object-center object-cover w-full h-full"
            />
          )}
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
                    logout();
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
