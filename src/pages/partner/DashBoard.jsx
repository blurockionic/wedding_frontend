import React, { useState, useEffect } from "react";
import { useGetMyLeadQuery } from "../../redux/serviceSlice";
import { format } from "date-fns"; // You can install with `npm i date-fns`
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // You can install with `npm install react-icons`
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

export default function PartnerDashboard() {
  const [city, setCity] = useState("ranchi");
  const { data: myLeads, isLoading, isError, error } = useGetMyLeadQuery(city);
  
  const [myLead, setState] = useState(myLeads?.data || []);
  const [sortBy, setSortBy] = useState("wedding_date"); // default sort by wedding date
  const [sortOrder, setSortOrder] = useState("desc"); // default descending order
  const [searchQuery, setSearchQuery] = useState(""); // state for search input

  // Format the date
  const dateFormats = (dateString) => format(new Date(dateString), "dd MMM yyyy");

  // Sort function
  const sortLeads = (data, sortBy, sortOrder) => {
    return data.sort((a, b) => {
      if (sortBy === "wedding_date") {
        return sortOrder === "asc" 
          ? new Date(a.wedding_date) - new Date(b.wedding_date)
          : new Date(b.wedding_date) - new Date(a.wedding_date);
      } else if (sortBy === "user_name") {
        return sortOrder === "asc"
          ? a.user_name.localeCompare(b.user_name)
          : b.user_name.localeCompare(a.user_name);
      } else if (sortBy === "wedding_location") {
        return sortOrder === "asc"
          ? a.wedding_location.localeCompare(b.wedding_location)
          : b.wedding_location.localeCompare(a.wedding_location);
      }
      return 0;
    });
  };

  // Filter leads based on search query
  const filterLeads = (data, query) => {
    return data.filter(lead => 
      lead.user_name.toLowerCase().includes(query.toLowerCase()) ||
      lead.wedding_location.toLowerCase().includes(query.toLowerCase()) ||
      lead.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    // Sort and filter the leads whenever myLeads, sort criteria, or search query changes
    const sortedLeads = sortLeads(myLeads?.data || [], sortBy, sortOrder);
    setState(filterLeads(sortedLeads, searchQuery));
  }, [myLeads, sortBy, sortOrder, searchQuery]);

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError) return <div className="text-center text-red-600 py-6">Error: {error.message}</div>;

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

      <div className="overflow-x-auto p-4 bg-[#FFF6FE]">
        <table className="w-full text-sm text-center border capitalize border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="py-2 px-4 border bg-white cursor-pointer" onClick={() => handleSort("user_name")}>
                Name {sortBy === "user_name" && (sortOrder === "asc" ? <FaSortDown /> : <FaSortUp />)}
              </th>
              <th className="py-2 px-4 border flex gap-2 bg-white cursor-pointer" onClick={() => handleSort("wedding_date")}>
                Date {sortBy === "wedding_date" && (sortOrder === "asc" ? <ArrowDownWideNarrow /> : <ArrowUpWideNarrow />)}
              </th>
              <th className="py-2 px-4 border bg-white">Email</th>
              <th className="py-2 px-4 border bg-white cursor-pointer" onClick={() => handleSort("wedding_location")}>
                Location {sortBy === "wedding_location" && (sortOrder === "asc" ? <FaSortDown /> : <FaSortUp />)}
              </th>
              <th className="py-2 px-4 border bg-white">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {myLead?.length > 0 ? (
              myLead.map((lead, index) => (
                <tr key={lead.id} className="border bg-white">
                  <td className="py-2 px-4 border bg-white">{index + 1}</td>
                  <td className="py-2 px-4 border bg-white text-gray-600">
                    {dateFormats(lead.wedding_date)}
                  </td>
                  <td className="py-2 px-4 border bg-white">{lead.email}</td>
                  <td className="py-2 px-4 border bg-white">{lead.wedding_location || "N/A"}</td>
                  <td className="py-2 px-4 border bg-white">{lead.phone_number || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan="5" className="text-center capitalize py-4 border bg-white">
                  No Lead Available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
