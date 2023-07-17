import React from "react";
import { Beer } from "../types";
import { Link } from "react-router-dom";

const RecipeCard: React.FC<{ recipe: Beer; isSelected?: boolean }> = ({
  recipe,
  isSelected = false,
}) => {
  return (
    <div
      className={`max-w-md rounded overflow-hidden shadow-lg mx-auto mb-2 ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >
      <Link to={`/beer/${recipe.id}`}>
        <img
          className="w-1/3 mx-auto"
          src={recipe.image_url}
          alt={recipe.name}
        />
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">{recipe.name}</div>
          <p className="text-gray-700 text-base text-start">
            {recipe.description}
          </p>
        </div>
      </Link>
      <div className="px-6 py-4">
        <Link
          to={`/beer/${recipe.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
