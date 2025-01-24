import Home from "../pages/section/Home";
import About from "../pages/section/About";

import Contact from "./Contact";

import LazySection from "../components/LazySection";
import Footer from "./Footer";
import WeddingEvent from "./section/WeddingEvent";
import ServicesPage from "./ServicePage";
import TopServiceSliderSection from "./HomeServiceSliderSection";

export default function LandingPage() {
  return (
    <div>
      <LazySection id="/" Component={Home} />
      {/* <LazySection id="about" Component={About} /> */}
      {/* <LazySection id="gallery" Component={WeddingEvent} /> */}
      <LazySection id="topServiceSliderSection" Component={TopServiceSliderSection} />
      <LazySection id="contact" Component={Contact} />
     
      <LazySection id="footer" Component={Footer} />
     
    </div>
  );
}
