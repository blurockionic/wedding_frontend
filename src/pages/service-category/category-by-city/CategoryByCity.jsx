import { useParams } from "react-router-dom";

const CategoryByCity = () => {
  const { category, subcategory, state, city } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{subcategory} in {city}, {state}</h1>
      <p className="mt-2">Here you will find all listings for {subcategory} in {city}.</p>
    </div>
  );
};

export default CategoryByCity;
