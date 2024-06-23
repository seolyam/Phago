import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Meal } from "../types/Meal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MealDetails = () => {
  const { id } = useParams();
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    fetcher
  );

  console.log("Meal Details Data:", data);
  console.log("Meal Details Error:", error);

  if (error) {
    console.error("Failed to load meal details:", error);
    return <div>Failed to Load</div>;
  }

  if (!data) {
    console.log("Loading meal details...");
    return <div>Loading...</div>;
  }

  const meal = data.meals[0] as Meal;

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex-col flex ">
        <h2 className="text-3xl font-bold flex justify-center ">
          {meal.strMeal}
        </h2>
        <div className="justify-center flex">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-[50%] h-auto object-cover mt-2 rounded-lg "
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
        <p>{meal.strInstructions}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
        <ul>
          {getIngredients(meal).map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function getIngredients(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
}

export default MealDetails;
