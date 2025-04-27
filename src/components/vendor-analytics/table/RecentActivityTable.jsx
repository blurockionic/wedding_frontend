import React from "react";
import { dateFormats } from "../../../static/helper";

const RecentActivityTable = ({ recentLead }) => {
  if (!recentLead) return null;

  // Sort by updatedAt in descending order (most recent first)
  const sortedData = [...recentLead].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );


  const data = sortedData.map((item) => ({
    serviceName: item?.serviceDetails?.service_name || "N/A",
    username: item?.userDetails?.user_name || "Unknown",
    phoneNumber: item?.userDetails?.phone_number || "N/A",
    category: item?.serviceDetails?.service_type || "N/A",
    city: item?.serviceDetails?.city || "N/A",
    state: item?.serviceDetails?.state || "N/A",
    date: dateFormats(item?.updatedAt) || "",
  }));

  return (
    <div className="mt-3 w-full overflow-x-auto">
      <table className="min-w-[600px] w-full text-gray-800">
        {/* Table Header */}
        <thead>
      <tr className="">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Service Name</th>
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Phone Number</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">City</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-pink-200">
              <td className="px-6 py-3 text-left">{item.date}</td>
              <td className="px-6 py-3 text-left">{item.serviceName}</td>
              <td className="px-6 py-3 text-left">{item.username}</td>
              <td className="px-6 py-3 text-left">{item.phoneNumber}</td>
              <td className="px-6 py-3 text-left">{item.category}</td>
              <td className="px-6 py-3 text-left">{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
