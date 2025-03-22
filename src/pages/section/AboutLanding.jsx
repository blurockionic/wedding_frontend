import { Check } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "About Us",
    description:
      "Marriage Vendors is your go-to wedding marketplace, simplifying planning with top venues, vendors, and services. From grand celebrations to intimate gatherings, we bring the best professionals to your fingertips.",
    bgColor: "bg-[#F5F5DC]",
    image: "/about/about_1.png",
    features: [
      "Trusted professionals for a seamless experience.",
      "Find everything from venues to decor & catering.",
      "Compare, choose, and book with confidence.",
    ],
    top: "100px",
  },
  {
    id: 2,
    title: "Why Choose Us?",
    description:
      "We make wedding planning smooth and stress-free by offering the best services under one roof.",
    bgColor: "bg-pink-100",
    image: "/about/about_3.png",
    features: [
      "Trusted & Verified Vendors",
      "Find everything from venues to decor & catering.",
      "Easy browsing, comparing, and booking in one place.",
    ],
    top: "110px",
  },
  {
    id: 3,
    title: "What We Offer to Vendors?",
    description:
      "Maximize your business potential by joining our trusted network of wedding professionals.",
    bgColor: "bg-blue-100",
    image: "/about/about_2.png",
    features: [
      "Connect with thousands of potential clients effortlessly.",
      "Showcase services, receive inquiries, and boost bookings.",
      "Manage listings, reviews, and responses with ease.",
    ],
    top: "120px",
  },
  {
    id: 4,
    title: "What We Offer to Users?",
    description:
      "We help couples find the perfect services for their dream wedding.",
    bgColor: "bg-green-100",
    image: "/about/about_4.png",
    features: [
      "Browse top-rated vendors for every wedding need.",
      "Tailored recommendations for your dream wedding.",
      "Hassle-free reservations with trusted professionals.",
    ],
    top: "130px",
  },
];

const AboutLanding = () => {
  return (
    <div className="mx-auto flex justify-between h-full w-full md:px-20 px-4 mb-20">
      <div className="flex flex-col font-Sansation sticky  md:px-0">
        {sections.map((section) => (
          <section
            key={section.id}
            className={`px-5 py-6 md:px-20 flex items-center justify-center flex-col md:flex-row sticky md:p-10 shadow-lg rounded-xl ${section.bgColor}`}
            style={{ top: section.top }} // Dynamic top value applied here
          >
            {/* Left Side: Text and Features */}
            <div className="w-full md:w-1/2 text-left">
              <h2 className="text-3xl md:text-5xl font-bold">{section.title}</h2>

              {/* Right Side: Image (For Small Screens) */}
              <div className="w-full md:w-1/2 flex justify-center md:hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full max-w-sm md:max-w-md h-auto rounded-lg"
                />
              </div>

              <p className="mt-4 text-gray-700 text-justify">{section.description}</p>

              {/* Feature List */}
              <ul className="mt-6 space-y-3 text-gray-800">
                {section.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm md:text-md lg:text-lg bg-white rounded-full p-1"
                  >
                    <Check className="border-2 border-green-500 text-green-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Image (For Larger Screens) */}
            <div className="w-full md:w-1/2 md:flex justify-center hidden">
              <img
                src={section.image}
                alt={section.title}
                className="w-full max-w-sm md:max-w-md h-auto rounded-lg"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutLanding;
