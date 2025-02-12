import { NavLink } from "react-router";
import Button from "../../components/Button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      <div className="flex flex-col text-white mt-40 mx-40">
        <h1 className="font-langar text-[11.25rem] style-langar">
          <span className="text-primary">J</span>·Travel
        </h1>
        <p className="text-xl w-[650px] mb-8">
          Discover breathtaking landscapes, rich culture, and unforgettable
          experiences tailored just for you. Let J-Travel guide you on your
          journey through Japan's hidden gems and iconic destinations.
        </p>
        <NavLink to="/book">
          <Button size="md" primary={true}>
            Booking
          </Button>
        </NavLink>
      </div>
      <img
        className="absolute top-0 w-full object-fill -z-30"
        src="./background/fuji.png"
      />
    </section>
  );
};

export default Hero;
