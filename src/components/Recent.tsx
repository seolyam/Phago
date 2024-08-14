import { useState, useEffect } from "react";
import { Meal } from "../types/Meal";

export default function Recent() {
  const [recentlyViewedMeals, setRecentlyViewedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const storedMeals = localStorage.getItem("recentlyViewedMeals");
    if (storedMeals) {
      setRecentlyViewedMeals(JSON.parse(storedMeals));
    }
  }, []);

  return (
    <div className="min-h-[40vh] my-6">
      <h1 className="text-center text-2xl mb-4">Recently Viewed Meals</h1>
      <div className="flex justify-center flex-wrap gap-4">
        {recentlyViewedMeals.length === 0 ? (
          <p>No recently viewed meals.</p>
        ) : (
          recentlyViewedMeals.map((meal) => (
            <div key={meal.idMeal} className="w-[150px]">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-auto object-cover rounded-md"
              />
              <p className="text-center mt-2">{meal.strMeal}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
