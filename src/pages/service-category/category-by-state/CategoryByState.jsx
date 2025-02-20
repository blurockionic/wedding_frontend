import { useParams, useNavigate, Link } from "react-router-dom";
import { City, State } from "country-state-city";
import Footer from "../../Footer";
import ServiceCard from "../component/ServiceCard";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import ServiceList from "../../../components/ServiceList";

const CategoryByState = () => {
  const { category, subcategory, state } = useParams();
  const navigate = useNavigate();

  const location = useSelector(
    (state) => state?.auth?.user?.wedding_location || state?.auth?.user?.city
  );

  const filters = {
    service_type: subcategory || "",
    state: state
  };

  const { data, error, isLoading } = useGetServicesQuery(filters);


  // top in your state 
  const topInYourState = data?.ServiceResult.filter(
    (detail) => detail.state === state
  ).sort((a, b) => b.rating - a.rating);

  // Fetch cities only if state is valid
    const cityServiceCount = data?.ServiceResult.reduce((acc, service) => {
      const city = service?.city;
      if (city) {
        acc[city] = (acc[city] || 0) + 1;
      }
      return acc;
    }, {});


  // Handle navigation when state is selected
  const handleStateClick = (city) => {
    navigate(`/all/${category}/${subcategory}/${state}/${city}`);
  };
  

  return (
    <>
      {/* Breadcrumb Navigation */}
      <span className="px-16 text-sm">
        <Link to={`/all`}>Wedding</Link> &gt;
        <Link to={`/all/${category}`}>{category}</Link> &gt;
        <Link to={`/all/${category}/${subcategory}`}>{subcategory}</Link> &gt;
        <Link to={`/all/${category}/${subcategory}/${state}`} className="capitalize">{state}</Link>
      </span>
      <h1 className="px-16 text-2xl font-semibold">
        Search for {subcategory} in {state}
      </h1>

      {/* Horizontal Scroll for Cities */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${subcategory} by city`}</h2>
      </div>

      <div className="px-16 mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {
        Object.entries(cityServiceCount || {}).map(([city, count]) => (
          <div key={city} className="flex flex-col items-center gap-2">
            <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
            <p
              onClick={() => handleStateClick(city)}
              className="px-4 py-2 text-md rounded-full transition cursor-pointer capitalize"
            >
              {city}
            </p>
            <span className="text-xs">{`(${count}) ${subcategory}`}</span>
          </div>
        ))}
      </div>

      {/* Top Venues by Selected State */}
      <div className="mt-6 px-16 py-4">
          <h2 className="text-xl font-semibold">{`Top ${subcategory} in ${state}`}</h2>
          <div>
            <ServiceList services={topInYourState || []} />
          </div>
        </div>

      <Footer />
    </>
  );
};

export default CategoryByState;
