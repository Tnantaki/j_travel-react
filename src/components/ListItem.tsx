interface Props {
  title: string
  description: string
}

const ListItem = ({title, description}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <img className="size-10" src="./icons/box.svg" alt="box" />
      <p className="text-xl font-bold">{title}</p>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default ListItem;
