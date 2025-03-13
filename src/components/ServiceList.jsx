import ServiceCard from "./ServiceCard";

const ServiceList = ({ services, category, state, subCategory, city }) => {
  if (!services.length) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-foreground text-4xl md:text-8xl">No services found.</p>
      </div>
    );
  }

  return (
    <div className=" bg-muted p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-lg">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          category={category}
          state={state}
          subCategory={subCategory}
          city={city}
        />
      ))}
    </div>
  );
};

export default ServiceList;
