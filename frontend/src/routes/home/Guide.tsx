import Carousel from "../../components/Carousel";
import ListItem from "../../components/ListItem";
import osaka from "@img/location/Osaka-Castle-osaka.png";
import senso from "@img/location/senso-ji-temple-tokyo.png";
import kinkakuji from "@img/location/kinkakuji-temple-kyoto.png";

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

  const images = [osaka, senso, kinkakuji];

  return (
    <section className="flex bg-dark-secondary sec-padding">
      <div className="grid place-items-center gap-8 lg:grid-cols-2 lg:gap-18 items-center page-container sec-margin">
        <div className="sm:size-[400px] lg:size-[520px] border-1 border-[#888888] rounded-xl overflow-hidden lg:order-last">
          <Carousel images={images} />
        </div>
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
      </div>
    </section>
  );
};

export default Guide;
