import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

const ProtectRoute = () => {
  const user = useAuth();

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectRoute;
