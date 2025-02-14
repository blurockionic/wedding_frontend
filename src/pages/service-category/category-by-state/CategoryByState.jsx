import { useParams, useNavigate, Link } from "react-router-dom";
import { City, State } from "country-state-city";
import Footer from "../../Footer";
import ServiceCard from "../component/ServiceCard";
import { useGetServicesQuery } from "../../../redux/serviceSlice";

const CategoryByState = () => {
  const { category, subcategory, state } = useParams();
  const navigate = useNavigate();

  // const location = useSelector(
  //   (state) => state?.auth?.user?.wedding_location || state?.auth?.user?.city
  // );

  const filters = {
    service_type: subcategory || "",
    state
  };

  const { data, error, isLoading } = useGetServicesQuery(filters);

  console.log(data)
  // Convert state name to state ISO code
  const selectedState = State.getStatesOfCountry("IN").find(
    (s) => s.name.toLowerCase() === state.toLowerCase()
  );

  // Fetch cities only if state is valid
  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode).map((city) => city.name)
    : [];

    const stateServiceCount = data?.ServiceResult.reduce((acc, service) => {
      const state = service?.vendor?.state;
      if (state) {
        acc[state] = (acc[state] || 0) + 1;
      }
      return acc;
    }, {});


  // Sample top venues by state (dynamic state selection)
  const topVenues = {
    jharkhand: ["Ranchi Lawn", "Hazaribagh Farmhouse", "Jamshedpur Banquet Hall"],
    maharashtra: ["Mumbai Grand Hotel", "Pune Club Lawn", "Nagpur Wedding Resort"],
    delhi: ["Taj Delhi", "Leela Palace", "The Imperial Banquet"],
    karnataka: ["Bangalore Garden Lawn", "Mysore Wedding Hall", "Coorg Farmhouse"],
  };

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
        <Link to={`/all/${category}/${subcategory}/${state}`}>{state}</Link>
      </span>
      <h1 className="px-16 text-2xl font-semibold">
        Search for {subcategory} in {state}
      </h1>

      {/* Horizontal Scroll for Cities */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${subcategory} by city`}</h2>
      </div>

      <div className="px-16 mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {cities.map((city) => (
          <div key={city} className="flex flex-col items-center gap-2">
            <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
            <p
              onClick={() => handleStateClick(city)}
              className="px-4 py-2 text-md rounded-full transition cursor-pointer"
            >
              {city}
            </p>
            <span className="text-xs">{`1223 ${subcategory}`}</span>
          </div>
        ))}
      </div>

      {/* Top Venues by Selected State */}
      {topVenues[state.toLowerCase()] && (
        <div className="mt-6 px-16 py-4">
          <h2 className="text-xl font-semibold">{`Top ${subcategory} in ${state}`}</h2>
          <ul className="mt-2 space-y-2 flex items-center gap-2">
            {topVenues[state.toLowerCase()].map((venue, index) => (
              <li key={index} className="p-2 rounded-lg">
                <ServiceCard image={""} title={venue} rate={"20002"} rating={2.5} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CategoryByState;
