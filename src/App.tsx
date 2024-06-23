import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MealDetails from "./components/MealDetails";
import MealList from "./components/MealList";
import About from "./components/About";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MealList />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
