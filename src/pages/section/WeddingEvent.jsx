import React, { useEffect } from "react";
import StyledBtn from "../../components/StyledBtn";
import Aos from "aos";
import "aos/dist/aos.css";

function WeddingEvent() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Duration of the animation in milliseconds
    
    });
  }, []);

  return (
    <div className="bg-[#F8E8D8] p-10 flex relative">
      <div className="relative p-5 mx-auto justify-center md:w-1/3">
        {/* Outer Box with the Red Box */}
        <div className="absolute top-0 bottom-10 left-10 right-0 border-4 border-[#CF7745]"></div>

        {/* Black Box Container */}
        <div className="border-4 top-10 bottom-0 left-0 right-10 border-black absolute inset-0"></div>

        {/* Gray Box with the Form */}
        <div className="bg-gray-100 relative z-10 w-full h-full overflow-hidden customShadow flex items-center justify-center">
          <img
            src="/Mask group.png"
            className="w-full transform scale-110 h-full object-cover"
            alt="Mask group"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative mx-auto px-4 md:w-1/2">
        <div>
          <img
            src="/Bouquet.png"
            alt="Wedding Bouquet"
            className="rounded-xl"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          <h1 className="text-5xl leading-[50px] font-bold text-start mb-8 capitalize" data-aos="fade-down">
            We're Dedicated to Join <br />
            Your Journey for the Best <br /> Wedding Event
          </h1>

          {/* Stats Section */}
          <div className="flex justify-start items-center relative z-50 py-10 text-center gap-8 text-dustyRose-light-60">
            {[
              { title: "350+", desc: "Wedding Events", animate: "fade-right" },
              { title: "150+", desc: "Decorations", animate: "fade-up" },
              { title: "250+", desc: "Locations", animate: "fade-left" },
            ].map((item, index) => (
              <div
                key={index}
                data-aos={item.animate}
                data-aos-delay="500"
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Button Section */}
          <div className="w-fit" data-aos="fade-up" data-aos-delay="600">
            <StyledBtn title={"See More"} />
          </div>
        </div>
      </div>

      {/* Flower Image (Decorative) */}
      <img
        src="/about flower.png"
        alt="Flower Decoration"
        className="absolute rotate-40 z-20 h-2/3 right-0 bottom-10"
        data-aos="fade-left"
        data-aos-delay="700"
      />
    </div>
  );
}

export default WeddingEvent;
