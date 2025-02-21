import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";
import CustomInput from "../../components/global/inputfield/CustomInput";
import { GoLocation, GoSearch } from "react-icons/go";
import Discover from "../../components/home/home-discover/Discover.jsx";
import { Helmet } from "react-helmet-async";
import { allCategories } from "../../static/static";
import { useGetServicesQuery } from "../../redux/serviceSlice";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState({});
  const [showlocationSuggestions, setShowlocationSuggestions] = useState(false);
  const [originalLocationData, setOriginalLocationData] = useState({});
  const [categroy, setCategory] = useState("")
  const [searchLocation, setSearchLocation] = useState("")

  const { data, error, isLoading } = useGetServicesQuery();

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    // fetchStatesAndCities();
  }, []);

  //handle on change vendors
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const filtered = Object.entries(allCategories)
        .map(([category, subcategories]) => ({
          category,
          subcategories: subcategories.filter((sub) =>
            sub.toLowerCase().includes(value.toLowerCase())
          ),
        }))
        .filter((item) => item.subcategories.length > 0);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {

    if (!data?.ServiceResult) return;

    const filterData = data.ServiceResult.reduce((acc, service) => {
      if (service.state) {
        acc[service.state] = acc[service.state] || [];
        acc[service.state].push(service.city);
      }
      return acc;
    }, {});

    //set data
    setOriginalLocationData(filterData); // Store original data
    setLocationSuggestions(filterData);
  }, [data]);


  // set value on input field
  const handleSuggestionClick = (category, subcategory) => {
    // console.log(category, subcategory)
    setSearch(`${subcategory}`);
    // this for search
    setCategory(`${category}/${subcategory}`)
    setShowSuggestions(false);
  };

  //handle on location
  const handleSearchLocationChange = (e) => {
    const searchLocation = e.target.value;
    setLocation(searchLocation);

    if (searchLocation) {
      const filteredLocation = Object.entries(originalLocationData).reduce(
        (acc, [state, cities]) => {
          const filteredCities = cities.filter((city) =>
            city.toLowerCase().startsWith(searchLocation.toLowerCase())
          );

          if (filteredCities.length > 0) {
            acc[state] = filteredCities;
          }
          return acc;
        },
        {}
      );

      setLocationSuggestions(filteredLocation);
      setShowlocationSuggestions(Object.keys(filteredLocation).length > 0);
    } else {
      setShowlocationSuggestions(false);
      setLocationSuggestions(originalLocationData); // Reset to original data
    }
  };

  //set wedding location
  const handleLocationClick = (state, city) => {
    setLocation(`${city}`);
    //this is for search
    setSearchLocation(`${state}/${city}`)
    setShowlocationSuggestions(false);
  };

  // navigate to specific services 
  const handleNavigate = () => {
    if(categroy && searchLocation){
      navigate(`/all/${categroy}/${searchLocation}`);
    }else if(searchLocation){
      toast.error("Please select vendor")
    }else if(categroy){
      navigate(`/all/${categroy}`)
    }
    else{
      navigate(`/all`);
    }
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
          content="Marriage Vendors, Marriage Vendors planners, Bridal makeup artists Marriage Vendors, Marriage Vendors photographers, Marriage Vendors florists, Marriage Vendors venues, Marriage Vendors decorators, Marriage Vendors caterers, Marriage Vendors cake designers, Bridal dresses Marriage Vendors, Marriage Vendors bands, Marriage Vendors DJs, Marriage Vendors transportation, Marriage Vendors videographers, Destination Marriage Vendors planners, Marriage Vendors invitations, Marriage Vendors favors, Marriage Vendors rentals, Bridal hairstylists Marriage Vendors, Marriage Vendors coordinators, Marriage Vendors photographers near me, Marriage Vendors dresses online, Best Marriage Vendors planners, Affordable Marriage Vendors, Luxury Marriage Vendors, Marriage Vendors services near me, Outdoor Marriage Vendors venues, Indoor Marriage Vendors venues, Best Marriage Vendors photographers, Marriage Vendors planner in Ludhiana, Marriage Vendors makeup services, Marriage Vendors accessories, Marriage Vendors photographers in Ludhiana, Pre-Marriage Vendors shoot vendors, Marriage Vendors organizers, Traditional Marriage Vendors planners, Custom Marriage Vendors cakes, Bridal boutique Marriage Vendors, Marriage Vendors rental services, Marriage Vendors cake near me, Marriage Vendors photography packages, Marriage Vendors decoration services, Bridal shower planners Marriage Vendors, Marriage Vendors jewelry designers, Bridal party attire Marriage Vendors, Marriage Vendors videography packages, Event stylists for Marriage Vendors, Marriage Vendors favors suppliers, Professional Marriage Vendors planners, Unique Marriage Vendors venues, Marriage Vendors food caterers, Marriage Vendors entertainment services, Marriage Vendors dress designers, Marriage Vendors planners in Ludhiana, Marriage Vendors coordinators in Ludhiana, Marriage Vendors lighting services, Marriage Vendors bar services, Marriage Vendors limo rentals, Marriage Vendors photo booths, Marriage Vendors dessert tables, Marriage Vendors florist in Ludhiana, Marriage Vendors rentals online, Destination Marriage Vendors photographers, Vintage Marriage Vendors, Elegant Marriage Vendors decorations, Marriage Vendors budget planners, Marriage Vendors reception venues, Bridal hair and makeup services Marriage Vendors, Custom Marriage Vendors invitations, Marriage Vendors planners for small weddings, Marriage Vendors videographers in Ludhiana, Luxury bridal accessories Marriage Vendors, Marriage Vendors flower arrangements, Marriage Vendors photographers for hire, Top Marriage Vendors caterers, Local Marriage Vendors, Budget Marriage Vendors, Indian Marriage Vendors, Marriage Vendors planners for destination weddings, Marriage Vendors hair stylists near me, Marriage Vendors cake delivery, Marriage Vendors catering services near me, Marriage Vendors lighting designers, Marriage Vendors planners for budget weddings, Eco-friendly Marriage Vendors, Outdoor Marriage Vendors decorators, Beach Marriage Vendors, Marriage Vendors planners for large weddings, Marriage Vendors event management companies, Marriage Vendors photography albums, Best Marriage Vendors cake designers, Marriage Vendors venues with accommodation, DIY Marriage Vendors, Marriage Vendors videography services near me, Custom Marriage Vendors bouquets, Marriage Vendors dress alterations, Marriage Vendors photography services in Ludhiana, Marriage Vendors floral designers, Marriage Vendors band booking, Marriage Vendors planning tips."
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
                onFocus={() => setShowSuggestions(true)} 
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                leftIcon={<GoSearch size={20} />}
              />
            
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded w-[400px] shadow-lg mt-1 z-20 overflow-auto max-h-[200px]">
                  {suggestions.map(({ category, subcategories }, index) => (
                    <li key={index} className="px-4 py-2  cursor-pointer">
                      {/* {category} */}
                      <ul className=" text-sm grid grid-cols-1  gap-2">
                        {subcategories.map((sub, index) => (
                          <li
                            key={index}
                            className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
                            onClick={() => handleSuggestionClick(category, sub)}
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
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
                className="w-full outline-none focus:border-white bg-white "
                aria-label="Location"
                onChange={handleSearchLocationChange}
               
                leftIcon={<GoLocation size={20} />}
              />
              {showlocationSuggestions &&
                Object.keys(locationSuggestions).length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 rounded w-full shadow-lg mt-1 z-20 overflow-auto max-h-[300px]">
                    {Object.entries(locationSuggestions).map(
                      ([state, cities]) => (
                        <li key={state} className="border-b border-gray-200">
                          
                          
                            <ul className=" bg-white">
                              {cities.map((city, index) => (
                                <li
                                  key={index}
                                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize"
                                  onClick={() => handleLocationClick(state,city)}
                                >
                                  {city}
                                </li>
                              ))}
                            </ul>
                         
                          
                        </li>
                      )
                    )}
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
