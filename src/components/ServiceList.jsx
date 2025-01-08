import ServiceCard from "./ServiceCard";

const ServiceList = ({ services }) => {
  if (!services.length) {
    return (
      <div className="f flex items-center justify-center">
        <p className="text-foreground text-8xl">No services found.</p>
      </div>
    );
  }

  return (
    <div className=" bg-muted p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
