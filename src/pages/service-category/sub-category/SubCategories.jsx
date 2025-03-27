import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../Footer";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import img from "../../../../public/destination_wedding/destination_wedding.jpg"

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

const SubCategories = () => {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  // this applicable when user is logged in
  const location = useSelector(
    (state) => state?.auth?.user?.wedding_location || state?.auth?.user?.city
  );

  const filters = {
    service_type: subCategory,
  };

  //detail according to subcategory
  const { data, error, isLoading } = useGetServicesQuery(filters);

  const stateServiceCount = data?.ServiceResult.reduce((acc, service) => {
    const state = service?.state;
    if (state) {
      acc[state] = (acc[state] || 0) + 1;
    }
    return acc;
  }, {});

  // Handle state selection
  const handleStateClick = (state) => {
    navigate(`/all/${category}/${subCategory}/${state}`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3 px-4 md:px-16">
        <div className="container mx-auto flex items-center text-sm text-gray-600">
          <Link to="/all" className="hover:text-primary transition">Wedding</Link>
          <span className="mx-2">/</span>
          <Link to={`/all/${category}`} className="hover:text-primary transition">{category}</Link>
          <span className="mx-2">/</span>
          <Link to={`/all/${category}/${subCategory}`} className="font-semibold text-primary">
            {subCategory}
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <header className="px-4 md:px-16 py-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Search for {subCategory}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Discover the perfect {subCategory.toLowerCase()} for your dream wedding
          </p>
        </div>
      </header>

      {/* State Selection Section */}
      <section className="px-4 md:px-16 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {`Select ${subCategory} by Region`}
          </h2>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {Object.keys(stateServiceCount || {}).length > 0 ? (
                Object.entries(stateServiceCount).map(([state, count]) => (
                  <div 
                    key={state} 
                    className="flex-shrink-0 w-48 text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleStateClick(state)}
                  >
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                      <img
                        src={getRandomImage()}
                        alt={`${state} wedding services`}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 capitalize">{state}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {`(${count}) ${subCategory}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <p className="text-gray-400 text-4xl md:text-8xl">No results found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Destination Wedding Banner */}
      <section className="relative w-full h-64 lg:h-96 bg-cover bg-center mt-10" 
        style={{ backgroundImage: `url(${img})` }} 
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Plan Your Dream Destination Wedding</h2>
          <p className="text-lg lg:text-xl mb-6">Explore the best venues & services</p>
          <a 
            href="tel:+916200932331" 
            className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            📞 Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubCategories;