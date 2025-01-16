import PropTypes from "prop-types";
const CustomCard = ({ count = 1, title = "", icon, className }) => {
  return (
    <div className={`flex flex-col shadow-custom px-10 py-7  w-full rounded-md gap-y-3 cursor-pointer ${className}`}>
      <div className="flex flex-row justify-between items-center ">
        <p className="font-semibold text-6xl">{count}</p>
        <span className="text-5xl">{icon}</span>
      </div>
      <p className="font-thin text-3xl">{title}</p>
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
