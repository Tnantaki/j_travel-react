import { useRef } from "react";
import { IoIosSearch } from "react-icons/io";

interface Props {
  onSearch: (title: string) => void;
}

const SearchPlan = ({ onSearch }: Props) => {
  const textRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex rounded-full text-char-sec items-center body1 overflow-hidden">
      <div className="flex w-full bg-frame-ter items-center focus-within:inset-ring-2 inset-ring-slate-700 rounded-s-full">
        <IoIosSearch className="px-3 w-15 size-12" />
        <input
          type="text"
          placeholder="Search Package..."
          className="py-2 w-full focus:border-0 focus:outline-0"
          ref={textRef}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>
      <button
        className="p-2 px-4 bg-slate-500 hover:bg-slate-600 hover:cursor-pointer"
        onClick={() => {
          if (textRef.current) {
            onSearch(textRef.current.value);
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchPlan;
