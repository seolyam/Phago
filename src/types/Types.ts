export interface RecipeData {
  title: string;
  ingr: string[];
  url?: string;
  summary?: string;
  yield?: string;
  time?: string;
  img?: string;
  prep?: string[];
}

export interface NutritionData {
  uri: string;
  url: string;
  yield: number;
  calories: number;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalNutrients: {
    [key: string]: NutrientInfo;
  };
  totalDaily: {
    [key: string]: NutrientInfo;
  };
  ingredientLines: string[];
  ingredients: Ingredient[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
}

export interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

export interface Ingredient {
  text: string;
  parsed?: ParsedIngredient;
}

export interface ParsedIngredient {
  quantity: number;
  measure: string;
  measureURI?: string;
  foodMatch: string;
  food: string;
  foodId: string;
  weight: number;
  nutrients: {
    [key: string]: NutrientInfo;
  };
  status: string;
}

// Add this missing type
export interface IngredientSuggestion {
  value: string; // The value to be used in forms or data submission
  label: string; // The user-friendly label for display
}

// src/types/Types.ts

export interface RecipeSearchResult {
  from: number;
  to: number;
  count: number;
  _links: {
    next?: {
      href: string;
      title: string;
    };
  };
  hits: {
    recipe: Recipe;
    _links: {
      self: {
        href: string;
        title: string;
      };
    };
  }[];
}

export interface Recipe {
  id: number;
  title: string | undefined;
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: RecipeIngredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
}

export interface RecipeIngredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
}
export interface Recipe {
  label: string;
  image: string;
  url: string;
  source: string;
  calories: number;
  healthLabels: string[];
  ingredientLines: string[];
}

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: {
    name: string;
    original: string;
  }[];
}
