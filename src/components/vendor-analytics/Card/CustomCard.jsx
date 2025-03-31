import PropTypes from "prop-types";
const CustomCard = ({ count = 1, title = "", icon, className }) => {
  return (
    <div
      className={`flex bg-[#EFEFEF] flex-col shadow px-10 py-4 md:py-7 space-y-4  text-3xl font-semibold w-full rounded-[32px]  border cursor-pointer ${className}`}
    >
      <div className="flex flex-row justify-between items-center ">
        <p>{title}</p>

        <span>{icon}</span>
      </div>
      <p >{count}</p>
    </div>
  );
};

CustomCard.PropTypes = {
  count: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.element,
  className: PropTypes.string,
};

export default CustomCard;
