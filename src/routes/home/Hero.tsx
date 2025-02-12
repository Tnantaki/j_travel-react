import { NavLink } from "react-router";
import Button from "../../components/Button";

const Hero = () => {
  return (
    <section className="hero">
      <div className="grid grid-cols-2 wrapper items-center">
        <div className="flex flex-col">
          <h1 className="font-langar text-[9.375rem] style-langar">
            <span className="text-primary text-[11.25rem]">J</span>·Travel
          </h1>
          <p className="text-xl mb-8 drop-shadow-sm">
            Discover breathtaking landscapes, rich culture, and unforgettable
            experiences tailored just for you. Let J-Travel guide you on your
            journey through Japan's hidden gems and iconic destinations.
          </p>
          <NavLink to="/booking">
            <Button size="md" primary={true}>
              Booking
            </Button>
          </NavLink>
        </div>
      </div>
      <img
        className="absolute top-0 h-[120vh] object-cover -z-30"
        src="./background/fuji.png"
      />
    </section>
  );
};

export default Hero;
