import { useState } from "react";
import { useSearchVendorsMutation } from "../../redux/adminApiSlice";
import SearchComponent from "../../components/admin-chart/SearchComponent.jsx";

export default function VendorSearch() {
  const [results, setResults] = useState([]);
  const [searchVendors, { isLoading, error }] = useSearchVendorsMutation();

  const fields = [
    { label: "Name", placeholder: "Name", key: "name" },
    { label: "ID", placeholder: "ID", key: "id" },
    { label: "Service Type", placeholder: "Service Type", key: "serviceType" },
    { label: "Location", placeholder: "Location", key: "location" },
  ];

  const tableHeaders = [
    { label: "Name", key: "name" },
    { label: "ID", key: ["_id", "$oid"] }, // Updated to use array for nested access
    { label: "Business Name", key: "business_name" },
    { label: "Service Type", key: "service_type" },
    { label: "Location", key: "location" },
    { label: "Total Views", key: "totalViews" },
  ];

  const handleSearch = async (formData) => {
    try {
      const response = await searchVendors(formData).unwrap();
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch vendors:", err);
    }
  };

  return (
    <SearchComponent
      title="Vendor Search"
      fields={fields}
      tableHeaders={tableHeaders}
      onSearch={handleSearch}
      results={results}
      isLoading={isLoading}
      error={error}
    />
  );
}