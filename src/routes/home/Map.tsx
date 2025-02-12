import { NavLink } from "react-router";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";

const Map = () => {
  const exps = [
    {
      title: "Cultural Immersion",
      description:
        "Engage with local traditions and savor authentic Japanese cuisine on our guided tours.",
    },
    {
      title: "Adventure Awaits",
      description:
        "Explore iconic landmarks and hidden gems with our expert guides leading the way.",
    },
  ];

  return (
    <section className="flex bg-dark-primary">
      <div className="wrapper grid grid-cols-2 gap-18 items-center my-40">
        <div>
          <img
            className="size-[600px] border-1 border-[#888888] rounded-xl"
            src={"./Jpan_map.png"}
          />
        </div>
        <div className="flex flex-col gap-10">
          <h2>Discover Japan's Most Enchanting Tour Packages</h2>
          <p className="text-lg">
            Experience the beauty and culture of Japan with our top-rated tour
            packages. From breathtaking landscapes to vibrant cities, we have
            something for every traveler.
          </p>
          <div className="grid grid-cols-2 gap-12">
            {exps.map((exp, i) => <ListItem key={i} {...exp} />)}
          </div>
          <div className="flex gap-6">
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
