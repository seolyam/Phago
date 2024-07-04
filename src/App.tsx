import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MealList from "./components/MealList";
import MealDetails from "./components/MealDetails";
import About from "./components/About";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <Router>
      <div className="font-sans">
        <NavBar handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/meals" element={<MealList search={search} />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
