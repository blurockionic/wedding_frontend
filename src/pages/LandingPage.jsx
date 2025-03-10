import Home from "../pages/section/Home";
import LazySection from "../components/LazySection";
import Footer from "./Footer";
import Testimonials from "../components/Testimonial";
import Benefits from "./section/Benefit";
import ServiceCategoriesPage from "./service-category/ServiceCategoriesPage";
import Discover from "../components/home/home-discover/Discover";
import AboutLanding from "./section/AboutLanding";

export default function LandingPage() {
  return (
    <div>
      <LazySection id="/" Component={Home} />
      <LazySection id="aboutus" Component={AboutLanding} />
      <LazySection id="serviceCategories" Component={ServiceCategoriesPage} />
      <LazySection id="discover" Component={Discover} />
      <LazySection id="benefit" Component={Benefits} />
      <LazySection id="testimonialSection" Component={Testimonials} />
      <LazySection id="footer" Component={Footer} />
    </div>
  );
}
