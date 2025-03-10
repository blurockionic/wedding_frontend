import React from "react";
import CustomText from "../../global/text/CustomText";
import {
  useGetMostViewdServicesQuery,
  useGetServicesQuery,
} from "../../../redux/serviceSlice";
import ServiceList from "../../serviceList/ServiceList";
import { Button } from "react-scroll";

const Discover = () => {
  // Define filter configurations for different sections
  const serviceFilters = [
    {
      key: "topRated",
      title: "Most Rated Wedding Vendors",
      subtitle: "Plan your wedding with ease",
      bgColor: "#DFE6F1",
      filter: { limit: 4, page: 1, sort_by: "rating", sort_order: "desc" },
    },
    {
      key: "mostViewed",
      title: "Most Viewed Services",
      subtitle: "Assured quality services",
      bgColor: "#E9F1DF",
      filter: { limit: 4, page: 1, sort_by: "rating", sort_order: "desc" },
      queryHook: useGetMostViewdServicesQuery,
    },
    {
      key: "topCaterer",
      title: "Top Wedding Caterer",
      subtitle: "Find top wedding Caterer in your city",
      bgColor: "#F1DFE4",
      filter: {
        limit: 4,
        page: 1,
        service_type: "caterers",
        sort_by: "rating",
        sort_order: "desc",
      },
    },
    {
      key: "topDj",
      title: "Top DJ Services",
      subtitle: "Find top DJ services in your city",
      bgColor: "#DFF1F1",
      filter: {
        limit: 4,
        page: 1,
        service_type: "Wedding DJ",
        sort_by: "rating",
        sort_order: "desc",
      },
    },
  ];

  // Fetch data dynamically
  const fetchedData = serviceFilters.map(({ filter, queryHook }) =>
    queryHook ? queryHook() : useGetServicesQuery(filter)
  );

  return (
    <div className="my-10">
      {serviceFilters.map(({ key, title, subtitle, bgColor }, index) => {
        const data = fetchedData[index]?.data;

        return data?.ServiceResult?.length > 0 ? (
          <Section
            key={key}
            title={title}
            subtitle={subtitle}
            bgColor={bgColor}
          >
            <ServiceList services={data.ServiceResult} />
          </Section>
        ) : null;
      })}
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, subtitle, children, bgColor }) => (
  <div
    className="w-[90%] my-10 rounded-2xl px-1 md:px-4 lg:px-10 mx-auto pt-10"
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex justify-center md:justify-between">
      <CustomText
        as="h2"
        text={title}
        className="text-3xl md:text-4xl font-bold text-center md:text-start capitalize"
      />
      <button className="hidden md:block py-2 px-4 border-2 border-white cursor-pointer capitalize rounded-md">
        explore more
      </button>
    </div>

    {/* Centering children on mobile */}
    <div className="relative flex flex-col items-center md:items-start mx-auto md:px-0 py-10 lg:py-10">
      {children}
    </div>
    <div className="flex justify-center items-center py-5 md:py-0">
      <button className="block md:hidden py-2 px-20 border-2 border-white cursor-pointer capitalize rounded-md">
        explore more
      </button>
    </div>
  </div>
);

export default Discover;
