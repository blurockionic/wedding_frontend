import React, { useRef, useState, useEffect } from "react";
import CustomText from "../../global/text/CustomText";
import {
  useGetMostViewdServicesQuery,
  useGetServicesQuery,
} from "../../../redux/serviceSlice";
import ServiceList from "../../serviceList/ServiceList";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Discover = () => {
  const serviceFilters = [
    {
      key: "topRated",
      title: "Most Rated Wedding Vendors",
      subtitle: "Plan your wedding with ease",
      bgColor: "#DFE6F1",
      filter: { limit: 20, page: 1, sort_by: "rating", sort_order: "desc" },
    },
    {
      key: "mostViewed",
      title: "Most Viewed Services",
      subtitle: "Assured quality services",
      bgColor: "#E9F1DF",
      filter: { limit: 20, page: 1, sort_by: "rating", sort_order: "desc" },
      queryHook: useGetMostViewdServicesQuery,
    },
    {
      key: "topCaterer",
      title: "Top Wedding Caterer",
      subtitle: "Find top wedding Caterer in your city",
      bgColor: "#F1DFE4",
      filter: {
        limit: 20,
        page: 1,
        service_type: "caterers",
        sort_by: "rating",
        sort_order: "desc",
      },
    },
    {
      key: "topPhotographers",
      title: "Top Wedding Photographers",
      subtitle: "Find top wedding Photographers in your city",
      bgColor: "#D4F6FF",
      filter: {
        limit: 20,
        page: 1,
        service_type: "wedding Photographers",
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
        limit: 20,
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
            services={data?.ServiceResult}
          />
        ) : null;
      })}
    </div>
  );
};

const Section = ({ title, services, bgColor }) => {
  const scrollContainer = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 800;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();

    const scrollElement = scrollContainer.current;
    const updateOnResize = () => handleScroll();

    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", updateOnResize); // Listen for screen size changes
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", updateOnResize);
    };
  }, []);
  return (
    <div
      className={`w-[90%] my-10 rounded-2xl px-5 mx-auto md:px-4 lg:px-10  pt-4 md:pt-10 transition-opacity`}
      style={{ backgroundColor: bgColor, opacity: services.length ? 1 : 0.5 }}
    >
      {/* Heading & Buttons Row */}
      <div className="py-0 md:pb-4 flex flex-col md:flex-row justify-between ">
        <CustomText
          as="h2"
          text={title}
          className="text-2xl  md:text-4xl font-bold capitalize"
        />
        <div className="self-end flex py-5 gap-2">
          <button
            className={`bg-white p-2 rounded-full shadow-md ${
              isAtStart ? "opacity-50 " : ""
            }`}
            onClick={() => scroll("left")}
            disabled={isAtStart}
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className={`bg-white p-2 rounded-full shadow-md ${
              isAtEnd ? "opacity-50 " : ""
            }`}
            onClick={() => scroll("right")}
            disabled={isAtEnd}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Scrollable Services List */}
      <div
        ref={scrollContainer}
        className="relative  mx-auto flex overflow-x-auto scroll-smooth hide-scrollbar pb-5 md:pb-10 gap-4"
      >
        <ServiceList services={services} />
      </div>
    </div>
  );
};

export default Discover;
