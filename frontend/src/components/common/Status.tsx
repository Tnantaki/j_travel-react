import type { Status } from "../../services/booking-service";

interface Props {
  status: Status;
}

const Status = ({ status }: Props) => {
  let style;

  if (status === 'pending') {
    style = 'bg-amber-300'
  }
  return <p className={`body2 text-char-pri px-2 rounded-md shadow-md ${style}`}>{status}</p>;
};

export default Status;
