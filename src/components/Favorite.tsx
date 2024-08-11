import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Meal } from "../types/Meal";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";

interface FavoriteProps {
  search: string;
  handleSearch: (query: string) => void;
}

const Favorite = ({ search, handleSearch }: FavoriteProps) => {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteMeals");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setFavoriteMeals(favorites);
      setFilteredMeals(favorites);
    }
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredMeals(favoriteMeals);
    } else {
      setFilteredMeals(
        favoriteMeals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, favoriteMeals]);

  const toggleFavorite = (meal: Meal) => {
    let updatedFavorites = [...favoriteMeals];
    const isFavorite = updatedFavorites.some(
      (favMeal) => favMeal.idMeal === meal.idMeal
    );

    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter(
        (favMeal) => favMeal.idMeal !== meal.idMeal
      );
    } else {
      updatedFavorites.push(meal);
    }

    setFavoriteMeals(updatedFavorites);
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  if (filteredMeals.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="text-center">
          <SearchBar search={search} handleSearch={handleSearch} />
        </div>
        <div>
          <h1 className="text-center text-3xl">Your Favorite Meals</h1>
        </div>

        <div className="flex justify-center items-center flex-col min-h-screen">
          <div className="text-xl font-bold">
            It looks like you haven't set your favorite meals yet.
          </div>
          <p className="text-sm">
            You can set one by choosing your favorite meal and clicking the
            heart icon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SearchBar search={search} handleSearch={handleSearch} />
      <div>
        <h1 className="text-center text-3xl pb-4">Your Favorite Meals</h1>
      </div>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMeals.map((meal: Meal) => (
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
                  isFavorite={favoriteMeals.some(
                    (favMeal) => favMeal.idMeal === meal.idMeal
                  )}
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

export default Favorite;
