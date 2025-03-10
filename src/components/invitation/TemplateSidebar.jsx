import React from "react";

const cards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Template ${index + 1}`, 
}));

const TemplateSidebar = () => {
  return (
    <>
      <button className="bg-pink-500 text-white px-4 py-2 w-full rounded-md mb-4 hidden lg:block">
        Explore more
      </button>
      <div className="h-[400px] overflow-y-auto"> 
        <div className="grid grid-cols-2 gap-3 ">
          {cards.map((card) => (
            <div key={card.id} className="rounded-lg ">
              <div className="w-32 h-32 rounded-md bg-gray-200 shadow-md flex items-center justify-center mx-auto">
                {/* Placeholder for image */}
                <span className="text-gray-500 text-xs">Image</span>
              </div>
              {/* <p className="text-center font-semibold mt-2 text-sm">{card.title}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateSidebar;
