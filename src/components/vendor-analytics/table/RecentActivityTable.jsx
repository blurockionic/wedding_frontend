const RecentActivityTable = ({ recentLead }) => {
  if (!recentLead) return null;
  console.log(recentLead)

  const data = recentLead.map((item) => {
    return {
      serviceName: item?.serviceDetails?.service_name || "N/A",
      username: item?.userDetails?.user_name || "Unknown",
      phoneNumber: item?.userDetails?.phone_number || "N/A",
      category: item?.serviceDetails?.service_type || "N/A",
      city: item?.serviceDetails?.city || "N/A", // Fixed 'ciry' typo
      state: item?.serviceDetails?.state || "N/A",
      status: item?.serviceDetails?.status || "N/A",
      rating: item?.serviceDetails?.rating || "N/A",
    };
  });


  return (
    <div className="mt-3">
      <div className="overflow-x-auto">
        <table className="min-w-full border-b border-gray-300">
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-pink-200 flex flex-row items-center justify-between"
              >
                
                <td className="px-4 py-2 capitalize flex flex-col">
                  <span className="text-[8px] text-gray-500">Service Name</span>
                  <span>{item.serviceName}</span>
                </td>
                <td className="px-4 py-2 capitalize flex flex-col">
                  <span className="text-[8px] text-gray-500">Seen By</span>
                  <span>{item?.phoneNumber}</span>
                </td>
                <td className="px-4 py-2 capitalize flex flex-col">
                  <span className="text-[8px] text-gray-500">Category</span>
                  <span>{item?.category}</span>
                </td>
                <td className="px-4 py-2 capitalize flex flex-col">
                  <span className="text-[8px] text-gray-500">City</span>
                  <span>{item?.city}</span>
                </td>
                <td className="px-4 py-2 capitalize flex flex-col">
                  <span className="text-[8px] text-gray-500">Status</span>
                  <span>{item?.status}</span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
