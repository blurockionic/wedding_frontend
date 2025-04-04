import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetImagesForTemplateQuery } from "../../redux/cloudinaryApiSlice";

// SearchBar Component
const SearchBar = ({ setSearchQuery }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search Elements..."
      className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
    />
  </div>
);

// DesignItem Component
const DesignItem = ({ design, addDesignElement }) => (
  <div
    key={design.id}
    className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex-shrink-0"
    onClick={() => addDesignElement(design)}
  >
    <img
      src={design.src || design.url}
      alt={design.name || design.public_id}
      className="w-16 h-16 object-contain"
    />
    <span className="text-xs text-center block mt-1 ">
      {design.name ? design.name.slice(0, 6) : ""}
    </span>
  </div>
);


const DesignList = ({ name, type, designs, addDesignElement, refMap, searchQuery }) => {
  const ref = useRef(null);
  refMap.current[type] = ref;

  const filteredDesigns = designs
    .filter((design) => design.type === type)
    .filter((design) => design.name?.toLowerCase().includes(searchQuery));

  return (
    filteredDesigns.length > 0 && (
      <div key={type} className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-purple-500">{name}</h3>
        <div className="relative flex items-center">
          <button
            onClick={() => ref.current.scrollBy({ left: -200, behavior: "smooth" })}
            className="absolute -left-2 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4"
          >
            <FaArrowLeft className="w-3 h-3" />
          </button>
          <div ref={ref} className="flex space-x-2 overflow-hidden pb-2 scroll-smooth w-full px-10">
            {filteredDesigns.map((design) => (
              <DesignItem key={design.id} design={design} addDesignElement={addDesignElement} />
            ))}
          </div>
          <button
            onClick={() => ref.current.scrollBy({ left: 200, behavior: "smooth" })}
            className="absolute -right-3 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4"
          >
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  );
};

// ElementsSection Component (Main Container)
const ElementsSection = ({ designs: parentDesigns, addDesignElement }) => {
  const refMap = useRef({});
  const { data } = useGetImagesForTemplateQuery("admin_assets");

  const [designs, setDesigns] = useState(parentDesigns);
  const [searchQuery, setSearchQuery] = useState("");

  const designTypes = [
    { name: "Flowers", type: "flower" },
    { name: "Borders", type: "border" },
    { name: "Simple", type: "simple" },
    { name: "Wallpaper", type: "wallpaper" },
    { name: "Decoration", type: "decoration" },
    { name: "Background", type: "background" },
    { name: "Texture", type: "texture" },
  ];

  useEffect(() => {
    if (data?.images) {
      setDesigns((prevDesigns) => {
        const validTypes = new Set(designTypes.map(({ type }) => type));
        const newDesigns = data.images.flatMap((image) =>
          image.tags
            .filter((tag) => validTypes.has(tag))
            .map((tag) => ({ ...image, type: tag }))
        );
        return Array.from(
          new Map([...prevDesigns, ...newDesigns].map((item) => [item.id, item])).values()
        );
      });
    }
  }, [data?.images]);

  return (
    <div className="h-screen text-black overflow-y-auto bg-white w-full">
      <div className="p-4">
        <SearchBar setSearchQuery={setSearchQuery} />
        {designTypes.map(({ name, type }) => (
          <DesignList
            key={type}
            name={name}
            type={type}
            designs={designs}
            addDesignElement={addDesignElement}
            refMap={refMap}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementsSection;
