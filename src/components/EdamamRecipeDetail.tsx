// src/components/EdamamRecipeDetail.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../utils/edamam";
import { Recipe } from "../types/Types";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EdamamRecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{recipe.label}</h1>
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-auto mb-4"
      />
      <p>
        <strong>Source:</strong>{" "}
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          {recipe.source}
        </a>
      </p>
      <p>
        <strong>Calories:</strong> {recipe.calories.toFixed(2)}
      </p>
      <div className="my-4">
        <h2 className="text-xl font-bold">Health Labels:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {recipe.healthLabels.map((label, index) => (
            <Badge key={index} variant="outline">
              {label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-bold">Ingredients:</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EdamamRecipeDetail;
