import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import bg from "../../../../public/template/background.png";
import fr from "../../../../public/template/flower_right.svg";
import flower_top_r from "../../../../public/template/flower_top_r.png";
import flower_bottom_r from "../../../../public/template/flower_bottom_r.png";
import flower_top_l from "../../../../public/template/flower_top_l.png";
import flower_b_l from "../../../../public/template/flower_b_l.png";

export const Introduction = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-start overflow-hidden  px-4 md:px-16 py-10 ">
      {/* <h2 className="relative z-0 text-[10vw] font-black text-neutral-800 md:text-[10vw]">
        Invitation<span className="text-primary">.</span>
      </h2>
      <h5 className="relative z-0 ">
        by <span className="text-primary">marriagevendors.com</span>
      </h5> */}
      <div className="w-full relative z-0  text-center lg:text-left space-y-8 md:py-10">
        <div className="space-y-3">
          <span className="text-pink-600 font-semibold tracking-wider text-sm">
            MARRIAGE VENDORS INVITATIONS
          </span>
          <h1 className="font-['Montserrat'] text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Create Beautiful Memories
          </h1>

          <h2 className="font-['Montserrat'] text-3xl lg:text-4xl text-gray-700 font-light">
            One Invitation at a Time
          </h2>

          <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            Discover exquisite designs crafted to make your special day
            unforgettable. Each template tells a unique story.
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-8 pt-6 px-4 md:px-0">
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-gray-900">
              1000+
            </div>
            <div className="text-gray-600">Templates</div>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-gray-900">
              24/7
            </div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-gray-900">
              4.9
            </div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center z-50 w-full md:w-52 mt-10">
        <Link to="/browse">
          <span className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:from-pink-600 hover:to-rose-600">
            Browse Templates
          </span>
        </Link>
      </div>
      <span className="mt-10 text-xs w-auto text-gray-500 italic px-2 py-1  rounded-md">
        Hint: Drag elements to design invitation card
      </span>

      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src={bg}
        alt="Example image"
        rotate="0deg"
        top="7%"
        left="68%"
        className="w-36 md:w-96 bg-neutral-300 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={fr}
        alt="Example image"
        rotate="0deg"
        top="20%"
        left="-1%"
        className="w-10 md:w-20 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={fr}
        alt="Example image"
        rotate="180deg"
        top="40%"
        left="29%"
        className="w-10 md:w-20 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={flower_top_r}
        alt="Example image"
        rotate="0deg"
        top="0%"
        left="96%"
        className="w-48 md:w-16 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={flower_bottom_r}
        alt="Example image"
        rotate="0deg"
        top="78%"
        left="90%"
        className="w-40 md:w-40 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={flower_top_l}
        alt="Example image"
        rotate="0deg"
        top="0%"
        left="0%"
        className="w-40 md:w-40 hidden md:block"
      />
      <Card
        containerRef={containerRef}
        // src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={flower_b_l}
        alt="Example image"
        rotate="0deg"
        top="70%"
        left="0%"
        className="w-40 md:w-16 hidden md:block"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge("drag-elements absolute w-48 p-1 pb-4", className)}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
