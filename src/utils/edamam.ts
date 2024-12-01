// src/utils/edamam.ts

import {
  IngredientSuggestion,
  RecipeData,
  NutritionData,
} from "../types/Types";

// Credentials for different APIs
const EDAMAM_FOOD_APP_ID = import.meta.env.VITE_EDAMAM_FOOD_APP_ID;
const EDAMAM_FOOD_APP_KEY = import.meta.env.VITE_EDAMAM_FOOD_APP_KEY;

const EDAMAM_NUTRITION_APP_ID = import.meta.env.VITE_EDAMAM_NUTRITION_APP_ID;
const EDAMAM_NUTRITION_APP_KEY = import.meta.env.VITE_EDAMAM_NUTRITION_APP_KEY;

// Endpoint URLs
const EDAMAM_AUTO_COMPLETE_URL = "https://api.edamam.com/auto-complete";
const EDAMAM_NUTRITION_ANALYSIS_URL =
  "https://api.edamam.com/api/nutrition-details";

// Function to fetch ingredient suggestions using Food Database API's /auto-complete endpoint
export const fetchIngredientSuggestions = async (
  query: string
): Promise<IngredientSuggestion[]> => {
  if (!query) return [];

  const url = `${EDAMAM_AUTO_COMPLETE_URL}?q=${encodeURIComponent(
    query
  )}&app_id=${EDAMAM_FOOD_APP_ID}&app_key=${EDAMAM_FOOD_APP_KEY}&limit=10`;

  console.log("Fetching ingredient suggestions with URL:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Response not OK:",
        response.status,
        response.statusText,
        errorText
      );
      throw new Error("Failed to fetch ingredient suggestions");
    }
    const data: string[] = await response.json();
    console.log("Received data:", data);

    // Map the array of strings to IngredientSuggestion objects
    const suggestions: IngredientSuggestion[] = data.map((item) => ({
      value: item,
      label: item,
    }));

    return suggestions;
  } catch (error) {
    console.error("Error fetching ingredient suggestions:", error);
    return [];
  }
};

// Function to analyze the recipe using the Nutrition Analysis API
export const analyzeRecipe = async (
  recipeData: RecipeData
): Promise<NutritionData> => {
  const url = `${EDAMAM_NUTRITION_ANALYSIS_URL}?app_id=${EDAMAM_NUTRITION_APP_ID}&app_key=${EDAMAM_NUTRITION_APP_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to analyze recipe");
  }

  return response.json();
};
