// src/components/EdamamRecipeSearch.tsx

import React, { useState } from "react";
import { searchRecipes } from "../utils/edamam";
import { RecipeSearchResult, Recipe } from "../types/Types";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EdamamRecipeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle recipe search
  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data: RecipeSearchResult = await searchRecipes(query);
      const recipes = data.hits.map((hit) => hit.recipe);
      setRecipes(recipes);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <div className="mb-4">
        <label className="block font-bold mb-2">Search for Recipes:</label>
        <input
          type="text"
          placeholder="Enter a keyword (e.g., chicken, pasta)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Search Button */}
      <Button onClick={handleSearch} disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Search"
        )}
      </Button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Recipes List */}
      {recipes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Recipes:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index} className="mb-8">
                <Link to={`/edamam-recipe/${encodeURIComponent(recipe.uri)}`}>
                  <div className="flex items-center">
                    <img
                      src={recipe.image}
                      alt={recipe.label}
                      className="w-32 h-32 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{recipe.label}</h3>
                      <p>
                        <strong>Source:</strong> {recipe.source}
                      </p>
                      <p>
                        <strong>Calories:</strong> {recipe.calories.toFixed(2)}
                      </p>
                      <p>
                        <strong>Health Labels:</strong>{" "}
                        {recipe.healthLabels.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EdamamRecipeSearch;
