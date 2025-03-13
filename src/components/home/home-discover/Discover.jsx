import React from "react";

import CustomText from "../../global/text/CustomText";

import {
  useGetMostViewdServicesQuery,
  useGetServicesQuery,
} from "../../../redux/serviceSlice";
import TopRated from "../../mostBookedService/MostBookedService";
import FeatureService from "../../featuredservices/FeatureService";

import TopVendors from "../../vendors/TopVendors";
import TopBrides from "../../brides/TopBrides";
import TopGrooms from "../../grooms/TopGrooms";
const Discover = () => {
  // Filters for different sections
  const TopRatedFilter = { limit: 4, page: 1, sortBy: "rating", order: "desc" };
  const topCaterer = {
    limit: 4,
    page: 1,
    service_type: "caterers",
    sortBy: "rating",
    order: "desc",
  };
  const topBridesFilters = {
    limit: 4,
    page: 1,
    service_type: "brides",
    sortBy: "rating",
    order: "desc",
  };
  const topDJFilters = {
    limit: 4,
    page: 1,
    service_type: "Wedding DJ",
    sortBy: "rating",
    order: "desc",
  };

  // Fetching data separately
  const { data: topRatededData } = useGetServicesQuery(TopRatedFilter);
  const { data: topCatererData } = useGetServicesQuery(topCaterer);
  const { data: topDjData } = useGetServicesQuery(topDJFilters);
  const { data: mostViewed } = useGetMostViewdServicesQuery();

  console.log(topRatededData)

  return (
    <>
      {/* Most Booked Services */}
      <Section
        title="Most Rated Wedding Vendors"
        subtitle="Plan your wedding with ease"
      >
        <TopRated services={topRatededData?.ServiceResult || []} />
      </Section>

      {/* Featured Services */}
      <Section title="Most Viewed Services" subtitle="Assured quality services">
        <FeatureService services={mostViewed?.ServiceResult || []} />
      </Section>

      {/* Top Wedding Vendors */}
      <Section
        title="Top Wedding Caterer"
        subtitle="Find top wedding Caterer in your city"
      >
        <TopVendors services={topCatererData?.ServiceResult || []} />
      </Section>
      {/* Grooms Services */}
      <Section
        title="Top DJ Services"
        subtitle="Find top DJ services in your city"
      >
        <TopGrooms services={topDjData?.ServiceResult || []} />
      </Section>
    </>
  );
};

// Reusable Section Component for Cleaner Code
const Section = ({ title, subtitle, children }) => (
  <div className="max-w-7xl px-2 lg:px-10 mx-auto py-10">
    <CustomText
      as="h1"
      text={title}
      className="text-3xl font-bold capitalize"
    />
    <CustomText as="p" text={subtitle} className="text-xl py-1" />
    <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
      {children}
    </div>
  </div>
);

export default Discover;
