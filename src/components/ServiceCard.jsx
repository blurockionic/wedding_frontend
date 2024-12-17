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
import useAuthRedirect from "../hooks/useAuthRedirect";




const ServiceCard = React.memo(({ service }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  


  // Get the list of favorites from Redux store
  const favoriteList = useSelector((state) => state.favorites.favorites);

  // State to track if the current service is a favorite
  const [isFavorite, setIsFavorite] = useState(null);

 
  useEffect(() => {
    const favoriteService = favoriteList.cartItems.find(
      (item) => item.id === service.id
    );
    if (favoriteService) {
      setIsFavorite(favoriteService);
    } // true if found, false otherwise
  }, [favoriteList, service.id]); // Dependency array

  // Mutations with loading and error states
  const [addToCart, { isLoading: isAddingToCart, isError: addError }] =
    useAddToCartMutation();
  const [
    removeFromCart,
    { isLoading: isRemovingFromCart, isError: removeError },
  ] = useRemoveFromCartMutation();

  // Handle redirect to the details page
  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  // Handle favorite toggle action
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        // Remove from favorites (API and Redux update)
        await removeFromCart(isFavorite.id).unwrap();
        dispatch(removeFavorite(isFavorite.id));
     
      } else {
        // Add to favorites (API and Redux update)
        await addToCart(service.id).unwrap();
        dispatch(addFavorite(service.id));
      
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
     
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative"
      onClick={handleCardClick}
      aria-label={`View details of ${service.service_name}`}
    >
      {/* Image Section */}
      <div className="h-48 bg-gray-300 flex p-2 items-center justify-center">
        <img
          src={
            service.image_url ||
            `https://via.placeholder.com/300x200?text=${service.service_type}`
          }
          alt={service.service_name}
          className="h-full rounded-md w-full object-cover"
        />
        {/* Heart Icon for Favorites */}
        <button
          type="button"
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full"
          onClick={handleFavoriteClick}
          disabled={isAddingToCart || isRemovingFromCart} // Disable while loading
        >
          {isFavorite ? (
            <HeartFilled className="text-red-500" size={24} />
          ) : (
            <HeartOutline className="text-gray-500" size={24} />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between">
          <h3
            className="text-lg font-semibold capitalize text-gray-800 truncate"
            title={service.service_name}
          >
            {service.service_name}
          </h3>
          <span className="text-sm text-gray-500">⭐ {service.rating}</span>
        </div>

        <p className="text-sm text-gray-500 mt-2 truncate">
          <strong>Vendor:</strong> {service.vendor.name}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {service.vendor.description || "No description available"}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-700 font-semibold">
              ₹{service.min_price}
            </span>{" "}
            -{" "}
            <span className="text-gray-700 font-semibold">
              ₹{service.max_price}
            </span>
          </div>
        </div>

        {/* Loading and Error States */}
        {isAddingToCart || isRemovingFromCart ? (
          <div className="text-center mt-2 text-gray-600">Loading...</div>
        ) : null}

        {addError || removeError ? (
          <div className="text-center mt-2 text-red-500">
            An error occurred while updating the service.
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default ServiceCard;
