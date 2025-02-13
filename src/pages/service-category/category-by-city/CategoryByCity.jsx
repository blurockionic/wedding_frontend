import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryByCity = () => {
  const { category, subcategory, state, city } = useParams();
  const navigate = useNavigate();

  const handleOnCard = (item) => {
    console.log("Card Clicked", item);
    navigate(`/all/${category}/${subcategory}/${state}/${city}/${item}`);
  };

  return (
    <div className="flex px-16 py-4 gap-6">
      {/* Sidebar with Filters */}
      <aside className="w-1/4 h-screen sticky top-0 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Price Range</label>
          <input type="range" className="w-full mt-1" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Rating</label>
          <select className="w-full mt-1 border rounded p-2">
            <option>4+ Stars</option>
            <option>3+ Stars</option>
            <option>2+ Stars</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Categories</label>
          <select className="w-full mt-1 border rounded p-2">
            <option>{category}</option>
          </select>
        </div>
      </aside>

      {/* Service Listings */}
      <div className="w-3/4">
      <span className=" text-sm">
        <Link to={`/all`}>Wedding</Link> &gt;
        <Link to={`/all/${category}`}>{category}</Link> &gt;
        <Link to={`/all/${category}/${subcategory}`}>{subcategory}</Link> &gt;
        <Link to={`/all/${category}/${subcategory}/${state}`}>{state}</Link>&gt;
        <Link to={`/all/${category}/${subcategory}/${state}/${city}`}>{city}</Link>
      </span>
        <h1 className="text-2xl font-bold">
          {subcategory} in {city}, {state}
        </h1>
        <p className="mt-2">
          Here you will find all listings for {subcategory} in {city}.
        </p>

        {/* Sample Service Listings */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
            <div
              key={item}
              className="border rounded-lg p-4 shadow-md bg-white cursor-pointer"
              onClick={()=>handleOnCard(item)}
            >
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h3 className="mt-2 text-lg font-semibold">
                {subcategory} Service {item}
              </h3>
              <p className="text-sm text-gray-500">Starting at ₹200</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryByCity;
