import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlan } from "../../Layout";

const ProtectRoute = () => {
  const { user } = useAuth();
  const { plan, setPlan } = usePlan();

  if (!user) return <Navigate to="/login" />;
  return <Outlet context={{ plan, setPlan }} />;
};

export default ProtectRoute;
