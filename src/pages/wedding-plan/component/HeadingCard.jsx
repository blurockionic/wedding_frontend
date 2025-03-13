import { motion } from "framer-motion";
const HeadingCard = ({user}) => {
  return (
    <section className=" p-1 w-full flex items-center">
      <motion.div
        className="relative w-full p-2 rounded-2xl overflow-hidden shadow-lg text-white flex flex-col justify-center items-center "
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
            <h1 className="text-4xl font-semibold p-2 capitalize">Hi, {user?.user_name}</h1>
          <h1 className="text-lg font-semibold">Plan your dream wedding with Marriage Vendors ❤️</h1>
        </div>
      </motion.div>
    </section>
  );
};

export default HeadingCard;
