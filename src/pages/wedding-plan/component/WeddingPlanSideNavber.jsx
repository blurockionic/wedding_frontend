import { useState } from "react";

const weddingEvents = [
  { name: "Hindu Wedding", religion: "Hinduism" },
  { name: "Christian Wedding", religion: "Christianity" },
  { name: "Muslim Wedding", religion: "Islam" },
  { name: "Sikh Wedding", religion: "Sikhism" },
  { name: "Buddhist Wedding", religion: "Buddhism" },
  { name: "Jain Wedding", religion: "Jainism" },
];

const subEvents = {
  Hinduism: ["Haldi Ceremony", "Mehendi Function", "Sangeet Night"],
  Christianity: ["Bridal Shower", "Wedding Mass", "Reception"],
  Islam: ["Nikah Ceremony", "Walima Reception"],
  Sikhism: ["Anand Karaj", "Reception"],
  Buddhism: ["Buddhist Blessing Ceremony"],
  Jainism: ["Lagna Lekhan", "Mangal Pheras"],
};

const WeddingPlanSideNavber = () => {
  const [query, setQuery] = useState("Hinduism");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState("Hinduism");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredEvents([]);
      setSelectedReligion(null);
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

  return (
    <aside className="hidden md:block w-96 h-auto  border-r text-primary p-4">
      <h2 className="text-xl font-semibold mb-4">Wedding Plan</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search wedding events..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 text-black rounded-md outline-none"
      />

      {/* Suggestions List */}
      {filteredEvents.length > 0 && (
        <ul className="mt-2 bg-white text-black rounded-md shadow-lg">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectEvent(event.religion)}
            >
              {event.name} ({event.religion})
            </li>
          ))}
        </ul>
      )}

      {/* Sub-Events List */}
      {selectedReligion && subEvents[selectedReligion] && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Events ({selectedReligion})</h3>
          <ul className="bg-gray-50 p-2 rounded-md">
            {subEvents[selectedReligion].map((subEvent, index) => (
              <li key={index} className="p-1 border-b border-gray-200 last:border-none cursor-pointer">
                {subEvent}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default WeddingPlanSideNavber;
