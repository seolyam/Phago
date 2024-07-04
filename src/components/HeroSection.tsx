import React from "react";
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
    <div className="font-sans flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">A meal you might like</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
      />
      <h2 className="text-3xl font-bold mt-2">{meal.strMeal}</h2>
      <p className="mt-2 text-lg text-gray-700">
        {meal.strCategory} | {meal.strArea}
      </p>
      <p className="mt-4 text-gray-600 text-center">
        {meal.strInstructions.substring(0, 150)}...
      </p>
    </div>
  );
};

export default HeroSection;
