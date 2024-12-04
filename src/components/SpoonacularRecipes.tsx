// src/components/SpoonacularRecipes.tsx

import { useState } from "react";
import { fetchSpoonacularData } from "../utils/spoonacular";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/Types";

const SpoonacularRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchRecipes = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchSpoonacularData("recipes/complexSearch", {
        query,
        number: "10",
      });
      setRecipes(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Search Recipes</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter a recipe name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={searchRecipes}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded p-4 shadow cursor-pointer"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpoonacularRecipes;
