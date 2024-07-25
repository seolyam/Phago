import { Meal } from "./types/Meal";

const MEAL_KEY = "mealOfTheDay";
const TIMESTAMP_KEY = "mealOfTheDayTimestamp";

export const getStoredMeal = () => {
  const meal = localStorage.getItem(MEAL_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  return meal && timestamp
    ? { meal: JSON.parse(meal), timestamp: Number(timestamp) }
    : null;
};

export const storeMeal = (meal: Meal) => {
  localStorage.setItem(MEAL_KEY, JSON.stringify(meal));
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
};

export const isMealExpired = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  return diff > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
};
