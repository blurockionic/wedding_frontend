import { useState } from "react";
import { useSearchVendorsMutation } from "../../redux/adminApiSlice";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

export default function VendorSearch() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [searchVendors, { isLoading, error }] = useSearchVendorsMutation();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await searchVendors({ name, id, serviceType, location }).unwrap();
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch vendors:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#f20574] mb-4">Vendor Search</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-wrap gap-4 p-2 bg-white rounded-2xl shadow-sm mb-6 border border-gray-300">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 min-w-[150px]"
          />
          <span className="bg-gray-300 w-[1px] h-11"></span>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="flex-1 p-2 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 min-w-[150px]"
          />
          <span className="bg-gray-300 w-[1px] h-11"></span>
          <input
            type="text"
            placeholder="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="flex-1 p-2 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 min-w-[150px]"
          />
          <span className="bg-gray-300 w-[1px] h-11"></span>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 p-2 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 min-w-[150px]"
          />
        </div>
        <div className="h-[60px] w-full flex justify-center items-center">
          <div>
            <button type="submit" className="p-3 px-8 bg-[#f20574] text-white rounded-xl flex gap-2">
              <IoSearchOutline className="w-5 h-6 font-semibold"/>Search
            </button>
          </div>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.data.message}</p>}

      {results.length > 0 && (
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border px-2 mt-11">
        <div className="flex w-full justify-between items-center">
          <div className="p-4 text-[20px] font-semibold">
            Vendor List
          </div>
          <div className="h-8 w-[100px] me-6 flex justify-center items-center gap-2 text-[12px] rounded-lg border border-gray-100">
            Monthly <IoIosArrowDown className="text-gray-400"/>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-4 font-medium text-sm">S.No.</th>
                  <th className="py-3 px-4 font-medium text-sm">
                    Name <span className="text-gray-600">↑</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm flex justify-center">
                    ID <span className="text-gray-600">↑</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">Business Name</th>
                  <th className="py-3 px-4 font-medium text-sm">
                    Service Type <span className="text-gray-600">↑</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    Location <span className="text-gray-600">↑</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">Total Views</th>
                  <th className="py-3 px-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((vendor, index) => (
              <tr key={vendor._id.$oid} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{index + 1}.</td>
                <td className="py-3 px-2 text-sm text-gray-700">{vendor.name || "Not Available"}</td>
                {/* Updated: Adjusted ID column styling and truncated long IDs */}
                <td className="py-3 px-4 text-sm text-gray-700 truncate max-w-[150px]">{vendor._id.$oid || "Not Available"}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{vendor.business_name || "Not Available"}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {vendor.service_type.length > 2
                    ? `${vendor.service_type.slice(0, 2).join(", ")}...`
                    : vendor.service_type.join(", ") || "Not Available"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{vendor.location || "Not Available"}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{vendor.totalViews || "Not Available"}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <button className="text-gray-600 hover:text-gray-800">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}