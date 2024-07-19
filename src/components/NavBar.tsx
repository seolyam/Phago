import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
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
      ? "text-gray-950"
      : "text-gray-600 hover:text-gray-800";
  };

  return (
    <nav className={`bg-white shadow-md mb-8 font-sans ${className}`}>
      <div className="container p-4 flex items-center">
        <div className="text-2xl font-thin text-gray-600">
          <Link to="/">phago.</Link>
        </div>
        <div className="justify-end flex space-x-6 gap-10 grow">
          {/* Links for Desktop */}
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

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" onClick={toggleSheet}>
                <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              {/* Links inside Sheet */}
              <div className="flex flex-col gap-10 py-4">
                <Link
                  to="/meals"
                  className={getLinkClass("/meals")}
                  onClick={closeSheet}
                >
                  Meals
                </Link>
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
              </div>
              <SheetClose asChild></SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
