import user from "../../public/user.png";
import harshmodi from "../../public/feedback/feed1.jpeg"
import girraj from "../../public/feedback/feed2.jpeg"
import harshit from "../../public/feedback/feed3.jpeg"
import feed4 from "../../public/feedback/feed4.jpeg"
import feed5 from "../../public/feedback/feed5.jpeg"

const testimonials = [
  {
    avatar: harshmodi,
    name: "Harsh Modi",
    username: "@harsh_modi",
    text: "MarriageVendors.com made my wedding planning stress-free. From venue selection to catering, everything was seamless and within budget!",
  },
  {
    avatar: girraj,
    name: "Girraj Baghel",
    username: "@girraj_baghel",
    text: "Highly recommend MarriageVendors.com for finding the best decorators and photographers. Their service was top-notch and timely.",
  },
  {
    avatar: harshit,
    name: "Harshit Sahu",
    username: "@harshit_sahu",
    text: "I was able to find the perfect makeup artist and bridal wear through MarriageVendors.com. A one-stop solution for all wedding needs!",
  },
  {
    avatar: feed4,
    name: "Santosh kr. Gupta",
    username: "@santash_kr_gupta",
    text: "The customer support team was very helpful in guiding me through the best catering options. Our guests loved the food!",
  },
  {
    avatar: feed5,
    name: "Jay Tiwari",
    username: "@jay_tiwari",
    text: "MarriageVendors.com saved me so much time and effort. The reviews and ratings helped me make informed decisions. Truly amazing!",
  },
];

const Testimonials = () => {
  return (
    <section className="text-gray-600 py-10 md:py-20 bg-red-50 px-4 md:px-20">
      <div className="w-full">
        <h2 className="capitalize text-3xl sm:text-4xl lg:text-5xl mb-10 font-bold text-center leading-tight">
          Explore by the <br />
          <span className="text-pink-500 text-4xl sm:text-5xl lg:text-6xl">world wide web</span>
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                  src={testimonial.avatar}
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
