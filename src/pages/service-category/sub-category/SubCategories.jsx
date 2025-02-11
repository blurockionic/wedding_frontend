import { useParams, Link } from "react-router-dom";

const SubCategories = () => {
  const { category, subcategory } = useParams();
  const states = ["Jharkhand", "Maharashtra", "Delhi"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{subcategory} in {category}</h1>
      <ul className="mt-4 space-y-2">
        {states.map((state) => (
          <li key={state}>
            <Link to={`/all/${category}/${subcategory}/${state.toLowerCase()}`} className="text-blue-500 hover:underline">
              {state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
