import React from "react";
import user from "../../public/user.png";
import Masonry from "react-masonry-css";

const testimonials = [
  {
    avatar: "https://via.placeholder.com/50",
    name: "Ryan Carniato",
    username: "@RyanCarniato",
    text: "Vite enables amazing possibilities. While built with SolidJS in mind, it scales from simple templates to opinionated starters. We are building an ecosystem on Vite.",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Mark Dalgleish",
    username: "@markdalgleish",
    text: "Vite provides a pluggable development environment, making it a fantastic platform to build frameworks. The community support is incredible too!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Dion Almaer",
    username: "@dalmaer",
    text: "Seeing so many great frameworks built on Vite is exciting. Many will benefit from its performance and flexibility.",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Rich Harris",
    username: "@Rich_Harris",
    text: "Vite has become the United Nations of JavaScript frameworks. I'll be there as a representative of Sveltelandia!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Jason Miller",
    username: "@_developit",
    text: "Just when I think I’ve reached the limits of what Vite can do, it surprises me yet again!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Christoph Nakazawa",
    username: "@cpojer",
    text: "Vite is going to revolutionize the JavaScript ecosystem!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "David Cramer",
    username: "@zeeg",
    text: "Vite is simply mind-blowing. The speed and efficiency are unmatched!",
  },
  {
    avatar: "https://via.placeholder.com/50",
    name: "Nikolaj",
    username: "@lopugit",
    text: "Vite is a game-changer. The developer experience is outstanding!",
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
