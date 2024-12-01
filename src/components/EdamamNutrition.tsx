// src/components/EdamamNutrition.tsx

import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { fetchIngredientSuggestions, analyzeRecipe } from "../utils/edamam";
import {
  RecipeData,
  IngredientSuggestion,
  NutritionData,
} from "../types/Types";

const EdamamNutrition: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load ingredient options dynamically
  const loadIngredientOptions = async (
    inputValue: string
  ): Promise<IngredientSuggestion[]> => {
    try {
      return await fetchIngredientSuggestions(inputValue);
    } catch (error) {
      console.error("Error fetching ingredient suggestions:", error);
      return [];
    }
  };

  // Handle ingredient selection
  const handleIngredientSelect = (
    selectedOption: IngredientSuggestion | null
  ) => {
    if (selectedOption) {
      // Prompt for quantity
      const quantity = prompt(
        `Enter quantity for "${selectedOption.label}":`,
        "1 unit"
      );
      if (quantity) {
        const ingredientLine = `${quantity} ${selectedOption.label}`;
        setIngredients([...ingredients, ingredientLine]);
      }
    }
  };

  // Remove ingredient from list
  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((ingr) => ingr !== ingredient));
  };

  // Handle recipe analysis
  const handleAnalyze = async () => {
    if (ingredients.length === 0) {
      alert("Please provide at least one valid ingredient.");
      return;
    }

    const newRecipeData: RecipeData = {
      ingr: ingredients,
      title: "",
    };

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeRecipe(newRecipeData);
      setNutritionData(data);
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
      {/* Ingredients Autocomplete */}
      <div className="mb-4">
        <label className="block font-bold mb-2">Ingredients:</label>
        <AsyncSelect
          cacheOptions
          loadOptions={loadIngredientOptions}
          placeholder="Search and select ingredients"
          onChange={handleIngredientSelect}
          isClearable
          className="mb-4"
        />
        {/* Selected Ingredients */}
        <div>
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded m-1"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-2 text-red-500 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="px-4 py-2 bg-green-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze Recipe"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Nutrition Data */}
      {nutritionData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Nutrition Facts</h2>
          <p>Calories: {nutritionData.calories.toFixed(2)}</p>
          <h3 className="text-lg font-bold mt-2">Nutrients:</h3>
          <ul>
            {Object.entries(nutritionData.totalNutrients).map(
              ([key, nutrient]) => (
                <li key={key}>
                  {nutrient.label}: {nutrient.quantity.toFixed(2)}{" "}
                  {nutrient.unit}
                </li>
              )
            )}
          </ul>
          <h3 className="text-lg font-bold mt-2">Health Labels:</h3>
          <ul>
            {nutritionData.healthLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EdamamNutrition;
