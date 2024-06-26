import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MealDetails from "./components/MealDetails";
import MealList from "./components/MealList";
import About from "./components/About";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <Router>
      <NavBar handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<MealList search={search} />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
