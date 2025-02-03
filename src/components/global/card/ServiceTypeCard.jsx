import PropTypes from "prop-types"
const ServiceTypeCard = ({ icon: Icon, title, description, cardStyle, iconStyle, titleStyle, descriptionStyle }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg shadow-lg ${cardStyle}`}
    >
      {Icon && <Icon className={`text-4xl mb-2 ${iconStyle}`} />}
      <h3 className={`text-md md:text-lg font-semibold mb-1 ${titleStyle}`}>{title}</h3>
      <p className={`text-gray-600 text-center ${descriptionStyle}`}>{description}</p>
    </div>
  );
};

ServiceTypeCard.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    cardStyle: PropTypes.string,
    iconStyle: PropTypes.string,
    titleStyle: PropTypes.string,
    descriptionStyle: PropTypes.string,
}

export default ServiceTypeCard;
