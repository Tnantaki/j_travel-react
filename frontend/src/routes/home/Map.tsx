import { NavLink } from "react-router";
import Button from "../../components/common/Button";
import ListItem from "../../components/ListItem";
import LinkButton from "../../components/LinkButton";
import jpanMapUrl from "@img/Jpan_map.png";

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
    <section className="flex bg-dark-primary sec-padding">
      <div className="page-container grid place-items-center gap-8 lg:grid-cols-2 lg:gap-18 items-center sec-margin">
        <img
          className="sm:size-[400px] lg:size-[520px] border-1 border-[#888888] rounded-xl"
          src={jpanMapUrl}
        />
        <div className="flex flex-col gap-10">
          <h2>Discover Japan's Most Enchanting Tour Packages</h2>
          <p className="text-lg">
            Experience the beauty and culture of Japan with our top-rated tour
            packages. From breathtaking landscapes to vibrant cities, we have
            something for every traveler.
          </p>
          <div className="grid grid-cols-2 gap-12">
            {exps.map((exp, i) => (
              <ListItem key={i} {...exp} />
            ))}
          </div>
          <div className="flex gap-6">
            <NavLink to="/learnmore">
              <Button>Learn More</Button>
            </NavLink>
            <LinkButton to="/signup" variant="outline">
              Sign Up
              <svg className="size-5 fill-current" viewBox="0 0 10 18">
                <path d="M9.79535 8.53741L1.5065 0.498596C0.987661 -0.00273541 0 0.301065 0 0.961172V17.0388C0 17.6989 0.987661 18.0027 1.5065 17.5014L9.79535 9.46256C9.85981 9.40397 9.91131 9.33255 9.94655 9.25289C9.9818 9.17323 10 9.08709 10 8.99998C10 8.91287 9.9818 8.82673 9.94655 8.74707C9.91131 8.66741 9.85981 8.596 9.79535 8.53741Z" />
              </svg>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
