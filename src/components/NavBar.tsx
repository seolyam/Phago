// src/components/NavBar.tsx

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";
import HamburgerIcon from "./HamburgerIcon";

interface NavBarProps {
  className?: string;
}

export default function NavBar({ className }: NavBarProps) {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-bold font-semibold"
      : "text-gray hover:underline";
  };

  return (
    <nav className={`bg-gray-800 text-white shadow-md font-sans ${className}`}>
      <div className="container p-4 flex items-center">
        <div className="text-2xl font-thin transition-transform duration-200 ease-in-out transform hover:scale-105">
          <Link to="/">phago.</Link>
        </div>
        <div className="justify-end flex space-x-6 gap-10 grow">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 gap-10 items-center">
            <Link to="/meals" className={getLinkClass("/meals")}>
              TheMealDB
            </Link>
            <Link to="/spoonacular" className={getLinkClass("/spoonacular")}>
              Spoonacular
            </Link>
            <Link
              to="/edamam-search"
              className={getLinkClass("/edamam-search")}
            >
              Edamam Recipe
            </Link>
            <Link to="/edamam" className={getLinkClass("/edamam")}>
              Nutrition Search
            </Link>
            {/* Other Links */}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button onClick={toggleSheet}>
                <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-10 py-4">
                <Link
                  to="/meals"
                  className={getLinkClass("/meals")}
                  onClick={closeSheet}
                >
                  TheMealDB
                </Link>
                <Link
                  to="/spoonacular"
                  className={getLinkClass("/spoonacular")}
                  onClick={closeSheet}
                >
                  Spoonacular
                </Link>
                <Link
                  to="/edamam-search"
                  className={getLinkClass("/edamam-search")}
                  onClick={closeSheet}
                >
                  Edamam Recipe
                </Link>
                <Link
                  to="/edamam"
                  className={getLinkClass("/edamam")}
                  onClick={closeSheet}
                >
                  Nutrition Search
                </Link>
                {/* Other Links */}
                <Link
                  to="/about"
                  className={getLinkClass("/about")}
                  onClick={closeSheet}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={getLinkClass("/contact")}
                  onClick={closeSheet}
                >
                  Contact
                </Link>
                <Link
                  to="/favorite"
                  className={getLinkClass("/favorite")}
                  onClick={closeSheet}
                >
                  Favorites
                </Link>
              </div>
              <SheetClose asChild></SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
