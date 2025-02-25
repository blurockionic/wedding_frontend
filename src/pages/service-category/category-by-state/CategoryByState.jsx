import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../Footer";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import ServiceList from "../../../components/ServiceList";
import img from "../../../../public/destination_wedding/destination_wedding.jpg";
// Import Random Images
const randomImages = [
  "/weddingvendors/house.jpg" ,
  "/weddingvendors/tent.jpeg" ,
  "/weddingvendors/game.jpeg" ,
  "/weddingvendors/florist.jpeg" ,
 "/weddingvendors/planner.jpeg" ,
 "/weddingvendors/decoration.jpg" ,
  "/weddingvendors/cake.jpg" ,
 "/weddingvendors/cordinator.jpg" ,
  "/weddingvendors/dj.jpg" ,
  "/weddingvendors/pandit.jpeg" ,
  "/weddingvendors/photobooth.jpg" ,
  "/weddingvendors/astro.jpg"
];

const getRandomImage = () => {
 return randomImages[Math.floor(Math.random() * randomImages.length)];
};


const CategoryByState = () => {
  const { category, subcategory, state } = useParams();
  const navigate = useNavigate();

  // const location = useSelector(
  //   (state) => state?.auth?.user?.wedding_location || state?.auth?.user?.city
  // );

  const filters = {
    service_type: subcategory || "",
    state: state,
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
        <Link
          to={`/all/${category}/${subcategory}/${state}`}
          className="capitalize"
        >
          {state}
        </Link>
      </span>
      <h1 className="px-16 text-2xl font-semibold">
        Search for {subcategory} in {state}
      </h1>

      {/* Horizontal Scroll for Cities */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${subcategory} by city`}</h2>
      </div>

      <div className="px-16 mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {Object.entries(cityServiceCount || {}).map(([city, count]) => (
          <div key={city} className="flex flex-col items-center gap-2">
            <img
              src={getRandomImage()}
              alt="Wedding Venue"
              className="w-40 h-40 rounded-full object-cover shadow-md"
            />
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
        <h2 className="text-xl font-semibold ">{`Top ${subcategory} in ${state}`}</h2>
        <div className="mt-5">
          <ServiceList services={topInYourState || []} />
        </div>
      </div>

      {/* 🌟 Destination Wedding Banner (Above Footer) */}
      <div
        className="relative w-full h-64 lg:h-96 bg-cover bg-center mt-10"
        style={{ backgroundImage: `url(${img})` }} // Replace with your image URL
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Plan Your Dream Destination Wedding
          </h1>
          <p className="mt-2 text-lg lg:text-xl">
            Explore the best venues & services in {state}
          </p>
          <a
            href="tel:+916200932331"
            className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            📞 +91 6200932331
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryByState;
