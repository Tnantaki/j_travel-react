import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ProfileLayout = () => {
  const profileMenu = [
    { label: "Profile", to: "/account/profile" },
    { label: "My Booking", to: "/account/book" },
    { label: "Booking History", to: "/account/history" },
  ];

  return (
    <section className="bg-linear-light justify-center hero sec-padding">
      <Topbar menu={profileMenu} />
      <div className="page-container flex flex-col items-center my-15 lg:my-5 min-h-full">
        {/* <h3 className="hidden lg:block text-char-pri self-start mb-4">My Profile</h3> */}
        <div className="flex flex-row bg-frame-qua border-slate-400 border-1 shadow-lg w-full p-2 gap-2 xl:p-8 rounded-2xl xl:gap-6 h-full">
          <Sidebar menu={profileMenu} />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
