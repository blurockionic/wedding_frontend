import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiHeart as HeartOutline } from "react-icons/bi";
import { BsHeartFill as HeartFilled } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../redux/serviceSlice";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice";

const ServiceCard = React.memo(({ service }) => {

console.log(service);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux store favorites list
  const favoriteList = useSelector((state) => state.favorites || []);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    // Ensure favoriteList is an array before using map
    if (Array.isArray(favoriteList)) {
      const favoriteService = favoriteList
        .map((item) => item.service) // Extract the 'service' objects
        .find((favService) => favService.id === service.id); // Match the 'id'
  
      setIsFavorite(favoriteService || null); // Set as null if not found
    }
  }, [favoriteList, service.id]);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
      // Optimistic Update
      const originalState = isFavorite;
      setIsFavorite(!isFavorite);
    
      try {
        if (isFavorite) {
          // Backend Call to Remove Favorite
          const response = await removeFromCart(service.id).unwrap();
    
          // Sync State with Backend Response
          if (response.success) {
            dispatch(removeFavorite(service.id)); // Update Redux state
          } else {
            setIsFavorite(originalState); // Revert UI state on failure
            throw new Error("Failed to remove favorite.");
          }
        } else {
          // Backend Call to Add Favorite
          const response = await addToCart(service.id).unwrap();
    
          // Sync State with Backend Response
          if (response.success) {
            dispatch(addFavorite(service)); // Update Redux state
          } else {
            setIsFavorite(originalState); // Revert UI state on failure
            throw new Error("Failed to add favorite.");
          }
        }
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
    
        // Revert UI State on Failure
        setIsFavorite(originalState);
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
        <button
          type="button"
          className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg transition-all duration-300 ${
            isFavorite ? "opacity-100 scale-100" : "opacity-0 scale-75"
          } group-hover:opacity-100 group-hover:scale-100 hover:bg-red-500 hover:text-white`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <HeartFilled className="text-red-500" size={20} />
          ) : (
            <HeartOutline size={20} />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={service.service_name}
        >
          {service.service_name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <span>
            <strong>Vendor:</strong> {service.vendor.name}
          </span>
          <span>
            {service.vendor.business_name || "No business name available"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">⭐ {service.rating}</span>
          <span className="text-sm text-gray-700 font-semibold">
            ₹{service.min_price}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ServiceCard;
