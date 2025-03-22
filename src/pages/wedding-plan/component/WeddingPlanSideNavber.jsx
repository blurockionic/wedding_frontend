import { useState } from "react";
import { Search, ChevronRight, XCircle } from "lucide-react";

const weddingEvents = [
  { name: "Hindu Wedding", religion: "Hinduism" },
  { name: "Christian Wedding", religion: "Christianity" },
  { name: "Muslim Wedding", religion: "Islam" },
  { name: "Sikh Wedding", religion: "Sikhism" },
  { name: "Buddhist Wedding", religion: "Buddhism" },
  { name: "Jain Wedding", religion: "Jainism" },
];

const subEvents = {
  Hinduism: [
    "Engagement Ceremony (Sagai)",
    "Mehendi Ceremony",
    "Sangeet Ceremony",
    "Tilak Ceremony",
    "Haldi Ceremony",
    "Roka Ceremony",
    "Wedding Day Ceremonies",
    "Vidaai",
    "Reception",
    "Blessing Ceremony (Aashirvaad)",
    "Dwar Rokai and Griha Pravesh",
    "Mooh Dikhai and Pag Phera",
    "Kaleera Ceremony",
    "Chooda Ceremony",
    "Kanyadaan",
    "Mangal Pheras",
    "Saat Pheras",
    "Sindoor Daan",
    "Mangal Sutra",
    "Griha Pravesh",
  ],
  Christianity: [
    "Processional",
    "Presentation",
    "Moment of Silence",
    "Homily",
    "Prayer",
    "Exchanging of Vows",
    "Unity Ceremony",
    "Exchanging of Rings",
    "Pronouncement",
    "Recessional",
    "Reception",
  ],
  Islam: [
    "Salat al-Istikhara – Prayers to Allah",
    "Imam Zamin – Groom's mother to bless the bride",
    "Mangni – The ring ceremony",
    "Manjha – Haldi Ceremony",
    "Heena aka Mehndi time",
    "Sanchaq – Groom's family visit",
    "Baraat arrival – Here comes the King",
    "Nikah – The Main Ceremony",
    "Fatiha – First verse of holy Quran",
    "Mehar – A contract for life",
    "Arsi Mushraf – See through Mirror",
    "Rukhsat – The Goodbyes",
  ],
  Sikhism: ["Anand Karaj", "Reception"],
  Buddhism: [
    "Decorations",
    "The Couple's Outfits",
    "The Event Coordinator",
    "Meditations and Readings",
    "Vows",
    "Offerings to the Buddha",
    "Blessings by Monks",
  ],
  Jainism: ["Lagna Lekhan", "Mangal Pheras"],
};

const WeddingPlanSideNavbar = ({ handleToSelectSuggestion }) => {
  const [query, setQuery] = useState("Hinduism");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState("Hinduism");
  const [expandedSections, setExpandedSections] = useState({});

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredEvents([]);
    } else {
      const filtered = weddingEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(value.toLowerCase()) ||
          event.religion.toLowerCase().includes(value.toLowerCase()),
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

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Group sub-events into categories (for Hinduism as an example)
  const groupedSubEvents = {
    Hinduism: {
      "Pre-Wedding": [
        "Engagement Ceremony (Sagai)",
        "Mehendi Ceremony",
        "Sangeet Ceremony",
        "Tilak Ceremony",
        "Haldi Ceremony",
        "Roka Ceremony",
      ],
      "Main Ceremony": [
        "Wedding Day Ceremonies",
        "Kanyadaan",
        "Mangal Pheras",
        "Saat Pheras",
        "Sindoor Daan",
        "Mangal Sutra",
      ],
      "Post-Wedding": [
        "Vidaai",
        "Reception",
        "Blessing Ceremony (Aashirvaad)",
        "Dwar Rokai and Griha Pravesh",
        "Mooh Dikhai and Pag Phera",
        "Griha Pravesh",
      ],
      "Bride's Rituals": ["Kaleera Ceremony", "Chooda Ceremony"],
    },
  };

  // For other religions, use the flat list
  const getSubEvents = (religion) => {
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
                  className={`h-4 w-4 transition-transform ${expandedSections[category] ? "rotate-90" : ""}`}
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
          {subEvents[religion].map((event, idx) => (
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
    <aside className="hidden md:flex flex-col w-1/4 border-r border-gray-200 h-screen overflow-hidden bg-white">
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
                className={`inline-block w-3 h-3 rounded-full mr-2 ${religionColors[selectedReligion].split(" ")[0]}`}
              ></span>
              {selectedReligion} Ceremonies
            </h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
              {subEvents[selectedReligion].length} events
            </span>
          </div>
          {getSubEvents(selectedReligion)}
        </div>
      )}
    </aside>
  );
};

export default WeddingPlanSideNavbar;
