import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Button } from "../components/ui/button";
import FavoriteButton from "./FavoriteButton";
import { addMealToRecentlyViewed } from "../utils/recentlyViewed"; // Import the utility function

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    fetcher
  );

  const [isFavorite, setIsFavorite] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (data && data.meals && data.meals.length > 0) {
      const meal = data.meals[0] as Meal;
      const storedFavorites = localStorage.getItem("favoriteMeals");

      if (storedFavorites) {
        const favoriteMeals = JSON.parse(storedFavorites);
        const isFav = favoriteMeals.some(
          (favMeal: Meal) => favMeal.idMeal === id
        );
        setIsFavorite(isFav);
      }

      addMealToRecentlyViewed(meal);
    }
  }, [data, id]);

  if (error) {
    return <div>Failed to Load</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data.meals) {
    return <div>No meals found</div>;
  }

  const meal = data.meals[0] as Meal;

  const toggleFavorite = () => {
    let favoriteMeals: Meal[] = [];
    const storedFavorites = localStorage.getItem("favoriteMeals");

    if (storedFavorites) {
      favoriteMeals = JSON.parse(storedFavorites);
    }

    if (isFavorite) {
      favoriteMeals = favoriteMeals.filter(
        (favMeal) => favMeal.idMeal !== meal.idMeal
      );
    } else {
      favoriteMeals.push(meal);
    }

    localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
    setIsFavorite(!isFavorite);
  };

  const youtubeUrl = meal.strYoutube;
  const videoId = youtubeUrl ? new URL(youtubeUrl).searchParams.get("v") : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className="text-3xl text-center mb-2">{meal.strMeal}</h2>
      <h1 className="mb-2 text-lg text-center">
        {meal.strCategory} | {meal.strArea}
      </h1>
      <div className="flex justify-center pb-2">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-[35%] h-auto object-cover rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-[101%]"
        />
      </div>
      <div className="flex items-center gap-2 justify-center ">
        <p>Add to Favorites</p>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-thin mb-2 cursor-pointer">Instructions</h2>
        <p>{meal.strInstructions}</p>
      </div>
      <div className="mt-4">
        <h2
          className="text-xl font-thin mb-2 cursor-pointer"
          onClick={() => setShowIngredients(!showIngredients)}
        >
          Ingredients {showIngredients ? "▼" : "➤"}
        </h2>
        {showIngredients && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {getIngredients(meal).map((ingredient, index) => (
              <li
                className="flex items-center text-nowrap space-x-2"
                key={index}
              >
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`}
                  alt={ingredient.name}
                  className="w-16 h-16 object-cover transition-transform duration-200 ease-in-out transform hover:scale-105"
                />
                <span>{ingredient.measure} &nbsp;</span>
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {embedUrl && (
        <div className="mt-4">
          <h2
            className="text-xl font-thin mb-2 cursor-pointer"
            onClick={() => setShowVideo(!showVideo)}
          >
            Video Instructions {showVideo ? "▼" : "➤"}
          </h2>
          {showVideo && (
            <div className="video-container">
              <iframe
                title="YouTube Video"
                width="100%"
                height="800"
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => navigate(-1)}
        className="px-4 fixed bottom-5 right-6 transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        Back to List
      </Button>
    </div>
  );
};

function getIngredients(meal: Meal): { name: string; measure: string }[] {
  const ingredients: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ name: ingredient, measure: measure ?? "" });
    }
  }
  return ingredients;
}

export default MealDetails;
