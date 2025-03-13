import { FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDeleteEventServiceMutation } from "../../../redux/weddingPlanSlice";
import { toast } from "react-toastify";

const ServiceCard = ({ service }) => {
  const [deleteEventService, {isLoading, error}] = useDeleteEventServiceMutation()
  const navigate = useNavigate();

  // Navigate to service details
  const handleCardClick = (id) => {
    // navigate(`/all/${category}/${subCategory}/${state}/${city}/${service.id}`);
    console.log(id)
  };

  // handle on delete 
  const handleOnDeleteEventVendor = async(serviceId, eventId)=>{

    try {
      const response = await deleteEventService({serviceId, eventId}).unwrap()
      const {message, success} = response

      if(success){
        toast.success(message)
      }
    } catch (error) {
      console.error(error)
    }

    console.log(eventId)
    console.log(seriveId)
  }

  return (
    
    <div
      className="bg-white group rounded shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl p-4"
      // onClick={handleCardClick}
      aria-label={`View details of ${service?.name}`}
    >
        <div
        onClick={()=>handleOnDeleteEventVendor(service?.id, service?.eventId)}
         className="flex justify-end items-center">
        <span className="opacity-0 group-hover:opacity-100 text-red-500 cursor-pointer"><FiMinusCircle/></span>
        </div>
      {/* Service Name */}
      <h3 className="text-lg font-semibold text-gray-800 truncate capitalize">
        {service?.name}
      </h3>

      {/* Vendor Name */}
      {/* <div className="text-sm text-gray-500 mt-1">
        <strong className="font-thin">Vendor:</strong>{" "}
        <span className="capitalize">{service?.vendor?.name || "No Vendor"}</span>
      </div> */}

      {/* Price with Unit */}
      <div className="text-sm text-gray-700 font-semibold mt-2">
        Price: ₹{service?.price} / {service?.unit}
      </div>
    </div>
  );
};

export default ServiceCard;
