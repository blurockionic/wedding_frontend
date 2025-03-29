import { useEffect } from "react";
import { motion } from "framer-motion";
import { motionlogo } from "../../static/static";

// Icon components (SVGs)
const JoyIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-16 h-16 text-yellow-400 animate-bounce"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4 9a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4zm8.485 6.071a7 7 0 01-8.97 0 1 1 0 011.243-1.554 5 5 0 006.484 0 1 1 0 011.243 1.554z" />
  </motion.svg>
);

const FloatingIcon = ({ icon, x, y }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: [20, -10, 20], scale: [0.8, 1, 0.8] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    {icon}
  </motion.div>
);

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const celebrationIcons = [
    { icon: "🎉", x: 10, y: 20 },
    { icon: "💖", x: 30, y: 10 },
    { icon: "🌸", x: 50, y: 15 },
    { icon: "💛", x: 70, y: 25 },
    { icon: "🎊", x: 90, y: 18 },
    { icon: "✨", x: 20, y: 40 },
    { icon: "🎈", x: 80, y: 35 },
    { icon: "💙", x: 60, y: 90 },
    { icon: "💚", x: 40, y: 80 },
    { icon: "💜", x: 15, y: 75 },
  ];

  // Rainbow-colored text effect
  const rainbowColors = [
    "#E63946", // Red
    "#F4A261", // Orange
    "#E9C46A", // Yellow
    "#2A9D8F", // Teal Green
    "#264653", // Dark Blue
    "#6A0572", // Purple
    "#D81159", // Pinkish Red
  ];

  const welcomeText = "Welcome to marriagevendors.com";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-2xl font-bold overflow-hidden h-screen">
      <img src={motionlogo} alt="loader" className="w-20 h-20" />

      {/* Rainbow-colored animated text */}
      <h1 className="flex space-x-1">
        {welcomeText.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ color: rainbowColors[index % rainbowColors.length] }} // ✅ Apply color dynamically
            className="animate-pulse text-lg md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>



      {celebrationIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} x={item.x} y={item.y} />
      ))}
    </div>
  );
};

export default SplashScreen;
