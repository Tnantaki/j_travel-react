import { BsBoxSeam } from "react-icons/bs";


interface Props {
  title: string
  description: string
}

const ListItem = ({title, description}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <BsBoxSeam className='size-8' />
      <p className="text-xl font-bold">{title}</p>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default ListItem;
