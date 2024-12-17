import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import StyledBtn from "../../components/StyledBtn";
import { useNavigate } from "react-router-dom";


export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1000, // Duration of the animation
    });
  }, []);

  const handlenavigate=()=>{
    navigate("/services");
  }

  return (
    <div
      className="h-screen relative -pt-10 flex items-center object-cover justify-start"
      style={{
        backgroundImage: `url('/herobg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Flower Decoration */}
      <div
        className="absolute left-0 w-24 h-auto z-20 transform -translate-y-1/2"
        data-aos="zoom-in"
        data-aos-delay="1000"
        data-aos-once="true"
      >
        <img
          alt="Flower Decoration"
          src="/flowerbg 1.png"
          className="opacity-90"
        />
      </div>

      {/* Content Section */}
      <div className="p-12 md:pl-24 space-y-6 rounded-lg z-40">
        {/* Welcome Text */}
        <p
          className="text-lg text-sageGreen-dark leading-tight"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-once="true"
        >
          — Hello and Welcome,
        </p>

        {/* Heading */}
        <h1
          className="dp text-5xl md:text-7xl font-bold text-black dark:text-white leading-tight"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-once="true"
        >
          Plan Your <br />
          <span> Dream Wedding </span>
          <br />
          With Us
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg text-sageGreen-dark leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-once="true"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus{" "}
          <br />
          placerat velit. Donec in porttitor elit. Suspendisse accumsan iaculis
          tincidunt.
        </p>

        {/* Action Button */}
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="w-fit"
          data-aos-once="true"
          onClick={handlenavigate}
        >
          <StyledBtn  title={"Start Planning"} />
        </div>
      </div>
    </div>
  );
}
