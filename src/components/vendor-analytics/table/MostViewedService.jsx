import React from "react";

const MostViewedService = ({ mostviewed, colorCodesForChart }) => {
  if (!mostviewed) return null;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px] text-cyan-700 text-md capitalize border-gray-300">
        {/* Table Header */}
        <thead className="bg-gray-100">
          <tr className="text-left font-semibold">
            <th className="py-3 px-6 w-[150px]">Service</th>
            <th className="py-3 px-6 w-[200px]">Service Name</th>
            <th className="py-3 px-6 w-[150px]">Total Lead</th>
            <th className="py-3 px-6 w-[150px]">Total Seen</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {mostviewed.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-pink-200 cursor-pointer "
            >
              {/* Service Indicator */}
              <td className="py-3 px-6 flex items-center gap-4">
                <span
                  style={{ backgroundColor: colorCodesForChart[index] }}
                  className="rounded-md w-8 h-8"
                ></span>
                <span className="flex whitespace-nowrap">Service {index + 1}</span>
              </td>

              {/* Service Name */}
              <td className="py-3 px-6">{item.name}</td>

              {/* Total Leads */}
              <td className="py-3 px-6">{item?.totalLeads}</td>

              {/* Total Views */}
              <td className="py-3 px-6">{item?.totalViews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostViewedService;
