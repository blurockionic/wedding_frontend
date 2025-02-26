import React from 'react'

const MostViewedService = ({mostviewed}) => {
    if (!mostviewed) return null;
  
    
  
    return (
      <div className="mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-full border-b border-gray-300">
            <tbody>
              {mostviewed.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-pink-200 flex flex-row items-center justify-between"
                >
                  
                  <td className="px-4 py-2 capitalize flex flex-col">
                    <span className="text-[8px] text-gray-500">Service Name</span>
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2 capitalize flex flex-col">
                    <span className="text-[8px] text-gray-500">Total Lead</span>
                    <span>{item?.totalLeads}</span>
                  </td>
                  <td className="px-4 py-2 capitalize flex flex-col">
                    <span className="text-[8px] text-gray-500">Total Seen</span>
                    <span>{item?.totalViews}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
export default MostViewedService
