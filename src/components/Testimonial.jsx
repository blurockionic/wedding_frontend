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
    <section className="bg-gray-50 text-gray-600 py-20 px-10">
      <h2 className="capitalize lg:text-5xl text-3xl  mb-10 font-bold text-center">
        Explore by the <br />
        <span className="text-pink-500 text-4xl lg:text-6xl">world wide web.</span>
      </h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid  "
        columnClassName="my-masonry-grid_column p-2"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border  my-4 p-4 pt-10 flex flex-col items-center text-center"
          >
            <blockquote className="text-md italic mb-4 text-gray-700">
              "{testimonial.text}"
            </blockquote>

            <div className="flex gap-2 pt-3 text-start justify-start">
              <img
                src={user}
                alt={`${testimonial.name} avatar`}
                className="w-12 h-12 rounded-full mb-2"
              />
              <div className="flex flex-col">
                <strong className="text-gray-500 font-semibold">
                  {testimonial.name}
                </strong>
                <span className="text-sm text-left">
                  {testimonial.username}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default Testimonials;
