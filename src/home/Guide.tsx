const Guide = () => {
  const guides = [
    {
      title: "Expert Guides",
      descition:
        "Our knowledgeable guides provide insights that enhance your travel experience in Japan.",
    },
    {
      title: "Unique Experiences",
      descition:
        "Enjoy exclusive activities that showcase the beauty and culture of Japan.",
    },
  ];

  return (
    <section className="flex bg-dark-secondary">
      <div className="wrapper grid grid-cols-2 font-inter text-white gap-20 items-center my-40 mx-20">
        <div className="flex flex-col">
          <div className="flex flex-col gap-10">
            <h1 className="font-bold text-[2.5rem]">
              Discover the Unmatched Benefits of Choosing J-Travel for Your
              Japan Adventure
            </h1>
            <p className="text-lg">
              At J-Travel, we connect you with expert guides who bring Japan's
              rich culture to life. Experience unique adventures tailored to
              your interests, ensuring unforgettable memories.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {guides.map((g) => (
                <div className="grid gap-4">
                  <img className="size-12" src="./icons/box.svg" alt="box" />
                  <p className="text-xl font-bold">{g.title}</p>
                  <p className="text-lg">{g.descition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <img
            className="size-[600px] border-1 border-[#888888] rounded-xl"
            src="./location/Osaka-Castle-osaka.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Guide;
