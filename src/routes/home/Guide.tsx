import Carousel from "../../components/Carousel";
import ListItem from "../../components/ListItem";

const Guide = () => {
  const guides = [
    {
      title: "Expert Guides",
      description:
        "Our knowledgeable guides provide insights that enhance your travel experience in Japan.",
    },
    {
      title: "Unique Experiences",
      description:
        "Enjoy exclusive activities that showcase the beauty and culture of Japan.",
    },
  ];

  const images = [
    "./location/Osaka-Castle-osaka.png",
    "./location/senso-ji-temple-tokyo.png",
    "./location/kinkakuji-temple-kyoto.png",
  ];

  return (
    <section className="flex bg-dark-secondary">
      <div className="wrapper grid grid-cols-2 gap-20 items-center my-40 mx-20">
        <div className="flex flex-col">
          <div className="flex flex-col gap-10">
            <h2>
              Discover the Unmatched Benefits of Choosing J-Travel for Your
              Japan Adventure
            </h2>
            <p className="text-lg">
              At J-Travel, we connect you with expert guides who bring Japan's
              rich culture to life. Experience unique adventures tailored to
              your interests, ensuring unforgettable memories.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {guides.map((g, i) => (
                <ListItem key={i} {...g} />
              ))}
            </div>
          </div>
        </div>
        <div className="size-[560px] border-1 border-[#888888] rounded-xl overflow-hidden">
          <Carousel images={images} />
        </div>
      </div>
    </section>
  );
};

export default Guide;
