import Aos from "aos";
import "aos/dist/aos.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";
import CustomInput from "../../components/global/inputfield/CustomInput";
import { GoSearch } from "react-icons/go";
import { Helmet } from "react-helmet-async";
import { allCategories } from "../../static/static";
import { toast } from "react-toastify";
import LocationSearch from "../../components/LocationSearch/LocationSearch";
import CircularAnimation from "../CircularMotion";
import img from "../../../public/heroSection/image 49.png";
import { useGetHeroSectionAnalyticsQuery } from "../../redux/adminApiSlice";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [category, setCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [backgroundImg, setBackGroundImg] = useState(img);
  const [isMobile, setIsMobile] = useState(false);
  const { data: heroSectionAnalyticsData, isLoading } =
    useGetHeroSectionAnalyticsQuery();

  const serviceTypeRef = useRef(null);
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      const allCategoriesArray = Object.entries(allCategories).map(
        ([category, subcategories]) => ({
          category,
          subcategories,
        })
      );

      setSuggestions(allCategoriesArray);
      setShowSuggestions(true);
      return;
    }

    if (value.trim()) {
      const filtered = Object.entries(allCategories)
        .map(([category, subcategories]) => ({
          category,
          subcategories: subcategories.filter((sub) =>
            sub.toLowerCase().includes(value.toLowerCase())
          ),
        }))
        .filter((item) => item.subcategories.length > 0);

      setSuggestions(filtered);
      console.log(filtered);

      setShowSuggestions(true);
    }
  };
  const handleFocus = useCallback(() => {
    if (!search.trim()) {
      setSuggestions(() =>
        Object.entries(allCategories).map(([category, subcategories]) => ({
          category,
          subcategories,
        }))
      );
    }
    setShowSuggestions(true);
  }, [search]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        serviceTypeRef.current &&
        !serviceTypeRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // set value on input field
  const handleSuggestionClick = (category, subcategory) => {
    setSearch(`${subcategory}`);
    setCategory(`${category}/${subcategory}`);
    setShowSuggestions(false);
  };

  const handleNavigate = () => {
    if (category && searchLocation) {
      navigate(`/all/${category}/${searchLocation}`);
    } else if (searchLocation) {
      toast.error("Please select vendor");
    } else if (category) {
      navigate(`/all/${category}`);
    } else {
      navigate(`/all`);
    }
  };

  const insightCard = () => {
    return (
      <>
        <div
          className={`flex w-full flex-grow px-2    my-10 gap-6 ${
            !isMobile ? "justify-between " : "justify-around"
          } items-center `}
        >
          {[
            {
              count: heroSectionAnalyticsData?.verifiedUsers,
              desc: " Verified Users",
              background: "text-[#F20574]",
            },
            {
              count: heroSectionAnalyticsData?.verifiedVendors,
              desc: " Verified Vendors",
              background: "text-[#B14DA1]",
            },
            {
              count: heroSectionAnalyticsData?.activeServices,
              desc: " Offering Services",
              background: "text-[#C1000DB2]",
            },
          ].map(({ count, desc, background }, index) => (
            <div
              key={index}
              className="border px-2 rounded-md py-2 bg-white bg-opacity-20 backdrop-blur-lg min-w-[80px] flex-grow  md:w-auto md:min-w-[120px] md:max-w-[180px] text-center shadow-md"
            >
              <p className="text-md md:text-3xl font-bold">{count}+</p>
              <div className="mt-2 bg-slate-600 h-1 w-full rounded"></div>
              <p className={` ${background} text-[8px] md:text-lg mt-2`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
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

      <div className="  grid md:pl-16 md:pt-20  lg:grid-cols-2 grid-cols-1 justify-between gap-10  items-center">
        {/* Left Section */}

        <div className="relative   flex flex-col gap-6  text-center items-start md:text-left">
          <img
            className="hidden lg:block absolute  left-0 -top-10  "
            src="/heroSection/Vector1.png"
            alt="Vector1"
          />

          {isMobile && (
            <div className="absolute inset-0 z-[-50]">
              <img
                className="w-full h-full object-cover"
                src={backgroundImg}
                alt="Background"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          )}

          <div className="text-center  w-full my-10 md:text-left">
            <p
              className="text-lg md:text-3xl lg:text-4xl text-white md:text-black font-bold tracking-tight leading-tight"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once="true"
            >
              Your one-stop destination for
            </p>
            <p
              className="text-[2.5rem] lg:mt-2 md:text-6xl lg:text-[94px] font-bold tracking-tight custom-animate text-white md:text-primary"
              data-aos="fade-up"
              style={
                isMobile
                  ? {
                      WebkitTextStroke: "0.1px pink", // Adjust thickness for clarity
                      WebkitTextFillColor: "white", // Keeps the inner text white
                    }
                  : {}
              }
              data-aos-delay="500"
              data-aos-once="true"
            >
              Dream Wedding
            </p>
          </div>
          <section className="   ml-0 w-full md:flex-row items-center justify-start  mx-auto  flex-col  flex">
            {/* Input Group */}
            <div className="   relative  my-5 md:flex justify-start items-center rounded-lg  border focus-within:ring-1 focus-within:ring-primary transition duration-300  ">
              <div ref={serviceTypeRef} className=" relative  ">
                <CustomInput
                  type="text"
                  placeholder="Select Vendor"
                  className="outline-none   focus:ring-0 focus:ring-none bg-white  border-none  "
                  aria-label="Select Vendor"
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                  leftIcon={<GoSearch size={20} />}
                />

                {showSuggestions && suggestions.length > 0 && (
                  <ul className=" absolute  bg-white border border-gray-300 w-full rounded shadow-lg mt-1 z-20 overflow-auto  max-h-[200px]">
                    {suggestions.map(({ category, subcategories }) => (
                      <li key={category} className="px-4 py-2  cursor-pointer">
                        <ul className=" text-sm grid grid-cols-1  gap-2">
                          {subcategories.map((sub, index) => (
                            <li
                              key={sub}
                              className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
                              onClick={() =>
                                handleSuggestionClick(category, sub)
                              }
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
              <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2   -mt-2">
                <span className="  text-4xl text-pink-400">|</span>
              </div>

              <div className="hidden md:block relative overflow-visible z-10">
                <LocationSearch
                  customClass={"border-none rounded-none "}
                  setSearchLocation={setSearchLocation}
                />
              </div>
            </div>

            <div className="md:hidden flex flex-col gap-5">
              <LocationSearch
                customClass={""}
                setSearchLocation={setSearchLocation}
              />
            </div>

            <CustomButton
              text="search"
              className="justify-center bg-primary my-5 md:my-0 md:ml-5 px-10 py-3 text-white  border-none"
              onClick={handleNavigate}
            />
          </section>

          {!isMobile && <div>{insightCard()}</div>}

          {/* Stats Section */}

          <img
            className="relative  hidden lg:block -left-14 "
            src="/heroSection/Vectorheart.png"
            alt="Vectorheart"
          />
        </div>

        {/* Right Section */}
        <div className="hidden relative lg:flex flex-1 justify-center items-center w-full   md:h-[500px] lg:h-[600px]">
          <div className="">
            <CircularAnimation />
          </div>
          <div className="">
            {" "}
            <img
              className="absolute  top-10 right-40 hidden md:block"
              src="/heroSection/Vectorheartbuzz.png"
              alt="heartbuzz"
            />
          </div>
        </div>
      </div>
      {isMobile && insightCard()}
    </>
  );
}
