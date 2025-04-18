import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCircle, FaSquare } from "react-icons/fa";
import { RiRectangleFill } from "react-icons/ri";
import {
  BsFillTriangleFill,
  BsFillPentagonFill,
  BsFillDiamondFill,
  BsFillOctagonFill,
} from "react-icons/bs";
import { MdHexagon, MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { X } from "lucide-react";
import {
  useDeleteImagesForTemplateMutation,
  useGetImagesForTemplateQuery,
} from "../../redux/cloudinaryApiSlice";

// 🔍 SearchBar Component
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

// 🎨 Design Item Component
const DesignItem = ({ design, addDesignElement, onDelete }) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex-shrink-0"
      onClick={() => addDesignElement(design)}
    >
      {typeof design.url === "string" ? (
        <img
          src={design.src || design.url}
          alt={design.name || design.public_id}
          className="w-16 h-16 object-contain"
        />
      ) : (
        <div className="w-16 h-16 flex items-center justify-center">
          {design.src}
        </div>
      )}
      <span className="text-xs text-center block mt-1">
        {design.name ? design.name.slice(0, 6) : ""}
      </span>
      {design.public_id && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onDelete(design.public_id, design.id);
          }}
          className="absolute top-4 right-1 bg-red-500 text-white rounded-full p-1"
        >
          <X size={10} />
        </span>
      )}
    </div>
  );
};

// 📃 Design List per Type Section
const DesignList = ({
  name,
  type,
  designs,
  addDesignElement,
  refMap,
  searchQuery,
  onDelete,
}) => {
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
            onClick={() =>
              ref.current.scrollBy({ left: -200, behavior: "smooth" })
            }
            className="absolute -left-2 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4"
          >
            <FaArrowLeft className="w-3 h-3" />
          </button>
          <div
            ref={ref}
            className="flex space-x-2 overflow-hidden pb-2 scroll-smooth w-full px-10"
          >
            {filteredDesigns.map((design) => (
              <DesignItem
                key={design.id}
                design={design}
                addDesignElement={addDesignElement}
                onDelete={onDelete}
              />
            ))}
          </div>
          <button
            onClick={() =>
              ref.current.scrollBy({ left: 200, behavior: "smooth" })
            }
            className="absolute -right-3 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4"
          >
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  );
};

// 🌟 Elements Section (Main Component)
const ElementsSection = ({ designs: parentDesigns, addDesignElement }) => {
  const refMap = useRef({});
  const { data } = useGetImagesForTemplateQuery("admin_assets");
  const [deleteImage] = useDeleteImagesForTemplateMutation();

  const [designs, setDesigns] = useState(parentDesigns);
  const [searchQuery, setSearchQuery] = useState("");

  const shapes = [
    { id: 101, type: "shape", src: <FaCircle size={70} />, name: "Circle" },
    { id: 102, type: "shape", src: <FaSquare size={60} />, name: "Square" },
    { id: 103, type: "shape", src: <RiRectangleFill size={70} />, name: "Rectangle" },
    { id: 104, type: "shape", src: <BsFillTriangleFill size={70} />, name: "Triangle" },
    { id: 105, type: "shape", src: <BsFillPentagonFill size={60} />, name: "Pentagon" },
    { id: 106, type: "shape", src: <MdHexagon size={80} />, name: "Hexagon" },
    { id: 107, type: "shape", src: <MdOutlineStarPurple500 size={70} />, name: "Star" },
    { id: 108, type: "shape", src: <FaLocationPin size={60} />, name: "Location" },
    { id: 109, type: "shape", src: <BsFillDiamondFill size={70} />, name: "Diamond" },
    { id: 110, type: "shape", src: <BsFillOctagonFill size={70} />, name: "Octagon" },
  ];

  const designTypes = [
    { name: "Background", type: "background" },
    { name: "Flower", type: "flower" },
    { name: "Pattern", type: "pattern" },
    { name: "Border", type: "border" },
    { name: "Couple", type: "couple" },
    { name: "Decoration", type: "decoration" },
    { name: "Texture", type: "texture" },
    { name: "Shapes", type: "shape" },
    { name: "Nature", type: "nature" },
    { name: "Animals", type: "animals" },
    { name: "Sticker", type: "sticker" },
    { name: "Wallpaper", type: "wallpaper" },
    { name: "Birthday", type: "birthday" },
  ];

  useEffect(() => {
    const validTypes = new Set(designTypes.map(({ type }) => type));
    const newDesigns = data?.images
      ? data.images.flatMap((image) =>
          image.tags
            .filter((tag) => validTypes.has(tag))
            .map((tag) => ({ ...image, type: tag }))
        )
      : [];
    setDesigns(() => {
      const combined = [...newDesigns, ...shapes];
      return Array.from(new Map(combined.map((item) => [item.id || item.public_id, item])).values());
    });
  }, [data?.images]);

  const handleDelete = async (public_id, id) => {
    try {
      await deleteImage({ public_id }).unwrap();
      setDesigns((prev) =>
        prev.filter((design) => design.public_id !== public_id && design.id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

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
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementsSection;
