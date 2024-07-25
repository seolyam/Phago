import { useEffect, useState } from "react";
import useSWR from "swr";
import { Meal } from "../types/Meal";
import { getStoredMeal, storeMeal, isMealExpired } from "../utils";
import { Link } from "react-router-dom";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealOfTheDay = () => {
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const storedMealData = getStoredMeal();

    if (storedMealData && !isMealExpired(storedMealData.timestamp)) {
      setMeal(storedMealData.meal);
    }
  }, []);

  const { data, error } = useSWR(
    meal ? null : "https://www.themealdb.com/api/json/v1/1/random.php",
    fetcher
  );

  useEffect(() => {
    if (data && data.meals && data.meals.length > 0) {
      const newMeal = data.meals[0];
      setMeal(newMeal);
      storeMeal(newMeal);
    }
  }, [data]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold">Failed to Load</div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-sans p-6  mx-auto flex flex-row items-center ">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center p-2">
          Meal of the Day
        </h1>
      </div>
      <div>
        <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} className="w-full">
          <div className="relative ">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover rounded-xl shadow-lg mb-4 "
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-45 p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
              <p className="text-ls text-gray-700">
                {meal.strCategory} | {meal.strArea}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <p className="mt-4 text-gray-600 text-center text-lg mb-3">
          {meal.strInstructions.substring(0, 150)}...
        </p>
      </div>
    </div>
  );
};

export default MealOfTheDay;
