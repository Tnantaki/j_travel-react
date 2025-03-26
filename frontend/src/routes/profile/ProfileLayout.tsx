import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const ProfileLayout = () => {
  const profileMenu = [
    { label: "Profile", to: "/account/profile" },
    { label: "My Booking", to: "/account/book" },
    { label: "Travel History", to: "/account/history" },
  ];

  return (
    <section className="bg-linear-light justify-center hero sec-padding">
      <div className="page-container flex flex-col items-center my-5 min-h-full">
        <h3 className="text-char-pri self-start mb-4">My Account</h3>
        <div className="flex flex-row bg-frame-qua border-slate-400 border-1 shadow-lg w-full p-8 rounded-2xl gap-6 h-full">
          <Sidebar menu={profileMenu} />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
