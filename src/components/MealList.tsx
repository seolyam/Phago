import { useState, useEffect } from "react";
import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";

interface MealListProps {
  search: string;
  handleSearch: (query: string) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealList = ({ search, handleSearch }: MealListProps) => {
  const { data, error } = useSWR(
    search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
    fetcher
  );

  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteMeals");
    if (storedFavorites) {
      const favoriteMeals = JSON.parse(storedFavorites);
      const favoriteStatus: { [key: string]: boolean } = {};
      favoriteMeals.forEach((meal: Meal) => {
        favoriteStatus[meal.idMeal] = true;
      });
      setFavorites(favoriteStatus);
    }
  }, []);

  const toggleFavorite = (meal: Meal) => {
    const updatedFavorites = { ...favorites };
    let favoriteMeals: Meal[] = [];
    const storedFavorites = localStorage.getItem("favoriteMeals");

    if (storedFavorites) {
      favoriteMeals = JSON.parse(storedFavorites);
    }

    if (favorites[meal.idMeal]) {
      delete updatedFavorites[meal.idMeal];
      favoriteMeals = favoriteMeals.filter(
        (favMeal) => favMeal.idMeal !== meal.idMeal
      );
    } else {
      updatedFavorites[meal.idMeal] = true;
      favoriteMeals.push(meal);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
  };

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

      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.meals.map((meal: Meal) => (
            <div
              key={meal.idMeal}
              className="relative border cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-105"
              style={{ width: "265px" }}
            >
              <Link
                to={`/meal/${meal.idMeal}`}
                className="w-full flex flex-col items-center"
              >
                <h2 className="text-lg font-bold text-center w-full">
                  {meal.strMeal}
                </h2>
                <p className="mb-2 text-sm">
                  {meal.strCategory} | {meal.strArea}
                </p>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover mt-2 rounded-lg"
                />
              </Link>

              <div className="absolute top-2 right-2">
                <FavoriteButton
                  isFavorite={favorites[meal.idMeal] || false}
                  onToggleFavorite={() => toggleFavorite(meal)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MealList;
