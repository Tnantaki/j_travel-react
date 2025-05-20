import { IoIosSearch } from "react-icons/io";

const SearchPlan = () => {
  return (
    <div className="flex rounded-full text-char-sec items-center body1 overflow-hidden">
      <div className="flex w-full bg-frame-ter items-center focus-within:inset-ring-1 ring-pri-shade rounded-s-full">
        <IoIosSearch className="px-3 w-15 size-12" />
        <input
          type="text"
          placeholder="Search Package..."
          className="py-2 w-full focus:border-0 focus:outline-0"
        />
      </div>
      <button className="p-2 px-4 bg-slate-500 hover:bg-slate-600 hover:cursor-pointer">
        Search
      </button>
    </div>
  );
};

export default SearchPlan;
