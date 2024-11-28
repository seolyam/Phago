import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: { name: string; original: string }[];
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=516110463dc94349a2669e37c5c56a70`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err: unknown) {
        // Properly narrow the type of `err`
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-h-96 object-cover rounded mb-4"
      />
      <p className="text-lg">Servings: {recipe.servings}</p>
      <p className="text-lg">Ready in: {recipe.readyInMinutes} minutes</p>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
        <ul className="list-disc ml-6">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index} className="mb-1">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
        <p>{recipe.instructions || "No instructions provided."}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
