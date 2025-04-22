import Select from "../../components/common/Select";

const SelectPrice = () => {
  const priceRange = [
    { label: "All", value: 0 },
    { label: "10,000 - 20,000", value: 10_000 },
    { label: "20,000 - 30,000", value: 20_000 },
    { label: "30,000 - 40,000", value: 30_000 },
    { label: "40,000 - 50,000", value: 40_000 },
    { label: "50,000 up", value: 50_000 },
  ];

  return <Select label="Price :" options={priceRange} />;
};

export default SelectPrice;
