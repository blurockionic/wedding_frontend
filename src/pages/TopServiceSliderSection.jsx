import React from "react";
import LandingPageSlider from "../components/LandingPageSlider";
import { useGetServicesQuery } from "../redux/serviceSlice";

export default function TopServiceSliderSection() {
  // Filters for photography services
  const photographyFilters = {
    service_type: "photography",
  };

  // Filters for catering services
  const cateringFilters = {
    service_type: "catering",
  };

  // Fetch photography services
  const {
    data: photoData,
    error: photoError,
    isLoading: isPhotoLoading,
  } = useGetServicesQuery(photographyFilters);

  // Fetch catering services
  const {
    data: cateringData,
    error: cateringError,
    isLoading: isCateringLoading,
  } = useGetServicesQuery(cateringFilters);

  // Handle loading state
  if (isPhotoLoading || isCateringLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (photoError || cateringError) {
    return (
      <div>
        Error loading services:{" "}
        {photoError?.message || cateringError?.message}
      </div>
    );
  }

  return (
    <div className=" w-[5xl] mx-auto bg-slate-100 ">
    
      {photoData && (
        <LandingPageSlider
          title="Top photography services"
          services={photoData}
        />
      )}

      
      {cateringData && (
        <LandingPageSlider
          title="Top catering services"
          services={cateringData}
        />
      )}
    </div>
  );
}
