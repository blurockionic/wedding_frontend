import React from "react";
import images from "../../../public/image 5.png";
const BenefitsData = [
  {
    title: "To-do List",
    description:
      "Stay organized with a step-by-step wedding checklist, ensuring nothing is overlooked for your big day.",
    link: "#",
    images,
  },
  {
    title: "Event Planning Tool",
    description:
      "Efficiently plan and manage every detail of your wedding event with our comprehensive planning tool.",
    link: "#",
    images,
  },
  {
    title: "Budget Planner",
    description:
      "Keep your wedding expenses in check with our user-friendly budget planner.",
    link: "#",
    images,
  },
  {
    title: "Wishlist",
    description:
      "Create and share your wedding wishlist with guests, ensuring you receive gifts you truly desire.",
    link: "#",
    images,
  },
];

const Benefits = () => {
  return (
    <section className=" bg-gray-100 md:p-20 p-4">
      <div className="text-center ">
        <h1 className="lg:text-5xl text-3xl mb-20  font-bold  text-gray-600">
          Empowering User with Extra <br />{" "}
          <span className="text-4xl lg:text-6xl text-pink-500 ">
            Benefits & Opportunities
          </span>
        </h1>
      </div>

      <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {BenefitsData.map((benefit, index) => (
          <div
            key={index}
            className=" bg-white gap-5 rounded-lg shadow-md p-6 flex md:flex-row  flex-col-reverse   "
          >
            <div className="">
              <h2 className="text-2xl capitalize font-bold mb-4">
                {benefit.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 hover:line-clamp-none">
                {benefit.description}
              </p>
            </div>
            <div className="min-w-[50%]">
              <img
                src={benefit.images}
                alt={benefit.title}
                className="w-full "
              />
            </div>
          </div>
        ))}
      </div>

      <section className="py-10 flex justify-center">
  <div className="overflow-x-auto w-full">
    <table className="w-full border-separate border-spacing-10 shadow-md rounded-xl">
      <tbody>
        {/* Row 1 */}
        <tr>
          <td
            rowSpan={2} 
            className="py-3 px-6 h-40 w-40 md:h-[500px] md:w-[40%] border border-gray-300 text-center bg-[#C3B2E7] rounded-xl  
            sm:table-cell "
          >
            Row 1, Col 1
          </td>
          <td
            colSpan={2}
            className="py-3 px-6 border border-gray-300 text-center  rounded-xl bg-[##F682A5]"
          >
            Row 1, Col 2
          </td>
        </tr>

        {/* Row 2 */}
        <tr className="">
          <td className="py-3 px-6 border border-gray-300 text-center rounded-xl ">
            Row 2, Col 1
          </td>
          <td className="py-3 px-6 border border-gray-300 text-center rounded-xl ">
            Row 2, Col 2
          </td>
        </tr>

        {/* Row 3 */}
        <tr className="">
          <td colSpan={2}
            className="py-3 px-6 border border-gray-300 text-center rounded-xl "
          >
            Row 3, Col 1
          </td>
          <td className="py-3 px-6 border border-gray-300 text-center rounded-xl ">
            Row 3, Col 2
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

    </section>
  );
};

export default Benefits;
