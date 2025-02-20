import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const ProfileLayout = () => {
  const profileMenu = [
    { label: "Profile", to: "/account/profile" },
    { label: "My Booking", to: "/account/book" },
    { label: "Travel History", to: "/account/history" },
  ];

  return (
    <section className="bg-dark-primary justify-center hero sec-padding">
      <div className="page-container flex flex-col items-center mt-5 sm:mt-10 min-h-full mb-10">
        <h3 className="text-white self-start mb-4">My Account</h3>
        <div className="flex flex-row bg-dark-grey w-full p-8 rounded-2xl gap-6 h-full">
          <Sidebar menu={profileMenu}  />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
