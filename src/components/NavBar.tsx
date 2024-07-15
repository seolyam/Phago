import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavBarProps {
  handleSearch: (query: string) => void;
}

export default function NavBar({ handleSearch }: NavBarProps) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-gray-950"
      : "text-gray-600 hover:text-gray-800";
  };

  return (
    <nav className="bg-white shadow-md mb-8 font-sans">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-thin text-gray-600">
          <Link to="/">phago. </Link>
        </div>
        <div className="hidden md:flex space-x-6 gap-10">
          <Link to="/meals" className={getLinkClass("/meals")}>
            Meals
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link to="/contact" className={getLinkClass("/contact")}>
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
