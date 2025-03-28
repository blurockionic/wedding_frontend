import ServiceCard from "../../../components/ServiceCard";
import VendorCardForEvent from "./VendorCardForEvent";

const ServiceListForEvent = ({ services, category, state, subCategory, city, eventId }) => {
  if (!services.length) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-foreground text-8xl">No services found.</p>
      </div>
    );
  }

  return (
    <div className=" bg-muted p-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 rounded-xl">
      {services.map((service) => (
        <VendorCardForEvent key={service.id} service={service} category={category}  
        state={state} subCategory={subCategory} city={city} eventId={eventId}
        />
      ))}
    </div>
  );
};

export default ServiceListForEvent;
