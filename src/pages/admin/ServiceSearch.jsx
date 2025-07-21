import { useState } from "react";
import { useSearchServicesMutation } from "../../redux/adminApiSlice";
import SearchComponent from "../../components/admin-chart/SearchComponent.jsx";

export default function ServiceSearch() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchServices, { isLoading, error }] = useSearchServicesMutation();

  const fields = [
    { label: "Name", placeholder: "Name", key: "serviceName" },
    { label: "Vendor ID", placeholder: "Vendor ID", key: "vendorId" },
    { label: "Service Type", placeholder: "Service Type", key: "serviceType" },
    { label: "Location", placeholder: "Location", key: "location" },
  ];

  const tableHeaders = [
    { label: "Name", key: "service_name" },
    { label: "Vendor ID", key: ["vendorId", "$oid"] },
    { label: "Service Type", key: "service_type" },
    { label: "Location", key: "location" },
    { label: "Total Views", key: "totalViews" },
    { label: "Average Rating", key: "averageRating" },
  ];

  const sortOptions = [
    { label: "Views", value: "views" },
    { label: "Average Rating", value: "rating" },
  ];

  const handleSearch = async (formData) => {
    try {
      const response = await searchServices(formData).unwrap();
      setResults(response.data);
      setCurrentPage(1); 
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <SearchComponent
      title="Service Search"
      fields={fields}
      tableHeaders={tableHeaders}
      onSearch={handleSearch}
      results={currentResults}
      isLoading={isLoading}
      error={error}
      sortOptions={sortOptions}
      locationFormat="object"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={results.length}
    />
  );
}