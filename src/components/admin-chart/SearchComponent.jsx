import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SearchComponent = ({ 
  title, 
  fields, 
  tableHeaders, 
  onSearch, 
  results, 
  isLoading, 
  error, 
  sortOptions, 
  locationFormat = "string",
  currentPage,
  totalPages,
  onPageChange,
  totalItems
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {})
  );
  const [sortBy, setSortBy] = useState(sortOptions ? sortOptions[0].value : "");

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ...formData, sortBy });
  };

  const getNestedValue = (obj, keyPath, fallback = "Not Available") => {
    if (!obj) return fallback;
    if (typeof keyPath === "string") {
      return obj[keyPath] !== undefined && obj[keyPath] !== null ? obj[keyPath] : fallback;
    }
    return keyPath.reduce((current, key) => (current && current[key] ? current[key] : fallback), obj);
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      
      if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#f20574] mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4 p-2 bg-white rounded-2xl shadow-sm mb-6 border border-gray-300">
          {fields.map((field , index) => (
            <div key={field.key} className="flex min-w-[150px] items-center">
              <input
                type="text"
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="flex p-2 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 min-w-[330px]"
              />
              {index !== fields.length - 1 && (
                <span className="bg-gray-300 h-10 w-[1px]"></span>
              )}
            </div>
          ))}
        </div>
        {sortOptions && (
          <div className="flex justify-end mb-4 -mt-2">
            <div className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 rounded-md border-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mb-6">
          <button type="submit" className="p-3 px-8 bg-[#f20574] text-white rounded-xl flex gap-2">
            <IoSearchOutline className="w-5 h-6 font-semibold" /> Search
          </button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.data?.message || "An error occurred"}</p>}

      {results.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border px-2 mt-11">
          <div className="flex w-full justify-between items-center">
            <div className="p-4 text-[20px] font-semibold">{title} List</div>
            <div className="h-8 w-[100px] me-6 flex justify-center items-center gap-2 text-[12px] rounded-lg border border-gray-100">
              Monthly <IoIosArrowDown className="text-gray-400" />
            </div>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4 font-medium text-sm">S.No.</th>
                {tableHeaders.map((header) => (
                  <th key={header.label} className="py-3 px-4 font-medium text-sm">
                    {header.label} <span className="text-gray-600">↑</span>
                  </th>
                ))}
                <th className="py-3 px-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={item._id?.$oid || index} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {(currentPage - 1) * 10 + index + 1}.
                  </td>
                  {tableHeaders.map((header) => (
                    <td
                      key={header.label}
                      className={`py-3 px-4 text-sm text-gray-700 ${
                        header.key === "id" || (Array.isArray(header.key) && header.key.includes("$oid"))
                          ? "truncate max-w-[150px]"
                          : ""
                      }`}
                    >
                      {header.key === "service_type" || (Array.isArray(header.key) && header.key.includes("service_type"))
                        ? Array.isArray(getNestedValue(item, header.key, header.fallback))
                          ? getNestedValue(item, header.key, header.fallback).length > 2
                            ? `${getNestedValue(item, header.key, header.fallback).slice(0, 2).join(", ")}...`
                            : getNestedValue(item, header.key, header.fallback).join(", ")
                          : getNestedValue(item, header.key, header.fallback)
                        : header.key === "location" || (Array.isArray(header.key) && header.key.includes("location"))
                        ? locationFormat === "object"
                          ? item.city
                            ? `${item.city}, ${item.state}, ${item.country}`
                            : header.fallback || "Not Available"
                          : getNestedValue(item, header.key, header.fallback)
                        : getNestedValue(item, header.key, header.fallback)}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button className="text-gray-600 hover:text-gray-800">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing {Math.min((currentPage - 1) * 10 + 1, totalItems)} to{" "}
                {Math.min(currentPage * 10, totalItems)} of {totalItems} entries
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  <IoIosArrowBack className="text-gray-600" />
                </button>
                
                {renderPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`w-8 h-8 rounded-md text-sm ${
                        currentPage === page
                          ? 'bg-[#f20574] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      {page}
                    </span>
                  )
                ))}
                
                <button
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  <IoIosArrowForward className="text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;