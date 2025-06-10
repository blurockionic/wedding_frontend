import { useState } from "react";
import { useSearchUsersMutation } from "../../redux/adminApiSlice";
import SearchComponent from "../../components/admin-chart/SearchComponent.jsx";

export default function UserSearch() {
  const [results, setResults] = useState([]);
  const [searchUsers, { isLoading, error }] = useSearchUsersMutation();

  const fields = [
    { label: "Name", placeholder: "Name", key: "name" },
    { label: "Email", placeholder: "Email", key: "email" },
    { label: "Phone Number", placeholder: "Phone Number", key: "phoneNumber" },
    { label: "Location", placeholder: "Location", key: "location" },
  ];

  const tableHeaders = [
    { label: "Name", key: "user_name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone_number" },
    { label: "Location", key: "wedding_location" },
    { label: "Role", key: "role" },
    { label: "Joining Date", key: "created_at" },
  ];

  const handleSearch = async (formData) => {
    try {
      const response = await searchUsers(formData).unwrap();
      setResults(response.data.map((user) => ({
        ...user,
        created_at: user.created_at ? user.created_at.slice(0, 10) : "Not Available",
        _id: { $oid: user.id },
      })));
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  return (
    <SearchComponent
      title="User Search"
      fields={fields}
      tableHeaders={tableHeaders}
      onSearch={handleSearch}
      results={results}
      isLoading={isLoading}
      error={error}
      locationFormat="string"
    />
  );
}