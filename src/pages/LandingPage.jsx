import Home from "../pages/section/Home";
import LazySection from "../components/LazySection";
import Footer from "./Footer";
import Testimonials from "../components/Testimonial";
import Benefits from "./section/Benefit";
import ServiceCategoriesPage from "./service-category/ServiceCategoriesPage";
import Discover from "../components/home/home-discover/Discover";
import AboutLanding from "./section/AboutLanding";
import BrowseSuggestion from "../components/browse-suggestion/BrowseSuggestion";
import DestinationWedding from "../components/destination-wedding/DestinationWedding";
import CompleteSolution from "../components/ads/CompleteSolution";
import BlogSection from "../components/home/BlogSection";

import React, { useEffect, useState } from "react";
import CityManagerPopup from "./CityManeger";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [managerData, setManagerData] = useState(null);

  const userCity = useSelector((state) => state?.auth?.user?.wedding_location);

  // const fetchCityManager = async (city) => {
  //   try {
  //     const response = await fetch(
  //       `/api/city-manager?city=${encodeURIComponent(city)}`
  //     );
  //     if (!response.ok) throw new Error("Manager not found");
  //     const data = await response.json();
  //     setManagerData(data);
  //     setShowPopup(true);
  //   } catch (err) {
  //     console.error("Failed to fetch city manager:", err);
  //   }
  // };

  const fetchCityManager = async (city) => {
    try {
      // Simulate a delay like a real fetch
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      // Mocked manager data
      const mockedData = {
        name: "Aman Sharma",
        city: city,
        phone: "9876543210",
        email: "aman.citymanager@example.com",
        commissionRate: "10%",
        profilePicture: "https://via.placeholder.com/100", // or local image path
      };
  
      setManagerData(mockedData);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to fetch city manager:", err);
    }
  };
  

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn && userCity) {
      fetchCityManager(userCity);
      sessionStorage.removeItem("justLoggedIn");
    }
  }, [userCity]);

  return (
    <div>
      <LazySection id="/" Component={Home} />
      <LazySection id="suggestion" Component={BrowseSuggestion} />
      <LazySection id="aboutus" Component={AboutLanding} />
      <LazySection id="ads" Component={CompleteSolution} />
      <LazySection id="serviceCategories" Component={ServiceCategoriesPage} />
      <LazySection id="discover" Component={Discover} />
      <LazySection id="blog" Component={BlogSection} />
      <LazySection id="benefit" Component={Benefits} />
      <LazySection id="destinationwedding" Component={DestinationWedding} />
      <LazySection id="testimonialSection" Component={Testimonials} />
      <LazySection id="footer" Component={Footer} />

      {userCity && (
        <div>
          <CityManagerPopup
            show={showPopup}
            onClose={() => setShowPopup(false)}
            manager={managerData}
          />
        </div>
      )}
    </div>
  );
}
