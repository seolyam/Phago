import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Button } from "../components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    fetcher
  );

  const [showIngredients, setShowIngredients] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

  const youtubeUrl = meal.strYoutube;
  const videoId = youtubeUrl ? new URL(youtubeUrl).searchParams.get("v") : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className="text-3xl text-center mb-2">{meal.strMeal}</h2>
      <div className="flex justify-center ">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-[35%] h-auto object-cover transition-transform duration-200 ease-in-out transform hover:scale-[101%] "
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-thin mb-2 cursor-pointer">Instructions</h2>
        {meal.strInstructions}
      </div>

      <div className="mt-4">
        <h2
          className="text-xl font-thin mb-2 cursor-pointer"
          onClick={() => setShowIngredients(!showIngredients)}
        >
          Ingredients {showIngredients ? "▼" : "➤"}
        </h2>
        {showIngredients && (
          <ul className="flex flex-wrap flex-col gap-y-4">
            {getIngredients(meal).map((ingredient, index) => (
              <li
                className="flex items-center text-nowrap space-x-2"
                key={index}
              >
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`}
                  alt={ingredient.name}
                  className="w-16 h-16 object-cover transition-transform duration-200 ease-in-out transform hover:scale-105 "
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
        className="x-4 fixed bottom-5 right-6 transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        Back to List
      </Button>
    </div>
  );
};

function getIngredients(meal: Meal): { name: string; measure: string }[] {
  const ingredients: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ name: ingredient, measure: measure ?? "" });
    }
  }
  return ingredients;
}

export default MealDetails;
