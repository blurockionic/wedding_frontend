import React, { useState } from "react";
import Footer from "../Footer";
import { FaCheckCircle, FaPlus, FaTimes  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ChecklistCategory = ({ title, items, toggleItemState, addItem, removeItem }) => {
  const [newItem, setNewItem] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [removedIndex, setRemovedIndex] = useState(null);

  const handleItemClick = (index) => {
    setClickedIndex(index);
    toggleItemState(title, index);

    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      addItem(title, newItem);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    setRemovedIndex(index);

    setTimeout(() => {
      removeItem(title, index);
      setRemovedIndex(null);
    }, 100);
  };

  return (
    <div 
      className="p-4 bg-white shadow-lg rounded-lg border border-pink-300 break-inside-avoid transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h3 className="text-xl font-semibold text-pink-600 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-2 cursor-pointer group ${
              item.done ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <FaCheckCircle
              className={`transition-all duration-150 ease-in-out ${
                clickedIndex === index ? "scale-125" : ""
              } ${
                item.done
                  ? "text-pink-500 flex-shrink-0"
                  : "text-gray-300 flex-shrink-0 group-hover:text-pink-400"
              }`}
              size={20}
            />
            <span
              className={`flex-grow leading-relaxed transition-all duration-150 ease-in-out ${
                clickedIndex === index ? "scale-105" : ""
              } ${
                item.done
                  ? "line-through opacity-50"
                  : "group-hover:text-pink-600"
              }`}
            >
              {item.name}
            </span>
            {hoveredIndex === index && (
              <FaTimes
                className="transition-all duration-300 ease-in-out text-gray-300 flex-shrink-0 hover:text-pink-600"
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(index);
                }}
              />
            )}
          </li>
        ))}
      </ul>

      
      {/* Add New Item Section */}
      <div
        className={`mt-4 flex items-center space-x-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isHovering ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FaPlus
          className="text-pink-500 hover:text-pink-600 transition cursor-pointer"
          size={20}
          onClick={handleAddItem}
        />
        <input
          type="text"
          placeholder="Add a new item"
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
    </div>
  );
};

const Checklist = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "ContactPage",
    name: "Contact Us",
    description:
      "Contact us to book an appointment or reach out for more information.",
    url: "https://www.marriagevendors.com/contactus",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-6200932331",
      email: "support@blurockionic.com",
      contactType: "Customer Support",
      areaServed: "India",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "joshi nagar ludhiana",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      postalCode: "141001",
      addressCountry: "India",
    },
  };

  const [checklistData, setChecklistData] = useState([
    {
      category: "Venue & Decorations",
      items: [
        { name: "Book the wedding venue", done: false },
        { name: "Confirm the capacity and amenities of the venue", done: false },
        { name: "Select a theme for decorations", done: false },
        { name: "Hire a wedding decorator", done: false },
        { name: "Rent furniture, lighting, and props", done: false },
        { name: "Confirm tent house arrangements", done: false },
        { name: "Book florists for floral arrangements", done: false },
      ],
    },
    {
      category: "Catering & Cakes",
      items: [
        { name: "Shortlist catering services", done: false },
        { name: "Finalize the menu", done: false },
        { name: "Schedule food tasting with caterers", done: false },
        { name: "Decide on beverages", done: false },
        { name: "Order the wedding cake", done: false },
      ],
    },
    {
      category: "Photography & Videography",
      items: [
        { name: "Hire photographers (traditional and candid)", done: false },
        { name: "Hire videographers for event coverage", done: false },
        { name: "Book a photobooth with props", done: false },
        { name: "Discuss pre-wedding shoot requirements", done: false },
        { name: "Confirm delivery timeline for photos and videos", done: false },
      ],
    },
    {
      category: "Music & Entertainment",
      items: [
        { name: "Book a wedding DJ or live band", done: false },
        { name: "Choose the type of music for each function", done: false },
        { name: "Plan entertainment performances", done: false },
        { name: "Arrange sound and lighting equipment", done: false },
      ],
    },
    {
      category: "Invitations & Gifts",
      items: [
        { name: "Finalize the design of wedding invitations", done: false },
        { name: "Choose digital or printed invitations", done: false },
        { name: "Order wedding gifts or return favors", done: false },
        { name: "Create a guest list and send out invitations", done: false },
      ],
    },
    {
      category: "Transport & Logistics",
      items: [
        { name: "Book transportation for the wedding party and guests", done: false },
        { name: "Arrange parking space at the venue", done: false },
        { name: "Plan transportation for out-of-town guests", done: false },
      ],
    },
    {
      category: "Religious & Cultural Services",
      items: [
        { name: "Book a pandit or religious officiant", done: false },
        { name: "Arrange for pooja items or ceremony essentials", done: false },
        { name: "Consult astrologers (if required for muhurat or compatibility checks)", done: false },
      ],
    },
    {
      category: "Planning & Coordination",
      items: [
        { name: "Hire a wedding planner or coordinator", done: false },
        { name: "Prepare a timeline for each event", done: false },
        { name: "Assign point-of-contact roles to key people", done: false },
        { name: "Schedule vendor meetings and walkthroughs", done: false },
      ],
    },
    {
      category: "Miscellaneous",
      items: [
        { name: "Arrange for a bridal makeup artist and hairstylist", done: false },
        { name: "Confirm the attire for bride, groom, and close family members", done: false },
        { name: "Prepare an emergency kit", done: false },
        { name: "Ensure backup power or generators at the venue", done: false },
      ],
    },
  ]);

  const toggleItemState = (categoryTitle, itemIndex) => {
    setChecklistData((prevData) =>
      prevData.map((category) =>
        category.category === categoryTitle
          ? {
              ...category,
              items: category.items.map((item, index) =>
                index === itemIndex
                  ? { ...item, done: !item.done }
                  : item
              ),
            }
          : category
      )
    );
  };

  const addItem = (categoryTitle, itemName) => {
    setChecklistData((prevData) =>
      prevData.map((category) =>
        category.category === categoryTitle
          ? {
              ...category,
              items: [...category.items, { name: itemName, done: false }],
            }
          : category
      )
    );
  };

  const removeItem = (categoryTitle, itemIndex) => {
    setChecklistData((prevData) =>
      prevData.map((category) =>
        category.category === categoryTitle
          ? {
              ...category,
              items: category.items.filter((_, index) => index !== itemIndex),
            }
          : category
      )
    );
  };

  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Checklist - Book an Appointment</title>
        <meta
          name="description"
          content="Contact us to book an appointment or reach out for more information."
        />
        <meta name="author" content="Wedding Vendors" />
        <link rel="canonical" href="https://www.marriagevendors.com/contactus" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Outer container */}
      <div className="max-w-7xl px-2 lg:px-10 mx-auto py-10">
        {/* Title Section */}
        <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Wedding Checklist
        </div>

        {/* Tiles Layout for Checklist */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          style={{
            columnGap: "2rem",
          }}
        >
          {checklistData.map((category, index) => (
            <ChecklistCategory
              key={index}
              title={category.category}
              items={category.items}
              toggleItemState={toggleItemState}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Checklist;
