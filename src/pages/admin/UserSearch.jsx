import React, { useState } from "react";
import { useSearchUsersMutation } from "../../redux/adminApiSlice";

export default function UserSearch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [results, setResults] = useState([]);
  const [searchUsers, { isLoading, error }] = useSearchUsersMutation();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await searchUsers({ name, email, location, phoneNumber }).unwrap();
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">User Search</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Location</th>              
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.user_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone_number}</td>
                <td className="py-2 px-4 border-b">{user.wedding_location}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{user.created_at}</td>              
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}