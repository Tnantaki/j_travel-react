interface Props {
  imgPath: string;
  title: string;
  description: string;
}

const Card = ({ imgPath, title, description }: Props) => {
  return (
    <div className="flex flex-col max-w-[400px] rounded-xl overflow-hidden items-center bg-dark-secondary">
      <div className="aspect-4/3 w-full overflow-hidden">
        <img src={imgPath} alt="location image" className="object-center" />
      </div>
      <div className="p-3 grid gap-2 sm:p-6 sm:gap-4">
        <h4 className="text-center">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
