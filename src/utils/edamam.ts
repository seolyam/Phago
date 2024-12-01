// src/utils/edamam.ts

import {
  IngredientSuggestion,
  RecipeData,
  NutritionData,
  RecipeSearchResult,
  Recipe,
} from "../types/Types";

// Credentials for different APIs
const EDAMAM_FOOD_APP_ID = import.meta.env.VITE_EDAMAM_FOOD_APP_ID;
const EDAMAM_FOOD_APP_KEY = import.meta.env.VITE_EDAMAM_FOOD_APP_KEY;

const EDAMAM_NUTRITION_APP_ID = import.meta.env.VITE_EDAMAM_NUTRITION_APP_ID;
const EDAMAM_NUTRITION_APP_KEY = import.meta.env.VITE_EDAMAM_NUTRITION_APP_KEY;

const EDAMAM_RECIPE_APP_ID = import.meta.env.VITE_EDAMAM_RECIPE_APP_ID;
const EDAMAM_RECIPE_APP_KEY = import.meta.env.VITE_EDAMAM_RECIPE_APP_KEY;

// Endpoint URLs
const RECIPE_SEARCH_BASE_URL = "https://api.edamam.com/api/recipes/v2";
const EDAMAM_AUTO_COMPLETE_URL = "https://api.edamam.com/auto-complete";
const EDAMAM_NUTRITION_ANALYSIS_URL =
  "https://api.edamam.com/api/nutrition-details";

const EDAMAM_ACCOUNT_USER = "seolyam";
// Function to search recipes using the Recipe Search API
export const searchRecipes = async (
  query: string
): Promise<RecipeSearchResult> => {
  if (!query) {
    throw new Error("Query is required for searching recipes.");
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
    query
  )}&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Edamam-Account-User": EDAMAM_ACCOUNT_USER,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to search recipes");
    }
    const data: RecipeSearchResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

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
export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const url = `${RECIPE_SEARCH_BASE_URL}/${id}?type=public&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch recipe details");
    }

    const data = await response.json();
    return data.recipe; // Access recipe property directly
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw error;
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
