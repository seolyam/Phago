import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRandomMeal = () => {
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/random.php`,
    fetcher
  );

  return {
    meal: data ? data.meals[0] : null,
    isLoading: !error && !data,
    isError: error,
  };
};
