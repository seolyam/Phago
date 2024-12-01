// src/types/Types.ts

export interface RecipeData {
  title: string;
  ingr: string[];
}

export interface IngredientSuggestion {
  value: string;
  label: string;
}

export interface NutritionData {
  calories: number;
  totalNutrients: {
    [key: string]: {
      label: string;
      quantity: number;
      unit: string;
    };
  };
  healthLabels: string[];
}

export interface RecipeSearchResponse {
  from: number;
  to: number;
  count: number;
  hits: RecipeHit[];
}

export interface RecipeHit {
  recipe: Recipe;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: {
    [key: string]: ImageInfo;
  };
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
}

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
}
