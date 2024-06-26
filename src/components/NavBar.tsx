import { useState } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  handleSearch: (query: string) => void;
}

export default function NavBar({ handleSearch }: NavBarProps) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    handleSearch(query);
  };

  return (
    <nav className="bg-white shadow-md">
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
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>
    </nav>
  );
}
