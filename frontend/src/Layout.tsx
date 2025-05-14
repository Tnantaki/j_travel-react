import { Outlet, useOutletContext } from "react-router";
import Navbar from "./components/Navbar";
import { Dispatch, SetStateAction, useState } from "react";
import { TourType } from "./routes/data/tours";

export type PlanContextType = {
  plan: TourType | null;
  setPlan: Dispatch<SetStateAction<TourType>>;
};

const Layout = () => {
  const [plan, setPlan] = useState<TourType | null>(null);

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
