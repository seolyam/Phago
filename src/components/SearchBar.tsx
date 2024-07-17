import React, { useRef } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  handleSearch: (query: string) => void;
  search: string;
}

const SearchBar = ({ handleSearch, search }: SearchBarProps) => {
  const debouncedSearch = useRef(
    debounce((query: string) => handleSearch(query), 500)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    handleSearch("");
  };

  return (
    <div className="text-center mb-4">
      <div className="relative w-full max-w-xs mx-auto">
        <input
          type="text"
          placeholder="Search for a meal"
          defaultValue={search}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-xl w-full"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
