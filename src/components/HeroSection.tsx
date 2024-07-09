import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HeroSection: React.FC = () => {
  const { data, error } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    fetcher
  );

  if (error) return <div>Failed to load meals</div>;
  if (!data) return <div>Loading...</div>;

  const meal: Meal = data.meals[0];

  return (
    <div className="font-sans flex flex-row items-center bg-gray-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto gap-2">
      <div className="flex-col flex-2 grow">
        <h1 className="text-2xl font-bold mb-4">A meal you might like:</h1>
        <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded shadow-lg mb-4 transition-transform duration-200 ease-in-out transform hover:scale-105 "
          />
          <h2 className="text-3xl font-bold mt-2">{meal.strMeal}</h2>
          <p className=" text-lg text-gray-700">
            {meal.strCategory} | {meal.strArea}
          </p>
        </Link>
      </div>
      <div className="flex-wrap w-[40%]">
        <p className="mt-4 text-gray-600 text-center flex-1 text-lg">
          {meal.strInstructions.substring(0, 150)}...
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
