import {
  BadgeCheck,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useGetServicesQuery } from "../../redux/serviceSlice";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";
import ServiceCard from "../../components/ServiceCard";
import { useVendorProfileViewMutation } from "../../redux/vendorSlice";
import Cookies from "js-cookie";
function VendorBussinessProfile() {
  const location = useLocation();
  const user = location.state;

  const [vendorData, setVendorData] = useState(user);
  const [serviceData, setServiceData] = useState(null);

  const [addProfileView] = useVendorProfileViewMutation();
  console.log(vendorData.id);
  

  useEffect(() => {
    if (!vendorData.id) return;

    const cookieKey = `viewed_service_${vendorData.id}`;

    const alreadyViewed = Cookies.get(cookieKey);

    if (!alreadyViewed) {
      addProfileView(vendorData.id)
        .unwrap()
        .then(() => {
          Cookies.set(cookieKey, "true", { expires: 1 });
        })
        .catch((err) => {
          console.error("Failed to log profile view", err);
        });
    }
  }, [vendorData.id]);

  useEffect(() => {
    if (!user) {
      console.error("User data is missing!");
      return;
    }
    setVendorData(user);
    setServiceData(null);
  }, [user]);

  const filters = useMemo(
    () => ({
      vendorId: user?.id,
      status: "active",
    }),
    [user?.id]
  );

  useEffect(() => {
    if (!user) {
      console.error("User data is missing!");
      return;
    }

    // Save to localStorage
    setVendorData(user);
    localStorage.setItem("vendorData", JSON.stringify(user));

    // Cleanup function to remove data from localStorage on unmount
    return () => {
      localStorage.removeItem("vendorData");
    };
  }, [user]);

  // Fetch services using the filters, and ensure refetch happens when vendorId changes
  const {
    data: fetchedServiceData,
    isLoading,
    error,
  } = useGetServicesQuery(filters, { skip: !user });

  useEffect(() => {
    if (fetchedServiceData) {
      setServiceData(fetchedServiceData.ServiceResult);
    }
  }, [fetchedServiceData]);

  const services = serviceData;

  const allImages =
    services?.flatMap(
      (service) =>
        service?.media?.flatMap((m) =>
          m?.image_urls?.map((img) => img?.path).filter(Boolean)
        ) || []
    ) || [];

  const testimonials =
    services?.flatMap((service) => service?.feedback || []) || [];

  console.log(serviceData);

  const navLinks = [
    { name: "About ", href: "#about" },
    { name: " Gallery", href: "#photos" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Early return if loading or error occurs
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vendor data</div>;
  }

  return (
    <div className="bg-gray-100 font-sans md:p-16 p-2 mx-auto">
      {/* Header */}
      <div className="relative isolate">
        <div className="bg-purple-300 h-48 w-full" />
        <div className="bg-transparent rounded-lg md:flex gap-10 isolate relative">
          {/* Avatar */}
          <div className="w-40 aspect-square rounded-md overflow-hidden border-2 absolute top-0 md:top-1/2 left-1/2 md:left-10 transform -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 z-10">
            <div className="bg-gray-300 w-full h-full flex items-center justify-center text-lg font-bold text-gray-700 uppercase">
              {vendorData?.name?.slice(0, 2) || "NN"}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-grow px-4 -mt-10 md:mt-0">
            <div className="text-xs w-full">
              <h1 className="text-xl flex gap-2 items-center capitalize font-semibold text-gray-800">
                {vendorData?.name || "Vendor Name"}{" "}
                {/* Fallback if name is undefined */}
                <BadgeCheck size={24} className="text-white fill-blue-500" />
              </h1>
              <p className="text-gray-600">
                {vendorData?.tagline || "No tagline available"}
              </p>

              <div className="flex items-center justify-between text-gray-500 flex-wrap space-y-2 md:space-y-0">
                <div className="flex md:flex-row items-center flex-wrap gap-2">
                  <span className="flex items-center gap-1">
                    <Phone size={16} /> {vendorData?.phone_number || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={16} /> {vendorData?.email || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {vendorData?.city}/{vendorData.state}
                  </span>
                </div>

                <div className="flex gap-2">
                  {vendorData?.social_networks.facebook && (
                    <a
                      href={vendorData?.social_networks?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border text-blue-500 hover:bg-blue-400/15"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {vendorData?.social_networks.instagram && (
                    <a
                      href={vendorData.social_networks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border text-pink-500 hover:bg-pink-400/15"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {vendorData?.social_networks.website && (
                    <a
                      href={vendorData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border text-green-500 hover:bg-green-400/15"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="text-sm sm:px-6 lg:px-8 mt-8">
          <ul className="flex justify-end space-x-4 text-gray-700 overflow-scroll">
            {navLinks.map((link) => (
              <li
                className="bg-slate-300 px-2 cursor-context-menu"
                key={link.href}
              >
                <a href={link.href} className="hover:text-gray-900">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-700">
            {vendorData?.aboutUsText || "No about us information available"}
          </p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div id="photos" className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Photo Gallery
        </h2>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allImages?.map((url, idx) => (
            <div
              key={idx}
              className="rounded-md overflow-hidden shadow-md mb-4"
            >
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* Services */}
      <div id="services" className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {services?.map((service, idx) => {
            const imageUrl =
              service?.media?.[0]?.image_urls?.[0]?.path ||
              `https://placehold.co/300x300?text=${encodeURIComponent(
                service?.service_name || "Service"
              )}`;

            return (
              <div
                key={service?.id || idx}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={imageUrl}
                  alt={service?.service_name || "Service"}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {service?.service_name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Min Price: ₹{service?.min_price} / {service?.service_unit}
                  </p>
                </div>
              </div>
            );
          })} */}
          {services?.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div
        id="testimonials"
        className="container mx-auto px-4 bg-[#E0F1F1] sm:px-6 lg:px-8 py-8"
      >
        <h2 className="text-2xl font-semibold font-montserrat text-gray-800 mb-4">
          Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="bg-white flex flex-col justify-between rounded-lg shadow-md p-4"
            >
              <p className="text-gray-700 italic text-center">"{testi.text}"</p>
              <div className="flex items-center">
                <div className="w-10 aspect-auto rounded-full overflow-hidden mr-3">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-normal text-gray-500">
                    {testi.name}
                  </p>
                  <p className="font-thin text-gray-500 text-xs">
                    {testi.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VendorBussinessProfile;
