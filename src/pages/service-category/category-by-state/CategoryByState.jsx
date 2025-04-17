import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../../Footer";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import ServiceList from "../../../components/ServiceList";
import img from "../../../../public/destination_wedding/destination_wedding.jpg";

const randomImages = [
  "/weddingvendors/house.jpg",
  "/weddingvendors/tent.jpeg",
  "/weddingvendors/game.jpeg",
  "/weddingvendors/florist.jpeg",
  "/weddingvendors/planner.jpeg",
  "/weddingvendors/decoration.jpg",
  "/weddingvendors/cake.jpg",
  "/weddingvendors/cordinator.jpg",
  "/weddingvendors/dj.jpg",
  "/weddingvendors/pandit.jpeg",
  "/weddingvendors/photobooth.jpg",
  "/weddingvendors/astro.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const formatName = (slug) => slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
const formatState = (slug) => slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toLowerCase());

const CategoryByState = () => {
  const { category, subcategory, state } = useParams();
  const navigate = useNavigate();

  const filters = {
    service_type: formatName(subcategory),
    state: formatState(state),
  };

  const { data } = useGetServicesQuery(filters);

  const topInYourState = data?.ServiceResult.filter(
    (detail) => detail.state === state
  ).sort((a, b) => b.rating - a.rating);

  const cityServiceCount = data?.ServiceResult.reduce((acc, service) => {
    const city = service?.city;
    if (city) {
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {});

  const handleStateClick = (city) => {
    const subCitySlug = city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/all/${category}/${subcategory}/${state}/${subCitySlug}`);
  };

  const pageTitle = `${formatName(subcategory)} Services in ${formatName(state)} | Wedding Vendors`;
  const pageDescription = `Discover top-rated ${formatName(subcategory)} in ${formatName(state)}. Browse services by city and plan your perfect wedding today.`;

  return (
    <>
      {/* 🔍 SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${formatName(subcategory)}, ${formatName(state)}, wedding services, wedding vendors, plan wedding`} />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3 px-4 md:px-16">
        <div className=" mx-auto flex items-center text-[8px] md:text-sm text-gray-600">
          <Link to="/all" className="hover:text-primary transition">Wedding</Link>
          <span className="mx-2">/</span>
          <Link className="hover:text-primary transition">{category}</Link>
          <span className="mx-2">/</span>
          <Link to={`/all/${category}/${subcategory}`} className=" capitalize">
            {subcategory}
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/all/${category}/${subcategory}/${state}`}
            className="font-semibold text-primary capitalize"
          >
            {state}
          </Link>
        </div>
      </nav>

      <h1 className="px-4 md:px-16 text-2xl font-semibold">
        Search for {formatName(subcategory)} in {state}
      </h1>

      {/* Horizontal Scroll for Cities */}
      <div className="px-4 py-2 md:px-16 md:py-4">
        <h2 className="text-xl font-semibold">{`Select ${formatName(subcategory)} by city`}</h2>
      </div>

      <div className="px-4 md:px-16 mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {cityServiceCount && Object.keys(cityServiceCount).length > 0 ? (
          Object.entries(cityServiceCount).map(([city, count]) => (
            <div key={city} className="flex flex-col items-center gap-1 md:gap-2 ">
              <img
                src={getRandomImage()}
                alt={`${city} ${formatName(subcategory)}`}
                className="w-20 h-20 md:w-40 md:h-40 rounded-full object-cover shadow-md"
              />
              <p
                onClick={() => handleStateClick(city)}
                className="px-4 py-2 text-md rounded-full transition cursor-pointer capitalize"
              >
                {city}
              </p>
              <span className="text-xs">{`(${count}) ${formatName(subcategory)}`}</span>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-500">No service found</p>
        )}
      </div>

      {/* Top Venues by Selected State */}
      <div className="mt-6 px-4 py-2 md:px-16 md:py-4">
        <h2 className="text-xl font-semibold">{`Top ${subcategory} in ${state}`}</h2>
        <div className="mt-5">
          <ServiceList services={topInYourState || []} />
        </div>
      </div>

      {/* 🌟 Destination Wedding Banner */}
      <div
        className="relative w-full h-64 lg:h-96 bg-cover bg-center mt-10"
        style={{ backgroundImage: `url(${img})` }}
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
