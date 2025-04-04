import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import moment from "moment";

const DocumentTemplate = ({ events, user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    const element = document.getElementById("pdf-content");
    const opt = {
      margin: 10,
      filename: "Indian_Wedding_Plan.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <button 
        onClick={handleDownload}
        disabled={isLoading}
        className="mb-8 px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors font-medium text-md"
      >
        {isLoading ? "Processing..." : "Download Wedding Plan"}
      </button>
      
      <div id="pdf-content" className="mt-6 border border-gray-200 rounded-lg bg-white shadow">
        {/* Cover Page - Fixed to cover full page */}
        <div className="relative w-full h-[1020px] bg-yellow-50 overflow-hidden">
          {/* Corner Elements */}
          <img 
              src="/eventPlannerpdf/Grouppdfcornerelementtl.png" 
              alt="Top Left Corner" 
              className="absolute top-0 left-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementtr(1).png" 
              alt="Top Right Corner" 
              className="absolute top-0 right-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementbl.png" 
              alt="Bottom Left Corner" 
              className="absolute bottom-0 left-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementbr.png" 
              alt="Bottom Right Corner" 
              className="absolute bottom-0 right-0 w-32 h-32"
            />
          
          {/* Logo and title */}
          <div className="flex flex-col items-center pt-12 px-16">
            {/* Logo Icon */}
            {/* <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="10" y="10" width="80" height="80" rx="8" fill="#F59E0B" />
                <path d="M50,15 L80,45 L65,80 L35,80 L20,45 Z" fill="#EC4899" />
                <text x="50" y="60" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle">M</text>
              </svg>
            </div> */}
            <img src="/logo/brandlogo.png" alt="logo" className="w-24 h-24"/>
            
            {/* Marriage Vendors heading */}
            <h1 className="text-pink-600 text-3xl font-bold mb-8">Marriage Vendors</h1>
            
            {/* White box with content */}
            <div className="bg-white rounded-3xl w-full max-w-xl py-12 px-8 mx-auto">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-pink-600 text-5xl font-bold mb-12">Wedding Plan</h2>
                
                <h3 className="text-pink-600 text-4xl mb-12">{user?.user_name || "Dear Couple"}</h3>
                
                {/* Indian couple image */}
                <div className="w-56 h-56 mb-12">
                  <img 
                    src="/eventPlannerpdf/OBJECTScouplepdf.png" 
                    alt="Indian couple illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Date */}
                <div className="text-yellow-500 text-3xl font-medium">
                  Apr 02, 2025
                </div>
              </div>
            </div>
          </div>
          
          {/* Lotus decorations at bottom */}
          <img 
            src="/eventPlannerpdf/Grouplotuspdf.png" 
            alt="Lotus Left" 
            className="absolute bottom-8 left-8 w-32 h-32 opacity-70"
          />
          <img 
            src="/eventPlannerpdf/Grouplotuspdf.png" 
            alt="Lotus Right" 
            className="absolute bottom-8 right-8 w-32 h-32 opacity-70"
          />
        </div>

        {/* Event Pages */}
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="relative w-full h-[1050px] bg-yellow-50"
          >
            {/* Corner Elements */}
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementtl.png" 
              alt="Top Left Corner" 
              className="absolute top-0 left-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementtr(1).png" 
              alt="Top Right Corner" 
              className="absolute top-0 right-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementbl.png" 
              alt="Bottom Left Corner" 
              className="absolute bottom-0 left-0 w-32 h-32"
            />
            <img 
              src="/eventPlannerpdf/Grouppdfcornerelementbr.png" 
              alt="Bottom Right Corner" 
              className="absolute bottom-0 right-0 w-32 h-32"
            />
            
            {/* Content */}
            <div className="px-16 py-16">
              {/* Event Title */}
              <h2 className="text-pink-600 text-4xl font-bold mb-8">
                {event.eventName}
              </h2>
              
              {/* Event Details Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-yellow-800 font-bold">Date</p>
                    <p className="text-gray-700">{moment(event.eventDate).format('DD MMM, YYYY')}</p>
                  </div>
                  <div>
                    <p className="text-yellow-800 font-bold">Budget:</p>
                    <p className="text-gray-700">₹ {parseFloat(event.eventBudget).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-yellow-800 font-bold">Start Time</p>
                    <p className="text-gray-700">{event.eventStartTime ? moment(event.eventStartTime).format("hh:mm A") : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-yellow-800 font-bold">End Time</p>
                    <p className="text-gray-700">{event.eventEndTime ? moment(event.eventEndTime).format("hh:mm A") : "N/A"}</p>
                  </div>
                </div>
              </div>
              
              {/* Tasks Section */}
              {event.eventTask && event.eventTask.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-pink-600 text-2xl font-bold mb-4">Tasks</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-yellow-100">
                        <tr>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Task Name</th>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Due Date</th>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.eventTask.map((task, taskIndex) => (
                          <tr key={task.id} className={taskIndex % 2 === 0 ? "bg-yellow-50" : "bg-white"}>
                            <td className="py-2 px-4 border-b border-yellow-100">
                              <div className="flex items-center">
                                {/* Printable checkbox */}
                                <div className="mr-2 w-5 h-5 border border-gray-400 rounded flex-shrink-0">
                                  {/* Empty checkbox for printing */}
                                </div>
                                {task.name}
                              </div>
                            </td>
                            <td className="py-2 px-4 border-b border-yellow-100">
                              {moment(task.dueDate).format("YYYY-MM-DD")}
                            </td>
                            <td className="py-2 px-4 border-b border-yellow-100">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                task.priority === "Medium" || task.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800" 
                                  : task.priority === "High" || task.status === "Not Started"
                                  ? "bg-red-100 text-red-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {task.status || task.priority || "Low"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Services Section */}
              {event.eventVendors && event.eventVendors.length > 0 && (
                <div>
                  <h3 className="text-pink-600 text-2xl font-bold mb-4">Services</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-yellow-100">
                        <tr>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Sr. No.</th>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Service Name</th>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Service Category</th>
                          <th className="py-2 px-4 text-left text-yellow-800 font-bold border-b border-yellow-200">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.eventVendors.map((vendor, vendorIndex) => (
                          <tr key={vendor.id} className={vendorIndex % 2 === 0 ? "bg-yellow-50" : "bg-white"}>
                            <td className="py-2 px-4 border-b border-yellow-100">{vendorIndex + 1}</td>
                            <td className="py-2 px-4 border-b border-yellow-100">{vendor.name}</td>
                            <td className="py-2 px-4 border-b border-yellow-100">{vendor.category || "Wedding Vendor"}</td>
                            <td className="py-2 px-4 border-b border-yellow-100">Rs. {parseFloat(vendor.price).toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            {/* Lotus decorations at bottom */}
            <img 
              src="/eventPlannerpdf/Grouplotuspdf.png" 
              alt="Lotus Left" 
              className="absolute bottom-8 left-8 w-32 h-32 opacity-70"
            />
            <img 
              src="/eventPlannerpdf/Grouplotuspdf.png" 
              alt="Lotus Right" 
              className="absolute bottom-8 right-8 w-32 h-32 opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTemplate;