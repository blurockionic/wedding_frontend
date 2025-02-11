import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Static data
  const categoryOptions = [
    { value: "lawns", label: "Lawns" },
    { value: "farmhouses", label: "Farmhouses" },
    { value: "hotels", label: "Hotels" }
  ];

  const locationOptions = [
    { value: "jharkhand", label: "Jharkhand" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "delhi", label: "Delhi" },
    { value: "karnataka", label: "Karnataka" }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Handle navigation when both are selected
  const handleNavigate = () => {
    if (selectedCategory && selectedLocation) {
      navigate(`/all/${category}/${selectedCategory.value}/${selectedLocation.value}`);
    }
  };

  // List of all Indian states
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Sample top venues by state
  const topVenues = {
    jharkhand: ["Ranchi Lawn", "Hazaribagh Farmhouse", "Jamshedpur Banquet Hall"],
    maharashtra: ["Mumbai Grand Hotel", "Pune Club Lawn", "Nagpur Wedding Resort"],
    delhi: ["Taj Delhi", "Leela Palace", "The Imperial Banquet"],
    karnataka: ["Bangalore Garden Lawn", "Mysore Wedding Hall", "Coorg Farmhouse"],
  };

  // Handle state selection
  const handleStateClick = (state) => {
    if (selectedCategory) {
      setSelectedState(state);
      navigate(`/all/${category}/${selectedCategory.value}/${state.toLowerCase()}`);
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{category}</h1>
        <p className="mt-2">Find the best listings for {category}.</p>

        {/* Selectable Search Bars */}
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          {/* Category Select */}
          <Select
            options={categoryOptions}
            placeholder="Select a category..."
            value={selectedCategory}
            defaultInputValue={category}
            onChange={setSelectedCategory}
            className="w-full md:w-1/2"
          />

          {/* Location Select */}
          <Select
            options={locationOptions}
            placeholder="Select a location..."
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full md:w-1/2"
          />
        </div>

        {/* Navigate Button */}
        <button
          onClick={handleNavigate}
          disabled={!selectedCategory || !selectedLocation}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Search
        </button>
      </div>

      {/* Horizontal Scroll for States */}
      <div className="mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => handleStateClick(state)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory
                ? "bg-gray-200 hover:bg-blue-500 hover:text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedCategory}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Top Venues by Selected State */}
      
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Top Venues in Delhi</h2>
          <ul className="mt-2 space-y-2">
            
             { topVenues.delhi.map((venue, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-lg">
                  {venue}
                </li>
              ))}
           
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Top Venues in Maharashtra</h2>
          <ul className="mt-2 space-y-2">
            
             { topVenues.maharashtra.map((venue, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-lg">
                  {venue}
                </li>
              ))}
           
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Top Venues in Karnataka</h2>
          <ul className="mt-2 space-y-2">
            
             { topVenues.karnataka.map((venue, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-lg">
                  {venue}
                </li>
              ))}
           
          </ul>
        </div>
     
    </>
  );
};

export default Category;
