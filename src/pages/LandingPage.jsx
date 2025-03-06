import Home from "../pages/section/Home";

import LazySection from "../components/LazySection";
import Footer from "./Footer";
import TopServiceSliderSection from "./HomeServiceSliderSection";
import Testimonials from "../components/Testimonial";
import Benefits from "./section/Benefit";
export default function LandingPage() {
  return (
    <div >
      <LazySection id="/" Component={Home} />
      {/* <LazySection id="about" Component={About} /> */}
      {/* <LazySection id="gallery" Component={WeddingEvent} /> */}
      <LazySection
        id="topServiceSliderSection"
        Component={TopServiceSliderSection}
      />
      <LazySection id="benefit" Component={Benefits} />
      <LazySection id="testimonialSection" Component={Testimonials} />

      <LazySection id="footer" Component={Footer} />
    </div>
  );
}
