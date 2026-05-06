import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for a venue"
        className="w-full rounded-xl border-0 bg-white/80 px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-lg"
      />
      <button className="absolute right-0 top-0 bottom-0 px-4 py-2.5">
        <SearchIcon className="h-5 w-5 text-slate-400" />
      </button>
    </div>
  );
};

export default SearchBar;
