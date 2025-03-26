import { useState } from "react";
import { Search, ChevronRight, XCircle } from "lucide-react";
import {
  groupedSubEvents,
  subEvents,
  weddingEvents,
} from "./sub-event/WeddingData";

const WeddingPlanSideNavbar = ({ handleToSelectSuggestion }) => {
  const [query, setQuery] = useState("Hinduism");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState("Hinduism");
 

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredEvents([]);
    } else {
      const filtered = weddingEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(value.toLowerCase()) ||
          event.religion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleSelectEvent = (religion) => {
    setSelectedReligion(religion);
    setQuery(religion);
    setFilteredEvents([]);
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredEvents([]);
  };

 

  // Pick a color for each religion
  const religionColors = {
    Hinduism: "bg-orange-100 border-orange-300 text-orange-700",
    Christianity: "bg-blue-100 border-blue-300 text-blue-700",
    Islam: "bg-green-100 border-green-300 text-green-700",
    Sikhism: "bg-yellow-100 border-yellow-300 text-yellow-700",
    Buddhism: "bg-purple-100 border-purple-300 text-purple-700",
    Jainism: "bg-pink-100 border-pink-300 text-pink-700",
  };

  return (
    <aside className="    border-r border-gray-200  bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Wedding Planner</h2>
        <p className="text-sm text-gray-500">Explore cultural wedding events</p>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-100 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search wedding traditions..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-10 pr-8 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none transition-all"
          />
          {query && (
            <XCircle
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      {/* Wedding Types */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Wedding Types
        </h3>
        <div className="flex flex-wrap gap-2">
          {weddingEvents.map((event) => (
            <button
              key={event.religion}
              onClick={() => handleSelectEvent(event.religion)}
              className={`px-3 py-1 text-xs rounded-full border ${
                selectedReligion === event.religion
                  ? `${religionColors[event.religion]} border-2`
                  : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
              } transition-all`}
            >
              {event.religion}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions List */}
      {filteredEvents.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Search Results
          </h3>
          <ul className="bg-white rounded-md">
            {filteredEvents.map((event, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors text-gray-700"
                onClick={() => handleSelectEvent(event.religion)}
              >
                {event.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub-Events List */}
      {selectedReligion && subEvents[selectedReligion] && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  religionColors[selectedReligion].split(" ")[0]
                }`}
              ></span>
              {selectedReligion} Ceremonies
            </h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
              {subEvents[selectedReligion].length} events
            </span>
          </div>
          <GetSubEvents
            handleToSelectSuggestion={handleToSelectSuggestion}
            selectedReligion={selectedReligion}
          />
        </div>
      )}
    </aside>
  );
};

export default WeddingPlanSideNavbar;
const GetSubEvents = ({ selectedReligion: religion, handleToSelectSuggestion }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (religion === "Hinduism" && groupedSubEvents[religion]) {
    return (
      <>
        {Object.keys(groupedSubEvents[religion]).map((category) => (
          <div key={category} className="mb-3">
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-100 px-3 py-2 rounded-md mb-1 hover:bg-gray-200"
              onClick={() => toggleSection(category)}
            >
              <span className="font-medium text-gray-700">{category}</span>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  expandedSections[category] ? "rotate-90" : ""
                }`}
              />
            </div>

            {expandedSections[category] && (
              <ul className="pl-2 pt-1">
                {groupedSubEvents[religion][category].map((event, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleToSelectSuggestion(event)}
                    className="px-3 py-2 my-1 text-sm rounded-md cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center text-gray-700"
                  >
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {event}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </>
    );
  } else {
    return (
      <ul className="pl-1 pt-1">
        {subEvents[religion]?.map((event, idx) => (
          <li
            key={idx}
            onClick={() => handleToSelectSuggestion(event)}
            className="px-3 py-2 my-1 text-sm rounded-md cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center text-gray-700"
          >
            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
            {event}
          </li>
        ))}
      </ul>
    );
  }
};