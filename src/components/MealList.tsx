import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Link } from "react-router-dom";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface MealListProps {
  search: string;
}

const MealList = ({ search }: MealListProps) => {
  const { data, error } = useSWR(
    search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    fetcher
  );

  console.log("SWR Data:", data);
  console.log("SWR Error:", error);

  if (error) {
    console.error("Failed to load data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Failed to Load</div>
      </div>
    );
  }

  if (!data) {
    console.log("Loading data...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!data.meals) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="text-2xl font-bold">No meals found</div>
      </div>
    );
  }

  return (
    <div className="flex basis-7 flex-wrap gap-4 justify-start m-8 font-sans">
      {data.meals.map((meal: Meal) => (
        <Link
          to={`/meal/${meal.idMeal}`}
          key={meal.idMeal}
          className="m-2 border cursor-pointer w-48 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center flex-8 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-lg font-bold text-center">{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-32 object-cover mt-2 rounded-lg"
          />
        </Link>
      ))}
    </div>
  );
};

export default MealList;
