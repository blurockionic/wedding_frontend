import React, { useState, useEffect } from "react";
import { useGetPartnersQuery } from "../../redux/partnerFormSlice"; // Assuming this is your API slice
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"; // You can install with `npm i lucide-react`
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

export default function PartnerAdminDashboard() {
  const {
    data: partnersData,
    isLoading,
    isError,
    error,
  } = useGetPartnersQuery({});

  const [partners, setPartners] = useState(partnersData?.partners || []);
  const [sortBy, setSortBy] = useState("createdAt"); // default sort by createdAt
  const [sortOrder, setSortOrder] = useState("desc"); // default descending order
  const [searchQuery, setSearchQuery] = useState(""); // state for search input
  const [filterStatus, setFilterStatus] = useState(""); // for status filter
  const [filterRole, setFilterRole] = useState(""); // for role filter

  const navigate = useNavigate(); // For navigation

  // Sort function
  const sortPartners = (data, sortBy, sortOrder) => {
    return data.sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "fullName") {
        return sortOrder === "asc"
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      } else if (sortBy === "email") {
        return sortOrder === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      return 0;
    });
  };

  // Filter partners based on search query
  const filterPartners = (data, query, status, role) => {
    return data.filter((partner) => {
      const matchesQuery =
        partner.fullName.toLowerCase().includes(query.toLowerCase()) ||
        partner.email.toLowerCase().includes(query.toLowerCase()) ||
        partner.cityRegion.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status
        ? partner.applicationStatus === status
        : true;
      const matchesRole = role ? partner.role === role : true;

      return matchesQuery && matchesStatus && matchesRole;
    });
  };

  useEffect(() => {
    if (partnersData?.partners) {
      const sortedPartners = sortPartners(
        [...partnersData.partners],
        sortBy,
        sortOrder
      );
      const filtered = filterPartners(
        sortedPartners,
        searchQuery,
        filterStatus,
        filterRole
      );
      setPartners(filtered);
    }
  }, [partnersData, sortBy, sortOrder, searchQuery, filterStatus, filterRole]);
  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600 py-6">
        Error: {error.message}
      </div>
    );

  const handleSort = (field) => {
    const isSameField = sortBy === field;
    setSortBy(field);
    setSortOrder(isSameField && sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mx-auto py-6">
      {/* Search Bar */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, location, or email"
          className="p-2 w-full border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="mb-4 max-w-md mx-auto flex gap-4">
        <select
          className="p-2 w-full border border-gray-300 rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select
          className="p-2 w-full border border-gray-300 rounded-lg"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">Filter by Role</option>
          <option value="EVENT_PLANNER">Event Planner</option>
          <option value="PHOTOGRAPHER">Photographer</option>
          <option value="CATERER">Caterer</option>
          <option value="MAKEUP_ARTIST">Makeup Artist</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="overflow-x-auto p-4 bg-[#FFF6FE]">
        <table className="w-full text-sm text-center border capitalize border-collapse">
          <thead>
            <tr className="bg-white">
              <th
                className="py-2 px-4 border bg-white cursor-pointer"
                onClick={() => handleSort("fullName")}
              >
                Name{" "}
                {sortBy === "fullName" &&
                  (sortOrder === "asc" ? <FaSortDown /> : <FaSortUp />)}
              </th>
              <th
                className="py-2 px-4 border flex gap-2 bg-white cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Date{" "}
                {sortBy === "createdAt" &&
                  (sortOrder === "asc" ? (
                    <ArrowDownWideNarrow />
                  ) : (
                    <ArrowUpWideNarrow />
                  ))}
              </th>
              <th className="py-2 px-4 border bg-white">Email</th>
              <th className="py-2 px-4 border bg-white">City</th>
              <th
                className="py-2 px-4 border   isolate bg-white cursor-pointer"
                onClick={() => handleSort("applicationStatus")}
              >
                <div className="flex items-center gap-1 justify-center">
                  Status
                  {sortBy === "applicationStatus" &&
                    (sortOrder === "asc" ? <FaSortDown /> : <FaSortUp />)}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {partners?.length > 0 ? (
              partners.map((partner, index) => (
                <tr
                  key={partner.id}
                  
                  onClick={() => navigate("../partnerDetail", { state: { partnerDetail: partner } })}
                  className="cursor-pointer hover:bg-gray-100 transition"
              
                >
                  <td className="py-2 px-4 border bg-white">
                    {partner.fullName}
                  </td>
                  <td className="py-2 px-4 border bg-white text-gray-600">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border bg-white">{partner.email}</td>
                  <td className="py-2 px-4 border bg-white">
                    {partner.cityRegion}
                  </td>
                  <td className="py-2 px-4 border bg-white">
                    {partner.applicationStatus}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td
                  colSpan="5"
                  className="text-center capitalize py-4 border bg-white"
                >
                  No Partners Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
