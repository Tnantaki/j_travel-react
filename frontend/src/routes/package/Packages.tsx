import Card from "../../components/Card";
import FadeInSection from "../../components/common/FadeInSection";
import SearchPlan from "./SearchPlan";
import tours from "../data/tours";
import SelectPrice from "./SelectPrice";
import SelectDuration from "./SelectDuration";

const Packages = () => {
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
            <SearchPlan />
            <div className="flex gap-4 self-start mt-2 ">
              <SelectPrice />
              <SelectDuration />
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {tours.map((tour, i) => (
            <Card key={i} tour={tour} />
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

export default Packages;
