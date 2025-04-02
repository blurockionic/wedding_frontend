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
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
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
        <div className="relative w-full h-[1020px] p-8 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="paisley" patternUnits="userSpaceOnUse" width="70" height="70">
                <path fill="#D53F8C" d="M35,0 C45,0 50,25 35,35 C20,45 0,35 0,20 C0,5 15,0 30,10 C40,15 25,30 15,30 C5,30 0,20 5,15 C10,10 20,15 15,20 C10,25 5,20 10,15 C15,10 25,15 20,20 C15,25 10,20 15,15 Z" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#paisley)" />
            </svg>
          </div>
          
          {/* Improved Cover Page Spacing */}
          <div className="border-8 border-yellow-400 bg-white p-12 shadow-xl z-10 flex flex-col items-center max-w-xl w-full">
            <div className="text-center">
              <div className="font-serif text-5xl font-bold text-pink-600 mb-6">Wedding Plan</div>
              <div className="text-2xl text-yellow-700 font-medium mb-8">{user?.name || "Dear Couple"}</div>
            </div>
            
            <div className="w-40 h-40 my-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g fill="none" stroke="#D53F8C" strokeWidth="1">
                  <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" />
                  <path d="M50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 C20,35 35,20 50,20 Z" />
                  <path d="M30,50 C30,40 40,30 50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 Z" />
                </g>
              </svg>
            </div>
            
            <div className="text-center text-gray-600 mt-6">
              <p className="mb-4 text-xl">{moment().format("MMMM DD, YYYY")}</p>
              <p className="text-lg italic">A beautiful journey of love and celebration</p>
            </div>
          </div>
          
          {/* Decorative elements for the cover */}
          <div className="absolute top-20 left-20 w-16 h-16 text-pink-500 opacity-30">
            <svg viewBox="0 0 100 100">
              <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-16 h-16 text-pink-500 opacity-30">
            <svg viewBox="0 0 100 100">
              <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
            </svg>
          </div>
          
          <div className="absolute bottom-10 w-full flex justify-center">
            <div className="h-4 w-2/3 border-b-4 border-yellow-400 border-dotted"></div>
          </div>
        </div>

        {/* Event Pages */}
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="w-full h-[1050px] p-10 relative bg-gradient-to-br from-yellow-50 to-pink-50 border-t border-gray-200"
          >
            {/* Decorative Border */}
            <div className="absolute inset-0 border-[8px] border-yellow-100 m-4 pointer-events-none"></div>
            <div className="absolute inset-0 border-[1px] border-pink-300 m-6 pointer-events-none"></div>
            
            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-16 h-16 text-pink-500 opacity-50">
              <svg viewBox="0 0 100 100">
                <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 w-16 h-16 text-pink-500 opacity-50 transform scale-x-[-1]">
              <svg viewBox="0 0 100 100">
                <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 w-16 h-16 text-pink-500 opacity-50 transform scale-y-[-1]">
              <svg viewBox="0 0 100 100">
                <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-16 h-16 text-pink-500 opacity-50 transform scale-x-[-1] scale-y-[-1]">
              <svg viewBox="0 0 100 100">
                <path fill="currentColor" d="M0,0 C50,25 75,0 100,50 C75,100 50,75 0,100 Z" />
              </svg>
            </div>
            
            {/* Title - Improved spacing */}
            <div className="mb-8 relative pt-8">
              <h1 className="text-4xl font-bold font-serif text-center text-pink-600 mb-4">
                {event.eventName}
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-36 bg-yellow-400 rounded"></div>
              </div>
            </div>
            
            {/* Event Details - Improved spacing */}
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg border border-pink-200 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <p className="text-yellow-800 font-medium text-lg mb-1">Date:</p>
                  <p className="text-gray-700 text-lg">{moment(event.eventDate).format('DD MMMM, YYYY')}</p>
                </div>
                <div className="mb-4">
                  <p className="text-yellow-800 font-medium text-lg mb-1">Budget:</p>
                  <p className="text-gray-700 text-lg">₹ {parseFloat(event.eventBudget).toLocaleString('en-IN', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}</p>
                </div>
                <div className="mb-4">
                  <p className="text-yellow-800 font-medium text-lg mb-1">Start Time:</p>
                  <p className="text-gray-700 text-lg">{event.eventStartTime ? moment(event.eventStartTime).format("hh:mm A") : "Not specified"}</p>
                </div>
                <div className="mb-4">
                  <p className="text-yellow-800 font-medium text-lg mb-1">End Time:</p>
                  <p className="text-gray-700 text-lg">{event.eventEndTime ? moment(event.eventEndTime).format("hh:mm A") : "Not specified"}</p>
                </div>
              </div>
              
              {event.eventDescription && (
                <div className="mt-4">
                  <p className="text-yellow-800 font-medium text-lg mb-1">Description:</p>
                  <p className="text-gray-700 text-lg">{event.eventDescription}</p>
                </div>
              )}
            </div>
            
            {/* Tasks - Fixed task display */}
            {event.eventTask && event.eventTask.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M9 11l3 3l8-8" stroke="#D53F8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" stroke="#D53F8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-pink-600">Tasks</h2>
                </div>
                <div className="bg-white bg-opacity-80 p-5 rounded-lg shadow border border-pink-200">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="text-left border-b-2 border-pink-200">
                        <th className="pb-2 text-yellow-800 font-bold">Task</th>
                        <th className="pb-2 text-yellow-800 font-bold">Status</th>
                        <th className="pb-2 text-yellow-800 font-bold">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.eventTask.map((task, taskIndex) => (
                        <tr key={task.id} className={taskIndex % 2 === 0 ? "bg-pink-50 bg-opacity-50" : ""}>
                          <td className="py-2 text-gray-700">{task.name}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              task.priority == "Medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : ""
                            }${
                              task.priority == "High" 
                                ? "bg-red-100 text-red-800" 
                                : ""
                            }${
                              task.priority1 == "Low" 
                                ? "bg-green-100 text-green-800" 
                                : ""
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-2 text-gray-700">{moment(task.dueDate).format("DD MMM, YYYY")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Vendors - Improved spacing */}
            {event.eventVendors && event.eventVendors.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#D53F8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-pink-600">Vendors</h2>
                </div>
                <div className="bg-white bg-opacity-80 p-5 rounded-lg shadow border border-pink-200">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="text-left border-b-2 border-pink-200">
                        <th className="pb-2 text-yellow-800 font-bold">Vendor</th>
                        <th className="pb-2 text-yellow-800 font-bold">Price</th>
                        <th className="pb-2 text-yellow-800 font-bold">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.eventVendors.map((vendor, vendorIndex) => (
                        <tr key={vendor.id} className={vendorIndex % 2 === 0 ? "bg-pink-50 bg-opacity-50" : ""}>
                          <td className="py-2 text-gray-700">{vendor.name}</td>
                          <td className="py-2 text-gray-700">₹ {parseFloat(vendor.price).toLocaleString('en-IN', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}</td>
                          <td className="py-2 text-gray-700">{vendor.unit}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-pink-200 font-medium">
                        <td className="pt-2 text-yellow-800 font-bold">Total</td>
                        <td className="pt-2 text-pink-600 font-bold">₹ {event.eventVendors.reduce((sum, vendor) => 
                          sum + parseFloat(vendor.price), 0).toLocaleString('en-IN', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Page Number - Improved position */}
            <div className="absolute bottom-6 right-10 text-pink-600 font-medium text-lg">
              Page {index + 1} of {events.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTemplate;