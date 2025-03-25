import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiHeart as HeartOutline } from "react-icons/bi";
import { BsHeartFill as HeartFilled } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToggleCartMutation } from "../redux/serviceSlice";
import { toggleFavorite } from "../redux/favoriteSlice";
import { toast } from "react-toastify";
import { GoLocation } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { MdRoomService } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";

const ServiceCard = React.memo(({ service, category}) => {
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
  const handleCardClick = (subCategory, state, city, id) => {
    navigate(`/all/${category}/${subCategory}/${state}/${city}/${id}`);
  };

  const handleFavoriteClick = async (e, id) => {
    e.stopPropagation(); 
  
    try {
      const response = await toggleCart(id).unwrap();
  
      if (response.success) {
        dispatch(toggleFavorite(id));
        toast.success(response.message || "Added to favorites!");
      } 
    } catch (error) {
      toast.error(error?.data?.message||"Failed to update favorite status. Please try again.");
    }
  };

  const imageUrl = useMemo(() => {
    if (
      service?.media?.length > 0 &&
      service.media[0]?.image_urls?.length > 0 &&
      service.media[0].image_urls[0]?.path
    ) {
      return service.media[0].image_urls[0].path;
    }
  
   
    return `https://placehold.co/300x200?text=${encodeURIComponent(
      service?.service_type || "No Image"
    )}`;
  }, [service]);


  return (
    <div
      className="group relative w-[250px] bg-white  md:w-[300px] border border-gray-400 p-3 bg-muted rounded shadow-lg overflow-hidden transform transition-all duration-300  hover:shadow-xl"
      onClick={()=>handleCardClick(service?.service_type, service?.state, service?.city, service?.id)}
      aria-label={`View details of ${service?.service_name}`}
    >
      {/* Image Section */}
      <div className="relative rounded-md h-52 truncate bg-gray-200">
        <img
          src={imageUrl}
          alt={service?.service_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        {/* Heart icon visibility */}
        <button
          type="button"
          className={`absolute top-3 right-3 p-2 bg-muted rounded-full shadow-lg transition-all duration-300 
            group-hover:opacity-100 opacity-0 group-hover:scale-100  hover:text-primary`}
          onClick={(e) => handleFavoriteClick(e, service?.id)}
        >
          {isFavorite ? (
            <HeartFilled color={`red`} size={20} />
          ) : (
            <HeartOutline color="red" size={20} />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="my-2">
       <div className="flex justify-between items-center">
       <h3
          className="text-lg font-bold text-gray-800 truncate capitalize"
          title={service?.service_name}
        >
          {service?.service_name}
        </h3>
        <span className="text-sm text-gray-500">⭐ {service?.rating}</span>
       </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <strong className="font-semibold capitalize"><span><GoLocation className="text-red-500"/></span></strong> <span className="capitalize">{service?.city}</span>
          </span>
          <span className="capitalize flex items-center gap-1">
            <MdRoomService size={16}/>
            {service?.service_type}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
         
          <span className="text-sm text-gray-700 font-semibold flex items-center gap-1 " >
            <GiTwoCoins size={16}/>
            From <span className="flex items-center"><MdCurrencyRupee/>{service?.min_price}</span> / {service?.service_unit}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ServiceCard;
