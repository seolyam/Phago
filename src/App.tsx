import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MealList from "./components/MealList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MealList />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

function About() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p>This is a simple meal app using the Themealdb API.</p>
    </div>
  );
}

export default App;
