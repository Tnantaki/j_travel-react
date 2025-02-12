interface Props {
  imgPath: string;
  title: string;
  description: string;
}

const Card = ({ imgPath, title, description }: Props) => {
  return (
    <div className="flex flex-col w-[400px] rounded-xl overflow-hidden items-center bg-dark-secondary">
      <div className="h-[300px] w-full overflow-hidden">
        <img src={imgPath} alt="location image" className="object-center" />
      </div>
      <div className="p-6 grid gap-4">
        <h4 className="text-center">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
