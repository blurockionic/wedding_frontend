import { useState } from "react";
import { useSearchVendorsMutation } from "../../redux/adminApiSlice";

export default function VendorSearch() {
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [searchVendors, { isLoading, error }] = useSearchVendorsMutation();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await searchVendors({ name, serviceType, location }).unwrap();
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch vendors:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">Vendor Search</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-pink-600 text-white rounded">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.data.message}</p>}

      {results.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Business Name</th>
              <th className="py-2 px-4 border-b">Service Type</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Total Views</th>
            </tr>
          </thead>
          <tbody>
            {results.map((vendor) => (
              <tr key={vendor._id.$oid}>
                <td className="py-2 px-4 border-b">{vendor.name}</td>
                <td className="py-2 px-4 border-b">{vendor.business_name}</td>
                <td className="py-2 px-4 border-b">
                  {vendor.service_type.length > 2
                    ? `${vendor.service_type.slice(0, 2).join(", ")}...`
                    : vendor.service_type.join(", ")}
                </td>
                <td className="py-2 px-4 border-b">{vendor.location}</td>
                <td className="py-2 px-4 border-b">{vendor.totalViews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}