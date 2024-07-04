import React from "react";

interface MealProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meal: any;
}

const Meal: React.FC<MealProps> = ({ meal }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg font-sans">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{meal.strMeal}</h3>
        <p className="mt-2">{meal.strCategory}</p>
        <p className="mt-2">{meal.strArea}</p>
      </div>
    </div>
  );
};

export default Meal;
