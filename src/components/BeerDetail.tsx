import { useParams } from "react-router-dom";
import { useStore } from "../store";

function BeerDetail() {
  let { id } = useParams();
  const recipe = useStore((state) =>
    state.beers.find((b) => String(b.id) === id)
  );

  return (
    <>
      {recipe && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Recipe Details</h1>
          <div className="max-w-md  rounded overflow-hidden shadow-lg">
            <img
              className="w-1/3 m-auto"
              src={recipe.image_url}
              alt={recipe.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 mx-auto">
                {recipe.name}
              </div>
              <p className="text-gray-700 text-base">{recipe.description}</p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                ABV: {recipe.abv}%
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                IBU: {recipe.ibu}
              </span>
              <h2 className="text-xl font-bold mb-2">Food Pairing:</h2>
              <ul className="list-disc list-inside">
                {recipe.food_pairing.map((food, index) => (
                  <li key={index} className="text-gray-600">
                    {food}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BeerDetail;
