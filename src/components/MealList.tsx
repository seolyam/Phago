import useSWR from "swr";
import { Meal } from "../types/Meal";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

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
    <div className="flex basis-7 flex-wrap gap-4 justify-start m-8 hover:grow">
      {data.meals.map((meal: Meal) => (
        <Link
          to={`/meal/${meal.idMeal}`}
          key={meal.idMeal}
          className="m-2 border cursor-pointer w-48 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center flex-8 transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-lg font-bold text-center">{meal.strMeal}</h2>
          <LazyLoad height={128} offset={100} once>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-32 object-cover mt-2 rounded-lg"
            />
          </LazyLoad>
        </Link>
      ))}
    </div>
  );
};

export default MealList;
