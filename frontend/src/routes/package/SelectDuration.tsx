import Select from "../../components/common/Select";

interface Props {
  selectDay: (days: number) => void
}

const SelectDuration = ({selectDay}: Props) => {
  const durations = [
    { label: "none", value: 0 },
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "4 days", value: 4 },
    { label: "5 days", value: 5 },
    { label: "6 days", value: 6 },
    { label: "more than 7 days", value: 7 },
  ];

  return <Select label="Duration :" options={durations} handleSelect={selectDay} />;
};

export default SelectDuration;
