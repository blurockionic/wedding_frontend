import { useParams, Link } from "react-router-dom";

const CategoryByState = () => {
  const { category, subcategory, state } = useParams();
  const cities = ["Ranchi", "Chaibasa", "Jamshedpur"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{subcategory} in {state}</h1>
      <ul className="mt-4 space-y-2">
        {cities.map((city) => (
          <li key={city}>
            <Link to={`/all/${category}/${subcategory}/${state}/${city.toLowerCase()}`} className="text-blue-500 hover:underline">
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryByState;
