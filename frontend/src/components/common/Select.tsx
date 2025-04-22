import { SelectHTMLAttributes } from "react";

interface Options {
  label: string;
  value: string | number;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Options[];
  label?: string;
}

const Select = ({ options, label }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className=" body2 text-char-sec flex flex-col items-start">
      {label && (
        <label htmlFor="priceRange" className="text-char-pri font-medium">
          {label}
        </label>
      )}
      <select
        className="p-1 bg-slate-500 rounded-sm focus:outline-char-pri focus:outline-2"
        name="priceRange"
        id="priceRange"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value}
            className="bg-slate-600 focus-within:outline-red-600 in-focus:outline-amber-300 focus:outline-teal-400"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
