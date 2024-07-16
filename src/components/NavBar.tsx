import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

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
      </div>
    </nav>
  );
}
