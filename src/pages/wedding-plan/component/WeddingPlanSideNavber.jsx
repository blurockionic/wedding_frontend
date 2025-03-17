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
  Hinduism: [
    "Engagement Ceremony (Sagai)",
    "Mehendi Ceremony",
    "Sangeet Ceremony",
    "Tilak Ceremony",
    "Haldi Ceremony",
    "Roka Ceremony",
    "Wedding Day Ceremonies",
    " Vidaai",
    "Reception",
    "Blessing Ceremony (Aashirvaad)",
    "Dwar Rokai and Griha Pravesh",
    "Mooh Dikhai and Pag Phera:",
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
  ],
  Islam: ["Salat al-Istikhara – Prayers to Allah",
   " Imam Zamin – Groom’s mother to bless the bride",
   " Mangni – The ring ceremony",
    "Manjha – Haldi Ceremony",
    "Heena aka Mehndi time",
   " Sanchaq – Groom’s family visit",
   " Baraat arrival – Here comes the King",
    "Nikah – The Main Ceremony",
    "Fatiha – First verse of holy Quran",
    "Mehar – A contract for life",
    "Arsi Mushraf – See through Mirror",
    "Rukhsat – The Goodbyes"
    ],
  Sikhism: ["Anand Karaj", "Reception"],
  Buddhism: [
    "Decorations",
    "The Couple’s Outfits",
    "The Event Coordinator",
    "Meditations and Readings",
    "Vows",
    "Offerings to the Buddha",
    "Blessings by Monks"
    ],
  Jainism: ["Lagna Lekhan", "Mangal Pheras"],
};

const WeddingPlanSideNavber = ({ handleToSelectSuggestion }) => {
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
    <aside className="hidden md:block w-[20%]  h-auto  border-r text-black p-4">
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
          <h3 className="text-lg font-semibold mb-2">
            Suggested Events ({selectedReligion})
          </h3>
          <ul className="bg-gray-50 p-2 rounded-md">
            {subEvents[selectedReligion].map((subEvent, index) => (
              <li
                key={index}
                onClick={() => handleToSelectSuggestion(subEvent)}
                className=" border-primary w-full my-1 cursor-pointer inline-flex items-center justify-start gap-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-[#F5F5F5] hover:text-primary h-9 rounded-md px-3 group text-sm"
              >
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
