import React, { useEffect, useState } from "react";
import { img1, img2, img3, img4, img5 ,img6} from "../static/static.js";
import { motion } from "framer-motion";

const images = [img1,img2, img3, img4, img5,img6];

const CircularAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const startAngle = 320;
  const endAngle = 90;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => ((prevIndex + 1) % totalImages));
    }, 5000); 
    return () => clearInterval(interval);
  }, [totalImages]);

  return (
    <div className="transform-gpu scale-125 relative flex items-center justify-center w-[min(100vw,400px)] h-[min(100vw,400px)] rounded-full border-l-[2px] border-primary ">
      {/* Images in Left Arc */}
      {images.map((src, index) => {
        const adjustedIndex =
          (index - currentIndex +( totalImages)) % totalImages;

        const angle =
          startAngle +
          (adjustedIndex * (endAngle - startAngle)) / (totalImages - 1);

        const radian = (angle * Math.PI) / 180;
        const radius = "min(43vw, 200px)";

        return (
          <motion.div
            key={index}
            initial={{ opacity: 1.0 }}
            animate={
                adjustedIndex !== 0
                  ? {
                      position: "absolute",
                      left: `calc(50% + ${radius} * cos(${angle}deg))`,
                      top: `calc(50% + ${radius} * sin(${angle}deg))`,
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      height:"280px",
                      width:"280px",
                    }
              }
            transition={{ duration: 2, ease: "easeInOut" }}
            className=" rounded-full  w-[min(12vw,50px)] h-[min(12vw,50px)]  overflow-hidden  "
          >
            <img
              src={src}
              alt={`Image ${index}`}
              className="object-cover h-full w-full"
            
            />
          </motion.div>
        );
      })}

      

      
    </div>
  );
};

export default CircularAnimation;
