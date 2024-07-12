import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MealList from "./components/MealList";
import MealDetails from "./components/MealDetails";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PopularMealsSection from "./components/PopularMealsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <Router>
      <div className="font-sans min-h-screen flex flex-col">
        <NavBar handleSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <PopularMealsSection />
                <TestimonialsSection />
                <Footer />
              </>
            }
          />
          <Route path="/meals" element={<MealList search={search} />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
