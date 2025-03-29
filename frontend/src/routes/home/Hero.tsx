import LinkButton from "../../components/LinkButton";

const Hero = () => {
  return (
    <div className="bg-[url('/src/assets/img/background/fuji.png')] bg-cover bg-center relative">
      <div className="absolute bg-linear-to-r from-black/30 to-black/0 w-full h-full"></div>
      <section className="hero sec-padding ">
        <div className="grid lg:grid-cols-2 items-center page-container text-char-sec">
          <div className="flex flex-col mb-20">
            <h1 className="font-langar text-[5rem] sm:text-[7rem] md:text-[9.375rem] style-langar drop-shadow-[0_3px_3px_rgb(0,0,0,1)]">
              <span className="text-primary text-[7rem] sm:text-[9rem] md:text-[11.25rem]">
                J
              </span>
              ·Travel
            </h1>
            <p className="text-xl mb-8 drop-shadow-[0_3px_3px_rgb(0,0,0,1)]">
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
    </div>
  );
};

export default Hero;
