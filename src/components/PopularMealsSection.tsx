import { Link } from "react-router-dom";
import useSWR from "swr";
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

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
    <section className="py-4 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Meals</h2>
        <Carousel opts={{ align: "start" }} className="w-full max-w-6xl">
          <CarouselContent>
            {meals.map((meal) => (
              <CarouselItem key={meal.idMeal} className="md:basis-1/3">
                <div className="p-2">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="rounded-lg mb-4 transition-transform duration-200 ease-in-out transform hover:scale-105"
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        {meal.strMeal}
                      </h3>
                      <p className="mb-4">{meal.strCategory}</p>
                      <Link
                        to={`/meal/${meal.idMeal}`}
                        className="text-blue-500"
                      >
                        Learn more
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularMealsSection;
