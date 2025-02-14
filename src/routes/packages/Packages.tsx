import Card from "../../components/Card";

const Packages = () => {
  const packages = [
    {
      imgPath: "./location/Osaka-Castle-osaka.png",
      title: "Osaka Castle, Osaka",
      description:
        "a symbol of Japan’s feudal past and a must-visit historical site. Originally built in the late 16th century by Toyotomi Hideyoshi.",
    },
    {
      imgPath: "./location/kinkakuji-temple-kyoto.png",
      title: "Kinkaku-ji Temple (Golden Pavilion), Kyoto",
      description:
        "one of Kyoto’s most iconic landmarks. This Zen Buddhist temple is covered in gold leaf, reflecting beautifully in the surrounding Kyoko-chi (Mirror Pond).",
    },
    {
      imgPath: "./location/senso-ji-temple-tokyo.png",
      title: "Senso-ji Temple, Tokyo",
      description:
        "Tokyo’s oldest and most famous Buddhist temple, located in the Asakusa district. The temple is dedicated to Kannon, the Goddess of Mercy.",
    },
  ];

  return (
    <section className="bg-dark-primary justify-center hero sec-padding">
      <div className="page-container mt-5 flex flex-col items-center gap-12 sm:mt-10">
        <div className="flex flex-col items-center gap-2 lg:gap-10 text-center">
          <h2>Discover Our Top Japan Tour Packages</h2>
          <p className="text-base lg:text-xl">
            Experience the beauty and culture of Japan with our curated tour
            packages. Each journey is designed to immerse you in the unique
            landscapes and traditions of this incredible country.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
          {packages.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
