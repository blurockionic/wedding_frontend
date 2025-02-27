import { motion } from "framer-motion";

const HeadingCard = () => {
  return (
    <section className=" w-full flex items-center">
      <motion.div
        className="relative w-full p-8 rounded-2xl overflow-hidden shadow-lg text-white flex flex-col justify-center items-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center ">
            <h1 className="text-5xl p-2">Hi, Biruly</h1>
          <h1 className="text-2xl font-bold">Plan your dream wedding with family ❤️</h1>
          <p className="text-sm opacity-80">Welcome to the wedding planning tool!</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeadingCard;
