import Card from "../components/Card";
import tours from "./data/tours";

const Packages = () => {
  return (
    <section className="bg-linear-light justify-center hero sec-padding py-20">
      <div className="page-container mt-5 flex flex-col items-center gap-12 sm:mt-10">
        <div className="flex flex-col items-center gap-2 lg:gap-10 text-center">
          <h3>Discover Our Top Japan Tour Packages</h3>
          <p className="text-base lg:text-xl">
            Experience the beauty and culture of Japan with our curated tour
            packages. Each journey is designed to immerse you in the unique
            landscapes and traditions of this incredible country.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {tours.map((tour, i) => (
            <Card key={i} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
