import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";
import CustomInput from "../../components/global/inputfield/CustomInput";
import { GoLocation, GoSearch } from "react-icons/go";
import Discover from "../../components/home/home-discover/Discover.jsx";
import { Helmet } from "react-helmet-async";
import { allCategories } from "../../components/Sidebar";
import { Country, State, City } from "country-state-city";
import FeatureService from "../../components/featuredservices/FeatureService";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [states, setStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [showlocationSuggestions, setShowlocationSuggestions] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    fetchStatesAndCities();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      const filtered = allCategories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (category) => {
    setSearch(category);
    setShowSuggestions(false);
  };

  const handleSearchLocationChange = (e) => {
    const searchLocation = e.target.value;
    if (searchLocation) {
      const filteredLocation = allCities
        .filter((item) => {
          return item.name
            .toLowerCase()
            .startsWith(searchLocation.toLowerCase());
        })
        .map((item) => item.name);

      setLocationSuggestions(filteredLocation);
      setShowlocationSuggestions(true);
    } else {
      setShowlocationSuggestions(false);
    }
    setLocation(searchLocation);
  };

  const handleLocationClick = (c) => {
    setLocation(c);
    setShowlocationSuggestions(false);
  };

  const fetchStatesAndCities = async () => {
    const india = Country.getCountryByCode("IN");
    if (india) {
      const statesList = State.getStatesOfCountry(india.isoCode);
      setStates(statesList);
      let cityCollection = [];
      statesList.map((state) => {
        const cities = City.getCitiesOfState(india.isoCode, state.isoCode);
        cityCollection = [...cityCollection, ...cities];
      });
      setAllCities(cityCollection.flat());
    }
  };

  const handleNavigate = () => {
    const queryParams = new URLSearchParams({
      search,
      location,
    }).toString();
    navigate(`/services?${queryParams}`);
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Home | Marriage Vendors</title>
        <meta
          name="description"
          content="Discover the best wedding vendors for your dream wedding. 1000+ trusted vendors, trusted by happy couples. Find vendors in your location effortlessly!"
        />
        <meta
          name="keywords"
          content="Wedding vendors, Wedding planners, Bridal makeup artists, Wedding photographers, Wedding florists, Wedding venues, Wedding decorators, Wedding caterers, Wedding cake designers, Bridal dresses, Wedding bands, Wedding DJs, Wedding transportation, Wedding videographers, Destination wedding planners, Wedding invitations, Wedding favors, Wedding rentals, Bridal hairstylists, Wedding coordinators, Wedding photographers near me, Wedding dresses online, Best wedding planners, Affordable wedding vendors, Luxury wedding vendors, Wedding services near me, Outdoor wedding venues, Indoor wedding venues, Best wedding photographers, Wedding planner in Ludhiana, Wedding makeup services, Wedding accessories, Wedding photographers in Ludhiana, Pre-wedding shoot vendors, Wedding organizers, Traditional wedding planners, Custom wedding cakes, Bridal boutique, Wedding rental services, Wedding cake near me, Wedding photography packages, Wedding decoration services, Bridal shower planners, Wedding jewelry designers, Bridal party attire, Wedding videography packages, Event stylists for weddings, Wedding favors suppliers, Professional wedding planners, Unique wedding venues, Wedding food caterers, Wedding entertainment services, Wedding dress designers, Wedding planners in Ludhiana, Wedding coordinators in Ludhiana, Wedding lighting services, Wedding bar services, Wedding limo rentals, Wedding photo booths, Wedding dessert tables, Wedding florist in Ludhiana, Wedding rentals online, Destination wedding photographers, Vintage wedding vendors, Elegant wedding decorations, Wedding budget planners, Wedding reception venues, Bridal hair and makeup services, Custom wedding invitations, Wedding planners for small weddings, Wedding videographers in Ludhiana, Luxury bridal accessories, Wedding flower arrangements, Wedding photographers for hire, Top wedding caterers, Local wedding vendors, Budget wedding vendors, Indian wedding vendors, Wedding planners for destination weddings, Wedding hair stylists near me, Wedding cake delivery, Wedding catering services near me, Wedding lighting designers, Wedding planners for budget weddings, Eco-friendly wedding vendors, Outdoor wedding decorators, Beach wedding vendors, Wedding planners for large weddings, Wedding event management companies, Wedding photography albums, Best wedding cake designers, Wedding venues with accommodation, DIY wedding vendors, Wedding videography services near me, Custom wedding bouquets, Wedding dress alterations, Wedding photography services in Ludhiana, Wedding floral designers, Wedding band booking, Wedding planning tips."
        />
        <meta name="author" content="Wedding Planner Team" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Plan Your Dream Wedding with Us | Top Wedding Vendors"
        />
        <meta
          property="og:description"
          content="Discover trusted wedding vendors for your big day and plan the perfect wedding with ease. From photographers to planners, florists, and more, find the best professionals to make your celebration unforgettable."
        />
        <meta property="og:image" content="/flowerbg 1.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.marriagevendors.com/" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="google-site-verification"
          content="bNwJRK2wyCg2nnVlVT0AysDAahMXXs29eNcurUyJ02E"
        />
        <meta name="adsense-id" content="ca-pub-1234567890123456" />
        <link rel="canonical" href="https://www.marriagevendors.com/" />
        {/* Structured Data for Schema */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Plan Your Dream Wedding with Us | Top Wedding Vendors",
            description:
              "Discover the best wedding vendors for your dream wedding. 1000+ trusted vendors, trusted by happy couples. Find vendors in your location effortlessly!",
            url: "https://www.marriagevendors.com/",
            author: {
              "@type": "Organization",
              name: "Marriage Vendors",
              url: "https://www.marriagevendors.com/",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "hhttps://www.marriagevendors.com/",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      <div
        className="h-[80vh] w-full z-10 relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/herobg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      >
        {/* Content Section */}
        <div className="p-12 mt-48 md:pl-24 space-y-6 rounded-lg z-40 flex justify-center items-center flex-col w-full">
          <p
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <span className="text-2xl md:text-4xl lg:text-[66px] mb-3">
              Your one-stop destination for{" "}
            </span>
            <span className="text-[#fecd17]">Dream Wedding</span>

            {/* Tagline */}
          {/* <span className="text-gray-300 text-lg mt-5">
            Find the best wedding vendors with thousands of trusted reviews
          </span> */}
          </p>

          {/* Mobile Search Button */}
          <CustomButton
            leftIcon={<GoSearch size={20} className="text-white" />}
            text="Search"
            className="w-1/2 lg:hidden bg-primary px-10 py-2 rounded text-white md:ml-[-50px] lg:ml-0"
            onClick={handleNavigate}
          >
            Discover
          </CustomButton>
        </div>

        {/* Search Section */}
        <section className="hidden z-50 absolute bottom-0 w-full lg:flex items-center justify-center flex-col gap-1 bg-gradient-to-t from-white bg-opacity-70">
          {/* Input Group */}
          <div className="flex gap-4 bg-white p-6 rounded-lg shadow-lg ">
            {/* Vendor Input */}
            <div className="w-[400px]">
              <CustomInput
                type="text"
                placeholder="Select Vendor"
                className="outline-none bg-white w-full focus:border-white"
                aria-label="Select Vendor"
                value={search}
                onChange={handleSearchChange}
                leftIcon={<GoSearch size={20} />}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded w-[400px] shadow-lg mt-1 z-20 overflow-auto max-h-[200px]">
                  {suggestions.map((category, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Location Input */}
            <div className="relative w-[400px]">
              <CustomInput
                type="text"
                value={location}
                placeholder="In Location"
                className="w-full outline-none focus:border-white bg-white"
                aria-label="Location"
                onChange={handleSearchLocationChange}
                leftIcon={<GoLocation size={20} />}
              />
              {showlocationSuggestions && locationSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded w-full shadow-lg mt-1 z-20 overflow-auto max-h-[200px]">
                  {locationSuggestions.map((c, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleLocationClick(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Discover Button */}
            <CustomButton
              text="Discover"
              className="bg-primary px-10 py-2 rounded text-white"
              onClick={handleNavigate}
            >
              Discover
            </CustomButton>
          </div>

          
        </section>
      </div>

      {/* Discover Section */}
      <Discover />
    </>
  );
}
