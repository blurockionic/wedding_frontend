import  { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiHeart as HeartOutline } from "react-icons/bi";
import { BsHeartFill as HeartFilled } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToggleCartMutation } from "../../../redux/serviceSlice";
import { toggleFavorite } from "../../../redux/favoriteSlice";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import { useAddServiceMutation } from "../../../redux/weddingPlanSlice";
import { GoLocation } from "react-icons/go";
import { MdCurrencyRupee, MdRoomService } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";

const VendorCardForEvent = ({
  service,
  category,
  state,
  subCategory,
  city,
  eventId,
}) => {
  const [addService, { isLoading, error }] = useAddServiceMutation();
  const [toggleCart] = useToggleCartMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(eventId);

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
    navigate(`/all/${category}/${subCategory}/${state}/${city}/${service.id}`);
  };

  //handle on favorite
  const handleFavoriteClick = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await toggleCart(id).unwrap();

      if (response.success) {
        dispatch(toggleFavorite(id));
        toast.success(response.message || "Added to favorites!");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Failed to update favorite status. Please try again."
      );
    }
  };

  // handle on add event
  const handleAddOnEvent = async (e, serviceId) => {
    e.stopPropagation();
    try {
      if (eventId) {
        const response = await addService({ serviceId, eventId }).unwrap();
        await toggleCart(serviceId).unwrap();

        const { success, message } = response;

        if (success) {
          toast.success(message || "Added to event!");
          dispatch(toggleFavorite(serviceId));
          // toast.success("Added to favorites!");
        }
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Failed to add service to event. Please try again."
      );
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
      className="group p-4 relative bg-white rounded shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleCardClick}
      aria-label={`View details of ${service?.service_name}`}
    >
      {/* Image Section */}
      <div className="relative h-48 truncate bg-gray-200 ">
        <img
          src={imageUrl}
          alt={service?.service_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-md"
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
            <HeartOutline color="red" size={20} />
          ) : (
            <HeartFilled color={`red`} size={20} />
          )}
        </button>
        <button
          type="button"
          className={`absolute top-[52px] right-3 p-2 bg-muted rounded-full shadow-lg transition-all duration-300 
            group-hover:opacity-100 opacity-0 group-hover:scale-100  hover:text-primary`}
          onClick={(e) => handleAddOnEvent(e, service?.id)}
        >
          {isFavorite ? (
            <PlusCircle color="red" size={20} fill="none" />
          ) : (
            <PlusCircle color={`white`} size={20} fill="red" />
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
        <div className="flex flex-col items-start text-sm text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <strong className="font-semibold capitalize">
              <span>
                <GoLocation className="text-red-500" />
              </span>
            </strong>{" "}
            <span className="capitalize">{service?.city}</span>
          </span>
          <span className="capitalize flex items-center gap-1">
            <MdRoomService size={16} />
            {service?.service_type}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-700 font-semibold flex items-center gap-1 ">
            <GiTwoCoins size={16} />
            From{" "}
            <span className="flex items-center text-green-500">
              <MdCurrencyRupee />
              {service?.min_price}
            </span>{" "}
            / {service?.service_unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorCardForEvent;
