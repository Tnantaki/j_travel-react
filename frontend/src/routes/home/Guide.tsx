import Carousel from "../../components/Carousel";
import ListItem from "../../components/ListItem";
import fujiyoshida from "@img/tours/classic/Fujiyoshida-Yamanashi.jpg";
import hakone from "@img/tours/adventure/Hakone.jpg";
import osakaCastle from "@img/tours/cultural/OsakaCastle.jpg";
import { motion } from "motion/react";
import FadeInSection from "../../components/common/FadeInSection";

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

  const images = [fujiyoshida, hakone, osakaCastle];

  return (
    <div className="flex bg-frame-ter sec-padding text-char-sec">
      <FadeInSection className="grid place-items-center gap-8 lg:grid-cols-2 lg:gap-18 items-center page-container sec-margin">
        <div className="xs:max-w-[350px] sm:max-w-[400px] lg:max-w-[520px] aspect-square border-1 border-slate-400 rounded-xl overflow-hidden lg:order-last">
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
            <div className="grid sm:grid-cols-2 gap-12">
              {guides.map((g, i) => (
                <ListItem key={i} {...g} />
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Guide;
