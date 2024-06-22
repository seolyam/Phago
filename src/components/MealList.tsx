import { useState } from "react";
import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Link } from "react-router-dom";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealList = () => {
  const [search, setSearch] = useState("");
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
    return <div>Failed to Load</div>;
  }

  if (!data) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  if (!data.meals) {
    return <div>No meals found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search for a meal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      <div className="flex flex-wrap gap-4 justify-center">
        {data.meals.map((meal: Meal) => (
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
            className="m-2 border cursor-pointer w-48 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
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
    </div>
  );
};

export default MealList;
