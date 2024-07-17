import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealList = () => {
  const [search, setSearch] = useState<string>("");
  const handleSearch = (query: string) => setSearch(query);

  const { data, error } = useSWR(
    search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
    fetcher
  );

  if (error) {
    console.error("Failed to load data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Failed to Load</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center">
        <div className="text-center">
          <SearchBar search={search} handleSearch={handleSearch} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-2xl font-bold">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data.meals) {
    return (
      <div className="flex justify-center">
        <div className="text-center">
          <SearchBar search={search} handleSearch={handleSearch} />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-2xl font-bold">No meals found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SearchBar search={search} handleSearch={handleSearch} />

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.meals.map((meal: Meal) => (
            <Link
              to={`/meal/${meal.idMeal}`}
              key={meal.idMeal}
              className="border cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-105"
              style={{ width: "265px" }}
            >
              <h2 className="text-lg font-bold text-center w-full">
                {meal.strMeal}
              </h2>
              <p className="mb-2 text-sm">{meal.strCategory}</p>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover mt-2 rounded-lg"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MealList;
