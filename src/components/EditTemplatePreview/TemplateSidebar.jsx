import React from "react";

const cards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
}));

const TemplateSidebar = () => {
  return (
    <>
    <button className="bg-pink-500 text-white px-4 py-2 w-full rounded-md mb-4 hidden lg:block">
      Explore more
    </button>
    <div className=" p-0 overflow-y-auto lg:flex lg:justify-around lg:w-[100%] mx-auto lg:gap-6">
      <div className="lg:grid lg:grid-cols-1 lg:gap-11 flex space-x-4  justify-center xl:space-x-[0] w-[31%]  lg:ms-[-40px]">
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[140px] lg:min-w-full rounded-lg lg:p-0 flex-shrink-0 mx-auto lg:h-[18vh] h-[15vh] p-3"
          >
            <div
              className="w-full h-full rounded-md browse_image_card_1 shadow_1"
            />
            <p className="text-center font-semibold mt-2 "></p>
          </div>
        ))}
      </div>
      <div className="xl:grid xl:grid-cols-1 xl:gap-11 space-x-4 xl:space-x-[0%] justify-center w-[31%] hidden lg:ms-[-90px]">
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[140px] lg:min-w-full  rounded-lg p-0 flex-shrink-0 mx-auto lg:h-[18vh] h-[15vh]"
          >
            <div
              className="w-full h-full rounded-md browse_image_card_1 shadow_1"
            />
            <p className="text-center font-semibold mt-2"></p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TemplateSidebar;
