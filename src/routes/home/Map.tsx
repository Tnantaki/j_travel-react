import { NavLink } from "react-router";
import Button from "../../components/Button";

const Map = () => {
  const exps = [
    {
      title: "Cultural Immersion",
      descition:
        "Engage with local traditions and savor authentic Japanese cuisine on our guided tours.",
    },
    {
      title: "Adventure Awaits",
      descition:
        "Explore iconic landmarks and hidden gems with our expert guides leading the way.",
    },
  ];

  return (
    <section className="flex bg-dark-primary">
      <div className="wrapper grid grid-cols-2 font-inter text-white gap-20 items-center my-40 mx-20">
        <div>
          <img
            className="size-[600px] border-1 border-[#888888] rounded-xl"
            src={"./Jpan_map.png"}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-[2.5rem]">
            Discover Japan's Most Enchanting Tour Packages
          </h1>
          <p className="text-lg">
            Experience the beauty and culture of Japan with our top-rated tour
            packages. From breathtaking landscapes to vibrant cities, we have
            something for every traveler.
          </p>
          <div className="grid grid-cols-2 gap-12">
            {exps.map((exp, i) => (
              <div key={i} className="grid gap-4">
                <img className="size-12" src="./icons/box.svg" alt="box" />
                <p className="text-xl font-bold">{exp.title}</p>
                <p className="text-lg">{exp.descition}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <NavLink to="/learnmore">
              <Button size="md" primary={true}>
                Learn More
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button size="md" primary={false}>
                Sign Up <img src="./icons/right-arrow.svg" alt="icon" /> 
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
