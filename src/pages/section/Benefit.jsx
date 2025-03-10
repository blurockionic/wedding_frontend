// import React from "react";
// import images from "../../../public/image 5.png";
// const BenefitsData = [
//   {
//     title: "To-do List",
//     description:
//       "Stay organized with a step-by-step wedding checklist, ensuring nothing is overlooked for your big day.",
//     link: "#",
//     images,
//   },
//   {
//     title: "Event Planning Tool",
//     description:
//       "Efficiently plan and manage every detail of your wedding event with our comprehensive planning tool.",
//     link: "#",
//     images,
//   },
//   {
//     title: "Budget Planner",
//     description:
//       "Keep your wedding expenses in check with our user-friendly budget planner.",
//     link: "#",
//     images,
//   },
//   {
//     title: "Wishlist",
//     description:
//       "Create and share your wedding wishlist with guests, ensuring you receive gifts you truly desire.",
//     link: "#",
//     images,
//   },
// ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6   min-h-screen">
      {/* To-Do List */}
      <div className="bg-purple-200 text-foreground p-6 rounded-2xl shadow-lg col-span-1 md:col-span-3 lg:row-span-2 lg:col-span-2">
        <h3 className="font-bold">To-Do List</h3>
        <p className="text-sm">Stay organized with a checklist for every task.</p>
      </div>
      
      {/* Event Planning */}
      <div className="bg-pink-200 text-foreground p-6 rounded-2xl shadow-lg md:col-span-2">
        <h3 className="font-bold">Event Planning</h3>
        <p className="text-sm">Plan everything down to the finest details.</p>
      </div>
      
      {/* Wishlist */}
      <div className="bg-yellow-100 text-black p-6 rounded-2xl shadow-lg">
        <h3 className="font-bold">Wishlist</h3>
        <p className="text-sm">Save your favorite vendors, venues, and deals in one click.</p>
      </div>
      
      {/* Budget Tracker */}
      <div className="bg-green-200 text-foreground p-6 rounded-2xl shadow-lg">
        <h3 className="font-bold">Budget Tracker</h3>
        <p className="text-sm">Manage expenses and stay within your budget.</p>
      </div>
      
      {/* Invitation Cards */}
      <div className="bg-orange-200 text-foreground p-6 rounded-2xl shadow-lg md:col-span-2 lg:col-span-3">
        <h3 className="font-bold">Invitation Cards</h3>
        <p className="text-sm">Create and send beautifully designed invitations.</p>
      </div>
      
      {/* Reminders */}
      <div className="bg-blue-200 text-foreground p-6 rounded-2xl shadow-lg md:col-span-3 lg:col-span-1">
        <h3 className="font-bold">Reminders</h3>
        <p className="text-sm">Never miss an important meeting or deadline.</p>
      </div>
    </div>

    </section>
  );
};

export default Benefits;
