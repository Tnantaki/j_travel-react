import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

const ProtectRoute = () => {
  const { user } = useAuth();
  console.log(user)

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectRoute;
