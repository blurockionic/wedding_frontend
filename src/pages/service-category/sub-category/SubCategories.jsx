import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import { City, State } from "country-state-city";
import Footer from "../../Footer";
import ServiceCard from "../component/ServiceCard";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
} from "../../../static/static";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import ServiceList from "../../../components/ServiceList";

const SubCategories = () => {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const location = useSelector(
    (state) => state.auth.user.wedding_location || state.auth.user.city
  );

  const filters = {
    service_type: subCategory || "",
  location
   
  };

  const { data, error, isLoading } = useGetServicesQuery(filters);


  // Static data
  const categoryOptions = [
    { value: "lawns", label: "Lawns" },
    { value: "farmhouses", label: "Farmhouses" },
    { value: "hotels", label: "Hotels" },
  ];

  const locationOptions = [
    { value: "jharkhand", label: "Jharkhand" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "delhi", label: "Delhi" },
    { value: "karnataka", label: "Karnataka" },
  ];

  const categories = [
    {
      title: "Wedding Venues",
      description: "Find stunning venues, from grand resorts to cozy gardens!",
      image: "/discover/wedding-venues.png",
      subcategories: weddingVenues,
    },
    {
      title: "Wedding Vendors",
      description:
        "Top-rated professionals to bring your wedding vision to life!",
      image: "/discover/wedding-vendor.png",
      subcategories: weddingVendors,
    },
    {
      title: "Bride",
      description:
        "Bridal wear, beauty, and essentials for your perfect wedding look!",
      image: "/discover/bride.png",
      subcategories: brides,
    },
    {
      title: "Groom",
      description:
        "Stylish suits, grooming, and accessories for the modern groom!",
      image: "/discover/groom.png",
      subcategories: grooms,
    },
    {
      title: "Wedding Services",
      description:
        "Planners, decorators, caterers & more for a seamless wedding!",
      image: "/discover/wedding-services.png",
      subcategories: [
        { name: "Wedding Planners", image: "/images/wedding-planners.png" },
        { name: "Decorators", image: "/images/decorators.png" },
        { name: "Caterers", image: "/images/caterers.png" },
      ],
    },
    {
      title: "Other Services",
      description:
        "Entertainment, transport, and extras for a flawless celebration!",
      image: "/discover/other.png",
      subcategories: [
        { name: "Live Bands", image: "/images/live-bands.png" },
        { name: "Luxury Transport", image: "/images/luxury-transport.png" },
        { name: "Fireworks & Effects", image: "/images/fireworks.png" },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Handle navigation when both are selected
  const handleNavigate = () => {
    if (selectedCategory && selectedLocation) {
      navigate(
        `/all/${category}/${selectedCategory.value}/${selectedLocation.value}`
      );
    }
  };

  const indianStates = State.getStatesOfCountry("IN").map(
    (state) => state.name
  );

  // Sample top venues by state
  const topVenues = {
    jharkhand: [
      "Ranchi Lawn",
      "Hazaribagh Farmhouse",
      "Jamshedpur Banquet Hall",
    ],
    maharashtra: [
      "Mumbai Grand Hotel",
      "Pune Club Lawn",
      "Nagpur Wedding Resort",
    ],
    delhi: ["Taj Delhi", "Leela Palace", "The Imperial Banquet"],
    karnataka: [
      "Bangalore Garden Lawn",
      "Mysore Wedding Hall",
      "Coorg Farmhouse",
    ],
  };

  // Handle state selection
  const handleStateClick = (state) => {
    navigate(`/all/${category}/${subCategory}/${state}`);
  };

  // filter the data according to the selected category and location
  // const filteredData = categories.filter((item) => item.title === category)[0];
  return (
    <>
      {/* navigation */}
      <span className="px-16 text-sm">
        <Link to={`/all`}>Wedding</Link> &gt;
        <Link to={`/all/${category}`}>{category}</Link> &gt;
        <Link to={`/all/${category}/${subCategory}`}>{subCategory}</Link>
      </span>
      <h1 className="px-16 text-2xl font-semibold">Search for {subCategory}</h1>
      {/* <div className="px-16 py-4">
        <p className="mt-2">Find the best listings for {category}.</p>

        {/* Selectable Search Bars */}
      {/* <div className="mt-4 flex flex-col md:flex-row gap-4">
          {/* Category Select */}.
      {/* <Select
            options={categoryOptions}
            placeholder="Select a category..."
            value={selectedCategory}
            defaultInputValue={category}
            onChange={setSelectedCategory}
            className="w-full md:w-1/2"
          /> */}

      {/* Location Select */}
      {/* <Select
            options={locationOptions}
            placeholder="Select a location..."
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full md:w-1/2"
          /> */}
      {/* </div> */}

      {/* Navigate Button */}
      {/* <button
          onClick={handleNavigate}
          disabled={!selectedCategory || !selectedLocation}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Search
        </button> */}
      {/* </div> */}

      {/* Horizontal Scroll for States */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${subCategory} by region `}</h2>
      </div>

      <div className="px-16  mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {indianStates.map((state) => (
          <div key={state} className="flex flex-col items-center gap-2">
            <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
            <p
              key={state}
              onClick={() => handleStateClick(state)}
              // className={`px-4 py-2 rounded-full transition ${
              //   selectedCategory
              //     ? "bg-gray-200 hover:bg-blue-500 hover:text-white"
              //     : "bg-gray-300 cursor-not-allowed"
              // }`}
              className={`px-4 py-2 text-md rounded-full transition cursor-pointer`}
              // disabled={!selectedCategory}
            >
              {state}
            </p>
            <span className="text-xs">{`1223 ${subCategory}`}</span>
          </div>
        ))}
      </div>


      {/* Top Venues by Selected State */}

        <div className="my-10 mx-5">
        <ServiceList services={data?.ServiceResult || []} />
        </div>


      <div className="mt-6 px-16 py-4">

      

        <h2 className="text-xl font-semibold">{`Top ${subCategory} in Delhi`}</h2>
        <ul className="mt-2 space-y-2 flex items-center gap-2">
          {topVenues.delhi.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              <ServiceCard
                image={""}
                title={venue}
                rate={"20002"}
                rating={2.5}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${subCategory} in Karnataka`}</h2>
        <ul className="mt-2 space-y-2 flex itesm-center gap-2">
          {topVenues.maharashtra.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              <ServiceCard
                image={""}
                title={venue}
                rate={"20002"}
                rating={2.5}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${category} in Tamilnadu`}</h2>
        <ul className="mt-2 space-y-2 flex items-center gap-2">
          {topVenues.karnataka.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              <ServiceCard
                image={""}
                title={venue}
                rate={"20002"}
                rating={2.5}
              />
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default SubCategories;
