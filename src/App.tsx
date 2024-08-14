import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import RandomMeal from "./components/HeroSection";
import MealList from "./components/MealList";
import MealDetails from "./components/MealDetails";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PopularMealsSection from "./components/PopularMealsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import MealOfTheDay from "./components/MealOfTheDay";
import Favorite from "./components/Favorite";
import Recent from "./components/Recent";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <Router>
      <div className="font-sans min-h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MealOfTheDay />
                <RandomMeal />
                <FeaturesSection />
                <PopularMealsSection />
                <TestimonialsSection />
                <Recent />
                <Footer />
              </>
            }
          />
          <Route
            path="/meals"
            element={<MealList search={search} handleSearch={handleSearch} />}
          />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/favorite"
            element={<Favorite search={search} handleSearch={handleSearch} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
