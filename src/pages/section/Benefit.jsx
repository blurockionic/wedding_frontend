import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import todo1 from "../../../public/tools/todo-list/todo1.png"
import todo2 from "../../../public/tools/todo-list/todo2.png"
import wishlist1 from "../../../public/tools/wishlist/wishlist1.png"
import wishlist2 from "../../../public/tools/wishlist/wishlist2.png"
import wishlist3 from "../../../public/tools/wishlist/wishlist3.png"
import wishlist4 from "../../../public/tools/wishlist/wishlist4.png"
import eventplan1 from "../../../public/tools/event-plan/eventplan1.png"
import eventplan2 from "../../../public/tools/event-plan/eventplan2.png"
import invite1 from "../../../public/tools/invitation/invitationcar1.png"




const Benefits = () => {
  // const [expandedId, setExpandedId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (list) {
          list.scrollTop += 10; // Adjust speed if needed
          if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
            list.scrollTop = 0; // Reset scroll to top when it reaches the end
          }
        }
      }, 50); // Adjust scroll speed (lower is faster)
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    if (list) {
      list.addEventListener("mouseenter", startScrolling);
      list.addEventListener("mouseleave", stopScrolling);
    }

    return () => {
      if (list) {
        list.removeEventListener("mouseenter", startScrolling);
        list.removeEventListener("mouseleave", stopScrolling);
      }
    };
  }, []);
  return (
    <>
      <section className=" bg-gray-100 md:p-20 p-4">
        <div className="text-center ">
          <h1 className="lg:text-5xl text-3xl mb-20  font-bold  text-gray-600">
            Empowering User with Extra <br />{" "}
            <span className="text-4xl lg:text-6xl text-pink-500 ">
              Benefits & Opportunities
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 min-h-screen">
          {/* To-Do List */}
          <div className="bg-purple-200 group  text-foreground p-6 rounded-2xl shadow-lg col-span-1 md:col-span-3 lg:row-span-2 lg:col-span-2 flex flex-col justify-between gap-5 sm:gap-6 md:gap-10 ">
            <div>
              <h3 className="font-bold">Checklist</h3>
            </div>
            <div className="w-full h-[30vh] sm:h-[40vh] md:h-[40vh] lg:h-[38vh] rounded-xl flex items-center justify-center relative group ">
              <img
                src={todo1}
                alt="todo list"
                className="absolute w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-full object-contain bg-white transition-transform duration-300 ease-in-out group-hover:rotate-[-10deg] -translate-x-10 rounded-xl shadow-xl"
              />
              <img
                src={todo2}
                alt="todo list"
                className="absolute w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-full object-contain bg-white transition-transform duration-300 ease-in-out group-hover:rotate-[10deg] translate-x-10 rounded-xl shadow-lg"
              />
            </div>
            <p className="text-sm ">
              Stay organized with a checklist for every task.
            </p>
          </div>

          {/* Event Planning */}
          <div className="bg-pink-200 text-foreground p-6 rounded-2xl shadow-lg md:col-span-2 flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between gap-5 sm:gap-6 md:gap-10 ">
            <div className="md:flex md:flex-col md:justify-end">
              <h3 className="font-bold">Event Planning</h3>
              <p className="text-sm hidden md:block">
                Plan everything down to the finest details.
              </p>
            </div>

            <div className="w-full h-[30vh] sm:h-[40vh] md:h-[30vh] lg:h-[20vh] rounded-xl flex items-center justify-center relative group ">
              <img
                src={eventplan2}
                alt="todo list"
                className="absolute w-[80%] sm:w-[70%] md:w-[60%] lg:w-[60%] h-full object-cover bg-white transition-transform duration-300 ease-in-out group-hover:rotate-[-20deg] -translate-x-10 md:-translate-y-10 rounded-xl shadow-xl"
              />
              <img
                src={eventplan1}
                alt="todo list"
                className="absolute w-[80%] sm:w-[70%] md:w-[60%] lg:w-[70%] h-full object-contain bg-white transition-transform duration-300 ease-in-out group-hover:rotate-[20deg] translate-x-12 rounded-xl shadow-lg"
              />
            </div>
            <p className="text-sm block md:hidden">
              Plan everything down to the finest details.
            </p>
          </div>

          {/* Wishlist */}
          <div className="bg-yellow-100 text-black px-6 py-6 rounded-2xl shadow-lg flex flex-col justify-between gap-5 sm:gap-6 md:gap-10 group">
            <div className="w-full h-[20vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] rounded-xl flex items-center justify-center relative ">
              <img
                src={wishlist4}
                alt="wishlist"
                className="absolute w-[80%] sm:w-[70%] md:w-[70%] lg:w-[90%] h-full object-cover border border-white bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:rotate-[-32deg] group-hover:-translate-x-2 group-hover:-translate-y-12 rounded-xl shadow-xl"
              />
              <img
                src={wishlist3}
                alt="wishlist"
                className="absolute w-[80%] sm:w-[70%] md:w-[70%] lg:w-[90%] h-full object-cover bg-green-500 border border-white transition-transform duration-300 ease-in-out group-hover:rotate-[-18deg] group-hover:-translate-x-2 group-hover:-translate-y-7 rounded-xl shadow-xl"
              />
              <img
                src={wishlist2}
                alt="wishist"
                className="absolute w-[80%] sm:w-[70%] md:w-[70%] lg:w-[90%] h-full object-cover bg-blue-600 border border-white transition-transform duration-300 ease-in-out group-hover:rotate-[-6deg] -translate-x-2 group-hover:-translate-y-4 rounded-xl shadow-xl "
              />
              <img
                src={wishlist1}
                alt="wish list-"
                className="absolute w-[80%] sm:w-[70%] md:w-[70%] lg:w-[90%] h-full object-cover bg-white border border-white transition-transform duration-300 ease-in-out rounded-xl shadow-lg"
              />
            </div>
            <div className="">
              <h3 className="font-bold">Wishlist</h3>
              <p className="text-sm">
                Save your favorite vendors, venues, and deals in one click.
              </p>
            </div>
          </div>

          {/* Budget Tracker */}
          <div className="bg-green-200 text-foreground p-6 rounded-2xl shadow-lg flex flex-col justify-between gap-5 sm:gap-6 md:gap-12 overflow-hidden group">
            <div>
              <h3 className="font-bold">Budget Tracker</h3>
              <p className="text-sm">
                Manage expenses and stay within your budget.
              </p>
            </div>
            <div className="w-full h-[30vh] sm:h-[40vh] md:h-[30vh] lg:h-[20vh] rounded-xl flex items-center justify-center relative">
              <ul
                ref={listRef}
                className="absolute w-[80%] sm:w-[70%] md:w-[60%] lg:w-[90%] h-full bg-white transition-transform duration-300 ease-in-out group-hover:translate-y-9 rounded-xl shadow-xl overflow-hidden  p-4"
              >
                {[
                  "Finalize wedding date and venue",
                  "Create a guest list",
                  "Send invitations",
                  "Hire a wedding planner",
                  "Book caterers and menu selection",
                  "Choose wedding attire",
                  "Plan wedding decor and theme",
                  "Arrange entertainment and music",
                  "Confirm photographer and videographer",
                  "Plan honeymoon and travel arrangements",
                ].map((item, index) => (
                  <li key={index} className="p-2 border-b last:border-none">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Invitation Cards */}
          <div className="bg-orange-200 h-48 group text-foreground p-6 rounded-2xl shadow-lg md:col-span-2 lg:col-span-3 lg:flex lg:flex-row lg:justify-between relative group overflow-hidden">
            {/* Text Content */}
            <div>
              <h3 className="font-bold">Invitation Cards</h3>
              <p className="text-sm">
                Create and send beautifully designed invitations.
              </p>
            </div>

            {/* List Container */}
            <div className="relative w-full lg:w-[50%]  flex justify-center items-center gap-3">
            <ul className="w-full flex flex-col items-center gap-3   rotate-[-30deg]">
                {[invite1, invite1, invite1, invite1].map((item, index) => (
                  <li
                    key={index}
                    className="p-3 flex items-center justify-center bg-white w-[80%] lg:w-[90%] h-20 rounded-lg shadow-lg 
          transform rotate-x-30 translate-y-[10px] scale-95 transition-all duration-300 hover:scale-100 hover:translate-y-0 overflow-hidden"
                  >
                    <img src={item} alt={`image-${index}`} className="object-cover"/>
                  </li>
                ))}
              </ul>
              <ul className="w-full flex flex-col items-center gap-3   rotate-[-30deg]">
                {[invite1, invite1, invite1, invite1].map((item, index) => (
                  <li
                    key={index}
                    className="p-3 flex items-center justify-center bg-white w-[80%] lg:w-[90%] h-20 rounded-lg shadow-lg 
          transform rotate-x-30 translate-y-[10px] scale-95 transition-all duration-300 hover:scale-100 hover:translate-y-0 overflow-hidden"
                  >
                    <img src={item} alt={`image-${index}`} className="object-cover"/>
                  </li>
                ))}
              </ul>
              <ul className="w-full flex flex-col items-center gap-3   rotate-[-30deg]">
                {[invite1, invite1, invite1, invite1].map((item, index) => (
                  <li
                    key={index}
                    className="p-3 flex items-center justify-center bg-white w-[80%] lg:w-[90%] h-20 rounded-lg shadow-lg 
          transform rotate-x-30 translate-y-[10px] scale-95 transition-all duration-300 hover:scale-100 hover:translate-y-0 overflow-hidden"
                  >
                    <img src={item} alt={`image-${index}`} className="object-cover"/>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-blue-200 text-foreground lg:h-48 px-6 pt-6 rounded-2xl shadow-lg md:col-span-3 lg:col-span-1 flex flex-col justify-between gap-5 sm:gap-6 md:gap-12 overflow-hidden group">
            <div>
              <h3 className="font-bold">Reminders</h3>
              <p className="text-sm">
                Never miss an important meeting or deadline.
              </p>
            </div>
            <div className="w-full h-[30vh] sm:h-[40vh] md:h-[30vh] lg:h-[80vh] rounded-xl flex items-center justify-center relative">
              <img
                src={todo2}
                alt="todo list-"
                className="absolute w-[80%] sm:w-[70%] md:w-[70%] lg:w-[90%] h-full object-cover bg-white transition-transform translate-y-5 group-hover:-translate-y-9 duration-300 ease-in-out rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* expandable card  */}
      {/* <div className="flex gap-4 justify-center p-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layout
            className={`cursor-pointer rounded-lg p-4 shadow-md bg-white border ${
              expandedId === card.id ? "w-96" : "w-40"
            }`}
            onClick={() =>
              setExpandedId(expandedId === card.id ? null : card.id)
            }
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            {expandedId === card.id && (
              <motion.img
                layout
                src={card.image}
                alt={card.title}
                className="mt-4 rounded-lg"
              />
            )}
          </motion.div>
        ))}
      </div> */}
    </>
  );
};

export default Benefits;
