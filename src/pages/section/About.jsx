import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StyledBtn from "../../components/StyledBtn";

export default function About() {
  const sliderImages = ["/sl1.png", "/sl1.png", "/sl1.png"];

  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration (in ms)
     
    });
  }, []);

  return (
    <div className="container overflow-hidden mx-auto relative pt-20  md:p-8">
      {/* Background Flower Image */}
      <img
        src="/about flower.png"
        alt="flower"
        className="absolute hidden md:block rotate-40 -z-90 top-0 lg:-top-20 sm:h-[40vh] md:h-[60vh] right-10 md:right-[4%] lg:right-[15%] object-cover"
        data-aos="fade-up"
        data-aos-delay="300"
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 relative">
        
        {/* Left Section (Card) */}
        <div
          className="customShadow relative bg-white translate-x-10 flex flex-col gap-5 py-20 px-5 w-full lg:w-1/3 z-20"
          data-aos="fade-right"
          data-aos-delay="500"
        >
          <div>
            <img src="/t.png" alt="About Blurock" className="rounded-xl" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold py-4 tracking-wider text-black text-start lg:text-left">
            About Our <br /> Weed Planner
          </h1>
          <p className="text-gray-600 w-full lg:w-3/4 leading-relaxed text-center lg:text-left">
            Welcome to Blurock! This is where you can learn more about our
            story, mission, and values. We're committed to delivering quality
            and innovation in everything we do.
          </p>
          <div
            className="w-fit mt-6 flex justify-center lg:justify-start"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <StyledBtn title={"see more"} />
          </div>
        </div>

        {/* Right Section (Slider) */}
        <div
          className="relative -translate-x-10 w-full lg:w-1/2"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <div className="pb-24 bg-[#F9EBDD] relative z-0">
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination", // Custom class for pagination container
              }}
              spaceBetween={20}
              slidesPerView={1}
              className="h-[300px] w-full"
            >
              {sliderImages.map((image, index) => (
                <SwiperSlide key={index} className="h-full">
                  <div className="w-full h-full bg-white">
                    {/* Top Half (White Background) */}
                    <div className="bg-white"></div>
                    {/* Bottom Half (Dusty Rose Background) */}
                    <div className="h-full bg-dustyRose-light-40">
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Custom Pagination Outside the Slider */}
          <div className="custom-pagination gap-2 flex justify-center -translate-y-10 mt-4"></div>
        </div>
      </div>
    </div>
  );
}
