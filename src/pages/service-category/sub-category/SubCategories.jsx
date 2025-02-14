import { useParams, useNavigate, Link } from "react-router-dom";
import {  State } from "country-state-city";
import Footer from "../../Footer";
import ServiceCard from "../component/ServiceCard";

import { useGetServicesQuery } from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import ServiceList from "../../../components/ServiceList";

const SubCategories = () => {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const location = useSelector(
    (state) => state?.auth?.user?.wedding_location || state?.auth?.user?.city
  );

  const filters = {
    service_type: subCategory || "",
    location
  };

  const { data, error, isLoading } = useGetServicesQuery(filters);

  // const indianStates = State.getStatesOfCountry("IN").map((state) => state.name);

  //filter out the sevice availabel  state
  // const availableStates = [...new Set(data?.ServiceResult.map(service => service?.vendor?.state))];

  const stateServiceCount = data?.ServiceResult.reduce((acc, service) => {
    const state = service?.vendor?.state;
    if (state) {
      acc[state] = (acc[state] || 0) + 1;
    }
    return acc;
  }, {});

  console.log(stateServiceCount)
  
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

 
  return (
    <>
      {/* navigation */}
      <span className="px-16 text-sm">
        <Link to={`/all`}>Wedding</Link> &gt;
        <Link to={`/all/${category}`}>{category}</Link> &gt;
        <Link to={`/all/${category}/${subCategory}`}>{subCategory}</Link>
      </span>
      <h1 className="px-16 text-2xl font-semibold">Search for {subCategory}</h1>
     
      {/* Horizontal Scroll for States */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${subCategory} by region `}</h2>
      </div>

      <div className="px-16 mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {Object.entries(stateServiceCount || {}).map(([state, count]) => (
          <div key={state} className="flex flex-col items-center gap-2">
            <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
            <p onClick={() => handleStateClick(state)} className="px-4 py-2 text-md rounded-full transition cursor-pointer capitalize">{state}</p>
            <span className="text-xs">{`(${count}) ${subCategory}`}</span>
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
