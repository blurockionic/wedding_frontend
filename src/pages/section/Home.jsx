import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";
import CustomInput from "../../components/global/inputfield/CustomInput";
import { GoLocation, GoSearch } from "react-icons/go";
import Discover from "../../components/home/home-discover/Discover";
import { allCategories } from "../../components/Sidebar"; // Assuming this is the full category list.

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState(allCategories || []); // Filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // To manage suggestion visibility

  useEffect(() => {
    Aos.init({
      duration: 1000, // Duration of the animation
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      // Filter suggestions based on user input
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
    setShowSuggestions(false); // Hide suggestions after selecting
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
      <div
        className="h-3/4 w-full z-10 relative flex items-center justify-start"
        style={{
          backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/herobg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Flower Decoration */}
        <div
          className="hidden md:block absolute left-0 w-24 h-auto z-20 transform -translate-y-1/2"
          data-aos="zoom-in"
          data-aos-delay="1000"
          data-aos-once="true"
        >
          <img
            alt="Flower Decoration"
            src="/flowerbg 1.png"
            className="opacity-90"
          />
        </div>

        {/* Content Section */}
        <div className="p-12 md:pl-24 space-y-6 rounded-lg z-40 flex justify-center items-center flex-col w-full">
          <p
            className="text-lg mt-10 md:mt-0 text-gray-100 leading-tight"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="true"
          >
            — Hello and Welcome,
          </p>

          <p
            className="pb-20  text-3xl md:text-6xl lg:text-7xl font-bold text-white flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <span className="text-4xl md:text-5xl lg:text-[72px]">
              Plan your <span className="text-[#ffcdf8]">Dream Wedding</span>
            </span>
            <span className="mt-2 mb-10 text-4xl md:text-5xl lg:text-[72px]">
              with us
            </span>
          </p>

          {/* Mobile Search Button */}
          <CustomButton
            leftIcon={<GoSearch size={20} className="text-white" />}
            text="Search"
            className="w-1/2 lg:hidden bg-[#fb3966] px-10 py-2 rounded text-white md:ms-[-50px] lg-ms-0 "
            onClick={handleNavigate}
          >
            Discover
          </CustomButton>
        </div>

        {/* Search Section */}
        <section className="hidden z-50 py-12 absolute bottom-0 w-full lg:flex items-center justify-center flex-col gap-2 bg-gradient-to-t from-black bg-opacity-50">
          <div className="flex gap-2 relative">
            <div className="relative w-[400px]">
              <CustomInput
                type="text"
                placeholder="Select Vendor"
                className="outline-none bg-white w-[400px] focus:border-white"
                aria-label="Select Vendor"
                value={search}
                onChange={handleSearchChange}
                leftIcon={<GoSearch size={20} />}
              />
              {/* Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className="absolute  bg-white border border-gray-300 rounded w-full shadow-lg mt-1 z-10"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
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

            <CustomInput
              type="text"
              placeholder="in Location"
              className="w-[300px] outline-none focus:border-white bg-white"
              aria-label="Location"
              onChange={(e) => setLocation(e.target.value)}
              leftIcon={<GoLocation size={20} />}
            />
            <CustomButton
              text="Discover"
              className="bg-[#e984de] px-10 py-2 rounded text-black"
              onClick={handleNavigate}
            >
              Discover
            </CustomButton>
          </div>
          <span className="text-white text-xl">
            1000+ vendors and couples trust us.
          </span>
        </section>
      </div>

      {/* Discover Section */}
      <Discover />
    </>
  );
}
