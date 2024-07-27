import { useEffect, useState } from "react";
import { Meal } from "../types/Meal";
import { getStoredMeal, storeMeal, isMealExpired } from "../utils";
import { Link } from "react-router-dom";

const MealOfTheDay = () => {
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const storedMealData = getStoredMeal();

    if (storedMealData && !isMealExpired(storedMealData.timestamp)) {
      setMeal(storedMealData.meal);
    } else {
      fetchNewMeal();
    }
  }, []);

  const fetchNewMeal = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    if (data && data.meals && data.meals.length > 0) {
      const newMeal = data.meals[0];
      setMeal(newMeal);
      storeMeal(newMeal);
    }
  };

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-start  mt-[200px] justify-center ">
      <div className="font-sans p-6 mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 max-w-6xl">
        <div className="w-full md:w-1/4 text-center">
          <h1 className="text-5xl font-bold mb-4">Meal of the Day</h1>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
            className="w-full"
          >
            <div className="relative">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-80 object-cover rounded-xl shadow-lg mb-4"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-45 p-4 rounded-lg">
                <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
                <p className="text-lg text-gray-700">
                  {meal.strCategory} | {meal.strArea}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full md:w-1/4">
          <p className="mt-4 text-gray-600 text-center text-lg mb-3">
            {meal.strInstructions.substring(0, 150)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MealOfTheDay;
