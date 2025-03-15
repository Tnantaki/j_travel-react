import LinkButton from "../../components/LinkButton";

const Hero = () => {
  return (
    <section className="hero sec-padding bg-[url('/src/assets/img/background/fuji.png')] bg-cover bg-center">
      <div className="grid lg:grid-cols-2 items-center page-container">
        <div className="flex flex-col mb-20">
          <h1 className="font-langar text-[5rem] sm:text-[7rem] md:text-[9.375rem] style-langar">
            <span className="text-primary text-[7rem] sm:text-[9rem] md:text-[11.25rem]">
              J
            </span>
            ·Travel
          </h1>
          <p className="text-xl mb-8 drop-shadow-sm">
            Discover breathtaking landscapes, rich culture, and unforgettable
            experiences tailored just for you. Let J-Travel guide you on your
            journey through Japan's hidden gems and iconic destinations.
          </p>
          <LinkButton to="/booking" className="self-start">
            Booking
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
