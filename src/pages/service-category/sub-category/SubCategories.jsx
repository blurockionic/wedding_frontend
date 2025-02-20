import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../Footer";
// import ServiceCard from "../component/ServiceCard";

import { useGetServicesQuery } from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import ServiceList from "../../../components/ServiceList";

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

  // console.log(data)

  //top hotel in dehli
  const topInDehli = data?.ServiceResult.filter(
    (detail) => detail.state === "delhi"
  ).sort((a, b) => b.rating - a.rating);

  // top in your city
  const topInYourLocation = data?.ServiceResult.filter(
    (detail) => detail.state === location
  ).sort((a, b) => b.rating - a.rating);

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
        {Object.keys(stateServiceCount || {}).length > 0 ? (
          Object.entries(stateServiceCount).map(([state, count]) => (
            <div key={state} className="flex flex-col items-center gap-2">
              <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
              <p
                onClick={() => handleStateClick(state)}
                className="px-4 py-2 text-md rounded-full transition cursor-pointer capitalize"
              >
                {state}
              </p>
              <span className="text-xs">{`(${count}) ${subCategory}`}</span>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-foreground text-8xl">No search found.</p>
          </div>
        )}
      </div>

      {/* Top Venues by Selected State */}

      {/* {topInYourLocation?.length > 0 && (
        <div className="mt-6 px-16 py-4">
          <h2 className="text-xl font-semibold">{`Top ${subCategory} in ${location}`}</h2>
          <div>
            <ServiceList services={topInYourLocation || []} />
          </div>
        </div>
      )} */}

      {/* <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${subCategory} in Delhi`}</h2>
        <div>
          <ServiceList services={topInDehli || []} />
        </div>
      </div> */}

      {/* <div className="mt-6 px-16 py-4">
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
      </div> */}

      {/* <div className="mt-6 px-16 py-4">
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
      </div> */}

      <Footer />
    </>
  );
};

export default SubCategories;
