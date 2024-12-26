import ServiceCreate from "./Tabs/ServiceCreate";

const ServicePage = ({ onClose }) => {
  return (
    <>
      <div className="  bg-slate-800">
        <ServiceCreate onClose={onClose} />
      </div>
    </>
  );
};

export default ServicePage;
