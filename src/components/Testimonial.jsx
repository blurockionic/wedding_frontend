import user from "../../public/user.png";
import Masonry from "react-masonry-css";

const testimonials = [
  {
    avatar: "https://via.placeholder.com/50",
    name: "Priya Sharma",
    username: "@priya_weds",
    text: "MarriageVendors.com made my wedding planning stress-free. From venue selection to catering, everything was seamless and within budget!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Amit Verma",
    username: "@amit_verma",
    text: "Highly recommend MarriageVendors.com for finding the best decorators and photographers. Their service was top-notch and timely.",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Neha Kapoor",
    username: "@neha_kapoor",
    text: "I was able to find the perfect makeup artist and bridal wear through MarriageVendors.com. A one-stop solution for all wedding needs!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Rahul Mehta",
    username: "@rahul_mehta",
    text: "The customer support team was very helpful in guiding me through the best catering options. Our guests loved the food!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Sneha Patil",
    username: "@sneha_patil",
    text: "MarriageVendors.com saved me so much time and effort. The reviews and ratings helped me make informed decisions. Truly amazing!",
  },
];


const Testimonials = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section className="bg-gray-50 text-gray-600 py-10 px-4 md:py-20 md:px-10">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="capitalize text-3xl sm:text-4xl lg:text-5xl mb-10 font-bold text-center leading-tight">
        Explore by the <br />
        <span className="text-pink-500 text-4xl sm:text-5xl lg:text-6xl">world wide web</span>
      </h2>
  
      {/* Responsive Masonry Grid */}
      <Masonry
        breakpointCols={{
          default: 3,
          1024: 2, // 2 columns on tablets
          768: 1,  // 1 column on smaller screens
        }}
        className="my-masonry-grid flex gap-4"
        columnClassName="my-masonry-grid_column p-2"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border my-4 p-6 pt-10 flex flex-col justify-center items-center text-center shadow-md"
          >
            <blockquote className="text-md italic mb-4 text-gray-700">
              "{testimonial.text}"
            </blockquote>
  
            <div className="flex gap-3 items-center w-full">
              <img
                src={user}
                alt={`${testimonial.name} avatar`}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col text-left">
                <strong className="text-gray-800 font-semibold">{testimonial.name}</strong>
                <span className="text-sm text-gray-500">{testimonial.username}</span>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  </section>
  
  );
};

export default Testimonials;
