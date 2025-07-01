import FadeInSection from "../components/common/FadeInSection";

const About = () => {
  return (
    <section className="bg-blue-100 justify-center hero sec-padding py-20">
      <FadeInSection className="page-container mt-3 flex flex-col items-center gap-12 sm:mt-5">
        <div className="flex flex-col items-center gap-2 lg:gap-4 text-center">
          <h3>About</h3>
          <p className="text-base lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            dolore eaque neque doloribus consequuntur, nemo sunt perferendis
            inventore ducimus omnis voluptates pariatur assumenda quos nobis,
            cupiditate aperiam facere dignissimos incidunt!
          </p>
        </div>
      </FadeInSection>
    </section>
  );
};

export default About;
