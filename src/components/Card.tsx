interface Props {
  imgPath: string;
  title: string;
  description: string;
}

const Card = ({ imgPath, title, description }: Props) => {
  return (
    <div className="flex flex-col w-[400px] rounded-xl font-inter text-white overflow-hidden gap-4 items-center bg-dark-secondary">
      <div className="h-[300px] w-full overflow-hidden">
        <img src={imgPath} alt="location image" className="object-center" />
      </div>
      <h3 className="font-semibold text-3xl px-8">{title}</h3>
      <p className="px-8 pb-8">{description}</p>
    </div>
  );
};

export default Card;
