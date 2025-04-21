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

import { useSelector } from "react-redux";
import { useGetServicesQuery } from "../../redux/serviceSlice";

function VendorBussinessProfile() {
  const user = useSelector((state) => state.auth.user);
  const [vendorData, setVendorData] = useState(null);
  const filters = useMemo(
    () => ({
      vendorId: user?.id,
      status: "active",
    }),
    [user?.id]
  );

  const { data: serviceData, isLoading, error } = useGetServicesQuery(filters);
  const services = serviceData?.ServiceResult;
  const allImages =
    services?.flatMap(
      (service) =>
        service?.media?.flatMap((m) =>
          m?.image_urls?.map((img) => img?.path).filter(Boolean)
        ) || []
    ) || [];

  useEffect(() => {
    if (user && user.role?.toLowerCase() === "vendor") {
      setVendorData({
        name: user?.name || "Vendor",
        tagline: `${
          user.business_category || "Vendor"
        } with 1+ years experience`,
        phone: user.phone_number || "",
        email: user.email || "",
        location: `${user.city || ""}, ${user.state || ""}`,
        facebookUrl: user.social_networks?.facebook || "#",
        instagramUrl: user.social_networks?.instagram || "#",
        aboutUsText: user.description || "We are passionate about what we do!",
        photos: [
          user.logo_url?.path ||
            "https://placehold.co/300/FFC107/000000?Text=Photo+1",
          "https://placehold.co/300/4CAF50/FFFFFF?Text=Photo+2",
          "https://placehold.co/300/2196F3/FFFFFF?Text=Photo+3",
        ],
        services: (user.service_type || []).map((service) => ({
          name: service,
          price: "₹X,XXX",
          imageUrl: "https://placehold.co/150/F44336/FFFFFF?Text=Service",
        })),
        testimonials: [
          {
            name: "Client A",
            location: "From Delhi",
            text: "Outstanding experience with this vendor!",
            avatarUrl: "https://placehold.co/50/03A9F4/FFFFFF?Text=A",
          },
          {
            name: "Client B",
            location: "From Ranchi",
            text: "Highly professional and timely service.",
            avatarUrl: "https://placehold.co/50/00BCD4/FFFFFF?Text=B",
          },
        ],
      });
    }
  }, [user]);
  const navLinks = [
    { name: "About ", href: "#about" },
    { name: " Gallery", href: "#photos" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  if (!vendorData) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-gray-100 font-sans md:p-16 mx-auto">
      {/* Header */}
      <div className="relative isolate">
        <div className="bg-purple-300 h-48 w-full" />
        <div className="bg-transparent rounded-lg md:flex gap-10 isolate relative">
          {/* Avatar */}
          <div className="w-40 aspect-square rounded-md overflow-hidden border-2 absolute top-0 md:top-1/2 left-1/2 md:left-10 transform -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 z-10">
            <div className="bg-gray-300 w-full h-full flex items-center justify-center text-lg font-bold text-gray-700 uppercase">
              {vendorData.name.slice(0, 2)}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-grow px-4 md:mt-0">
            <div className="text-xs w-full">
              <h1 className="text-xl flex gap-2 items-center capitalize font-semibold text-gray-800">
                {vendorData.name}
                <BadgeCheck size={24} className="text-white fill-blue-500" />
              </h1>
              <p className="text-gray-600">{vendorData.tagline}</p>

              <div className=" flex items-center justify-between text-gray-500 flex-wrap space-y-2 md:space-y-0">
                <div className="flex md:flex-row items-center flex-wrap gap-2">
                  <span className="flex  items-center gap-1">
                    <Phone size={16} /> {vendorData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={16} /> {vendorData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {vendorData.location}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={vendorData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border text-blue-500 hover:bg-blue-400/15"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={vendorData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border text-pink-500 hover:bg-pink-400/15"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href={vendorData?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border text-green-500 hover:bg-green-400/15"
                  >
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className=" text-sm sm:px-6 lg:px-8 mt-8">
          <ul className="flex justify-end space-x-4 text-gray-700 overflow-scroll">
            {navLinks.map((link) => (
              <li
                className="bg-slate-300 px-2  cursor-context-menu "
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
      <div id="about" className="container mx-auto  py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-700">{vendorData.aboutUsText}</p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div id="photos" className="container mx-auto  py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages?.map((url, idx) => (
            <div key={idx} className="rounded-md overflow-hidden shadow-md">
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                className="w-full aspect-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div
        id="services"
        className="container mx-auto  py-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map((service, idx) => {
            const imageUrl =
              service?.media?.[0]?.image_urls?.[0]?.path ||
              `https://placehold.co/300x300?text=${encodeURIComponent(
                service?.service_name || "Service"
              )}`;

            return (
              <div
                key={idx}
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
          })}
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
          {vendorData.testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="bg-white flex flex-col justify-between rounded-lg shadow-md p-4"
            >
              <p className="text-gray-700 italic text-center">"{testi.text}"</p>
              <div className="flex   items-center">
                <div className="w-10 aspect-auto rounded-full overflow-hidden mr-3">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className=" text-sm font-normal text-gray-500">
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
