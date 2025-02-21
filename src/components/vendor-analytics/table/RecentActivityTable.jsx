
const RecentActivityTable = ({recentLead}) => {

  console.log(recentLead)
  if(!recentLead) return null

  // const data =  recentLead?.map((item) => {
  //    return {
  //     serviceName: item?.serviceDetails?.service_name,
  //     date: item.updatedAt.split("T")[0],
  //     username: item?.userDetails?.user_name,
  //     phoneNumber: item?.userDetails?.phone_number,
  //    }
  // })


  return (
    <div className="mt-3 ">
      <div className="overflow-x-auto">
        <table className="min-w-full border-b border-gray-300">
          {/* <thead className="bg-primary">
            <tr>
              <th className="px-4 py-2 text-left text-white font-semibold">
                 Name
              </th>
              <th className="px-4 py-2 text-left text-white font-semibold">
                Service Name
              </th>
              <th className="px-4 py-2 text-left text-white font-semibold">
                Phone Number
              </th>
              <th className="px-4 py-2 text-left text-white font-semibold">
                Date
              </th>
            </tr>
          </thead> */}
          <tbody>
            {recentLead.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-pink-200 flex flex-row items-center justify-between">
              <td className="px-4 py-2 capitalize flex flex-col">
                <span className="text-xs text-gray-500">Service Name</span>
                <span>{item.name}</span>
              </td>
              <td className="px-4 py-2 capitalize flex flex-col">
                <span className="text-xs text-gray-500">Category</span>
                <span>{item.category}</span> {/* Fixed field */}
              </td>
              <td className="px-4 py-2 capitalize flex flex-col">
                <span className="text-xs text-gray-500">Location</span>
                <span>{item.location}</span> {/* Fixed field */}
              </td>
              <td className="px-4 py-2 capitalize flex flex-col">
                <span className="text-xs text-gray-500">Status</span>
                <span>{item.status}</span> {/* Fixed field */}
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
