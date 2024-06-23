import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [search, setSearch] = useState("");

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
          <Link to="/Recipes" className="text-gray-600 hover:text-gray-800">
            Recipes
          </Link>
          <Link to="/Contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
    </nav>
  );
}
