import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiHeart as HeartOutline } from "react-icons/bi";
import { BsHeartFill as HeartFilled } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToggleCartMutation } from "../redux/serviceSlice";
import { toggleFavorite } from "../redux/favoriteSlice";

const ServiceCard = React.memo(({ service}) => {
  const [toggleCart] = useToggleCartMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const favoriteList = useSelector((state) => {
    return state.favorites.favorites || [];
  });

  // Check if the current service is in the favorite list
  const isFavorite = useMemo(
    () => favoriteList.includes(service.id),
    [favoriteList, service.id]
  );

  // Navigate to service details
  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  // Handle favorite toggle
  const handleFavoriteClick = async (e, id) => {
    e.stopPropagation(); 

    try {
      const response = await toggleCart(id).unwrap();
      if (response.success) {
      }
      dispatch(toggleFavorite(id));

    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div
      className="group relative bg-white rounded shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleCardClick}
      aria-label={`View details of ${service.service_name}`}
    >
      {/* Image Section */}
      <div className="relative h-48 truncate bg-gray-200">
        <img
          src={
            service?.media[0]?.image_urls[0]?.path ||
            `https://via.placeholder.com/300x200?text=${service.service_type}`
          }
          alt={service.service_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        {/* Heart icon visibility */}
        <button
          type="button"
          className={`absolute top-3 right-3 p-2 bg-muted rounded-full shadow-lg transition-all duration-300 
            group-hover:opacity-100 opacity-0 group-hover:scale-100  hover:text-primary`}
          onClick={(e) => handleFavoriteClick(e, service.id)}
        >
          {isFavorite ? (
            <HeartFilled color={`red`} size={20} />
          ) : (
            <HeartOutline color="red" size={20} />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
       <div className="flex justify-between items-center">
       <h3
          className="text-lg font-semibold text-gray-800 truncate capitalize"
          title={service.service_name}
        >
          {service.service_name}
        </h3>
        <span className="text-sm text-gray-500">⭐ {service.rating}</span>
       </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <span>
            <strong className="font-thin">Vendor:</strong> <span className="capitalize">{service.vendor.name}</span>
          </span>
          {/* <span className="capitalize">
            {service.vendor.business_name || "No business name available"}
          </span> */}
        </div>
        <div className="mt-2 flex items-center justify-between">
         
          <span className="text-sm text-gray-700 font-semibold">
            Price:₹{service?.min_price}/{service?.service_unit}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ServiceCard;
