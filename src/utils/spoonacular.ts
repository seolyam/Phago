// src/utils/spoonacular.ts

import { Recipe, RecipeDetail } from "../types/Types";

export const fetchSpoonacularData = async (
  endpoint: string,
  params: Record<string, string> = {}
): Promise<{ results: Recipe[] }> => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error("Spoonacular API key is missing.");
  }
  const baseUrl = `https://api.spoonacular.com/${endpoint}`;
  const query = new URLSearchParams({ ...params, apiKey }).toString();

  const response = await fetch(`${baseUrl}?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
};

export const fetchRecipeDetail = async (id: string): Promise<RecipeDetail> => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error("Spoonacular API key is missing.");
  }
  const baseUrl = `https://api.spoonacular.com/recipes/${id}/information`;
  const query = new URLSearchParams({ apiKey }).toString();

  const response = await fetch(`${baseUrl}?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe details: ${response.statusText}`);
  }
  return response.json();
};
