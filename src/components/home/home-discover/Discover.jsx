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
      filter: { limit: 4, page: 1, sortBy: "rating", order: "desc" },
    },
    {
      key: "mostViewed",
      title: "Most Viewed Services",
      subtitle: "Assured quality services",
      bgColor: "#E9F1DF",
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
        sortBy: "rating",
        order: "desc",
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
        sortBy: "rating",
        order: "desc",
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
    className="w-[90%] my-10 rounded-2xl px-2 lg:px-10 mx-auto pt-10 "
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex justify-between">
      <CustomText
        as="h2"
        text={title}
        className="text-4xl font-bold   capitalize"
      />

      <button className="py-2 px-4 border-2  border-white cursor-pointer capitalize">explore more </button>
    </div>

    <div className="relative flex md:px-0 py-10 lg:py-10">{children}</div>
  </div>
);

export default Discover;
