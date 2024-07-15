import { Link } from "react-router-dom";
import useSWR from "swr";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PopularMealsSection = () => {
  const { data, error } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese",
    fetcher
  );

  if (error) return <div>Failed to load popular meals</div>;
  if (!data) return <div>Loading...</div>;

  const meals: Meal[] = data.meals.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div className="text-center" key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{meal.strMeal}</h3>
              <p className="mb-4">{meal.strCategory}</p>
              <Link to={`/meal/${meal.idMeal}`} className="">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMealsSection;
