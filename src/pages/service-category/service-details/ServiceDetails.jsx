import  { useState } from "react";
import { useParams } from "react-router-dom";
import { BiChevronDown, BiPhone, BiStar } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [showPhone, setShowPhone] = useState(false);
  const isDesktop = window.innerWidth > 768; // Check if it's a desktop view

  const vendorPhone = "+91 9876543210"; // Sample phone number
  const whatsappNumber = "919876543210"; // WhatsApp number in international format

  const [faqs, setFaqs] = useState([
    { question: "What services are included?", answer: "The service includes XYZ features and benefits.", isOpen: false },
    { question: "How can I book the service?", answer: "You can book by clicking on the 'Book Now' button or calling the vendor.", isOpen: false },
    { question: "What is the cancellation policy?", answer: "Cancellations must be made at least 24 hours in advance.", isOpen: false },
  ]);

  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <div className="px-16 py-8">
      {/* Service Main Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Images */}
        <div className="w-full lg:w-2/3">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="mt-4 flex gap-2">
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Right: Service Details */}
        <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Service Name {serviceId}</h1>
          <div className="flex items-center gap-2 text-yellow-500 mt-2">
            <BiStar size={20} />
            <span className="font-semibold">4.5</span>
            <span className="text-gray-500">(200 Reviews)</span>
          </div>
          <p className="mt-2 text-gray-500">By Vendor Name</p>
          <p className="mt-2 text-lg font-semibold">₹2,500</p>

          <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold">
            Book Now
          </button>

          {/* Contact Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <a href={`tel:${vendorPhone}`} className="w-full flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
              <BiPhone size={20} /> Call Vendor
            </a>
            <a href={`sms:${vendorPhone}`} className="w-full flex items-center gap-2 bg-gray-500 text-white py-2 px-4 rounded-lg">
              <MdMessage size={20} /> Message Vendor
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg">
              <FaWhatsapp size={20} /> WhatsApp
            </a>
          </div>

          {/* Show Phone Number (Only on Desktop) */}
          {isDesktop && (
            <button
              className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg font-semibold"
              onClick={() => setShowPhone(true)}
            >
              {showPhone ? vendorPhone : "View Vendor Phone Number"}
            </button>
          )}
        </div>
      </div>

      {/* Service Description & Features */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">About This Service</h2>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Suspendisse potenti. Duis egestas purus a ex ultricies,
          eget varius ligula tincidunt.
        </p>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <BiStar size={16} className="text-yellow-500" />
            <BiStar size={16} className="text-yellow-500" />
            <BiStar size={16} className="text-yellow-500" />
            <BiStar size={16} className="text-yellow-500" />
            <BiStar size={16} className="text-gray-300" />
          </div>
          <p className="mt-2 text-gray-600">&quot;Great service! Highly recommend!&quot;</p>
          <p className="text-sm text-gray-400">- John Doe</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-3 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <BiChevronDown
                  size={20}
                  className={`transition-transform ${
                    faq.isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {faq.isOpen && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
