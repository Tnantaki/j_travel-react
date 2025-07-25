import Card from "../../components/Card";
import FadeInSection from "../../components/common/FadeInSection";
import SearchPlan from "./SearchPlan";
import SelectPrice from "./SelectPrice";
import SelectDuration from "./SelectDuration";
import { useEffect, useState } from "react";
import planService, { PlanType } from "../../services/plan-service";
import { AxiosError, isAxiosError } from "axios";

const Packages = () => {
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState(-1);
  const [filterDay, setFilterDay] = useState(0);

  const filterPlans = plans.filter((plan) => {
    const nameMatch = plan.title
      .toLowerCase()
      .includes(titleSearch.toLowerCase());
    let priceMatch;

    if (filterPrice === -1) {
      priceMatch = true;
    } else {
      const max = filterPrice + 10000;
      priceMatch = plan.price >= filterPrice && plan.price <= max;
    }
    let dayMatch;

    if (filterDay === 0) {
      dayMatch = true;
    } else if (filterDay === 7) {
      dayMatch = plan.duration >= filterDay;
    } else {
      dayMatch = plan.duration === filterDay;
    }
    return nameMatch && priceMatch && dayMatch;
  });

  useEffect(() => {
    const { request, cancel } = planService.getAll();

    const reqPlans = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          return console.log(res);
        }
        setPlans(data);
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
          }
        } else {
          console.log(error.response.data);
        }
      }
    };
    reqPlans();
    return () => {
      cancel(); // cancel request in case user navigate away before get response
    };
  }, []);
  return (
    <section className="bg-blue-100 justify-center hero sec-padding py-20">
      <FadeInSection className="page-container mt-3 flex flex-col items-center gap-12 sm:mt-5">
        <div className="flex flex-col items-center gap-2 lg:gap-4 text-center">
          <h3>Discover Our Top Japan Tour Packages</h3>
          <p className="text-base lg:text-xl">
            Experience the beauty and culture of Japan with our curated tour
            packages. Each journey is designed to immerse you in the unique
            landscapes and traditions of this incredible country.
          </p>
          <div className="lg:w-[800px]">
            <SearchPlan onSearch={setTitleSearch} />
            <div className="flex gap-4 self-start mt-2 ">
              <SelectPrice selectPrice={setFilterPrice} />
              <SelectDuration selectDay={setFilterDay} />
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {filterPlans.map((plan, i) => (
            <Card key={i} plan={plan} />
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

export default Packages;
