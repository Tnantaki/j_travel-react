import { Outlet, useOutletContext } from "react-router";
import Navbar from "./components/Navbar";
import { Dispatch, SetStateAction, useState } from "react";
import { PlanType } from "./services/plan-service";

export type PlanContextType = {
  plan: PlanType | null;
  setPlan: Dispatch<SetStateAction<PlanType | null>>;
};

const Layout = () => {
  const [plan, setPlan] = useState<PlanType | null>(null);

  return (
    <>
      <Navbar />
      <Outlet context={{ plan, setPlan }} />
    </>
  );
};

// export const usePlan = () => useOutletContext<PlanContextType>;
export function usePlan() {
  return useOutletContext<PlanContextType>();
}

export default Layout;
