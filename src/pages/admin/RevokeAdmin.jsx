import { useState } from "react";
import { useRevokeAdminMutation } from "../../redux/adminApiSlice";

export default function RevokeAdmin() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState([]);
  const [revokeAdmin, { isLoading, error }] = useRevokeAdminMutation();

  const handleRevokeAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await revokeAdmin(email).unwrap();
      setResults(response.message);
    } catch (err) {
      console.error("Failed to convert into admin:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">Revoke Admin</h2>
      <form onSubmit={handleRevokeAdmin} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
          {results}
        </p>
      )}
    </div>
  );
}