import { useState } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  handleSearch: (query: string) => void;
}

export default function NavBar({ handleSearch }: NavBarProps) {
  const [search, setSearch] = useState("");

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">MyMealDB</Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/About" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link to="/Contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal"
            value={search}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
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
    </nav>
  );
}
