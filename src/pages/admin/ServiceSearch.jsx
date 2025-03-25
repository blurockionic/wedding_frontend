import { useState } from "react";
import { useSearchServicesMutation } from "../../redux/adminApiSlice";

export default function ServiceSearch() {
  const [serviceName, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setsortBy] = useState("views");
  const [results, setResults] = useState([]);
  const [searchServices, { isLoading, error }] = useSearchServicesMutation();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await searchServices({ serviceName, serviceType, location, sortBy }).unwrap();
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">Service Search</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={serviceName}
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
          <label>
            Sort By: 
            <select name="Sort By" value={sortBy} onChange={(e) => setsortBy(e.target.value)} className="m-2 border border-gray-300 rounded">
              <option value="views">Views</option>
              <option value="rating">Average Rating</option>
            </select>
          </label>
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
              <th className="py-2 px-4 border-b">Service Type</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Total Views</th>
              <th className="py-2 px-4 border-b">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {results.map((service) => (
              <tr key={service._id.$oid}>
                <td className="py-2 px-4 border-b">{service.service_name}</td>
                <td className="py-2 px-4 border-b">{service.service_type}</td>
                <td className="py-2 px-4 border-b">
                  {service.city + ", " + service.state + ", " + service.country}
                </td>
                <td className="py-2 px-4 border-b">{service.totalViews}</td>
                <td className="py-2 px-4 border-b">{service.averageRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}