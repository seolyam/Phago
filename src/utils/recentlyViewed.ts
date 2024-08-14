import { Meal } from "../types/Meal";

export function addMealToRecentlyViewed(meal: Meal) {
  const recentlyViewed = JSON.parse(
    localStorage.getItem("recentlyViewedMeals") || "[]"
  );

  const updatedList = recentlyViewed.filter(
    (viewedMeal: Meal) => viewedMeal.idMeal !== meal.idMeal
  );

  updatedList.unshift(meal);

  const finalList = updatedList.slice(0, 10);

  localStorage.setItem("recentlyViewedMeals", JSON.stringify(finalList));
}
