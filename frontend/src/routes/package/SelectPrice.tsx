import Select from "../../components/common/Select";

interface Props {
  selectPrice: (price: number) => void;
}

const SelectPrice = ({ selectPrice }: Props) => {
  const priceRange = [
    { label: "All", value: -1 },
    { label: "0 - 10,000", value: 0 },
    { label: "10,000 - 20,000", value: 10_000 },
    { label: "20,000 - 30,000", value: 20_000 },
    { label: "30,000 - 40,000", value: 30_000 },
    { label: "40,000 - 50,000", value: 40_000 },
    { label: "50,000 up", value: 50_000 },
  ];

  return (
    <Select label="Price :" options={priceRange} handleSelect={selectPrice} />
  );
};

export default SelectPrice;
