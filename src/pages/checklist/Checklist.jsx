import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { FaCheckCircle, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { toggleItemState, addItem, removeItem, setChecklist } from "../../redux/checklistSlice";
import { useSaveChecklistMutation, useGetChecklistQuery } from "../../redux/checklistApiSlice";

// Custom hook to detect screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const ChecklistCategory = ({ title, items }) => {
  const [newItem, setNewItem] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const isMediumScreenOrSmaller = useMediaQuery("(max-width: 1024px)");
  const dispatch = useDispatch();

  const handleItemClick = (index) => {
    setClickedIndex(index);
    dispatch(toggleItemState({ categoryTitle: title, itemIndex: index }));

    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      dispatch(addItem({ categoryTitle: title, itemName: newItem }));
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem({ categoryTitle: title, itemIndex: index }));
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
            className={`flex items-center space-x-2 cursor-pointer group transition-all duration-300 ease-in-out ${
              item.done ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() =>
              !isMediumScreenOrSmaller && setHoveredIndex(index)
            }
            onMouseLeave={() =>
              !isMediumScreenOrSmaller && setHoveredIndex(null)
            }
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
            {((hoveredIndex === index) || (isMediumScreenOrSmaller)) && (
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
          isHovering || isMediumScreenOrSmaller ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveChecklistApi, { isLoading: isSavingApi }] = useSaveChecklistMutation();
  const { data: fetchedChecklist, isLoading, isError } = useGetChecklistQuery();
  const checklistData = useSelector((state) => state.checklist);

  // Set checklist data when fetched
  useEffect(() => {
    if (fetchedChecklist) {
      dispatch(setChecklist(fetchedChecklist.checklist1));
    }
  }, [fetchedChecklist, dispatch]);

  const handleSave = async () => {
    try {
      console.log("Checklist being saved:", checklistData);

      const payload = {
        checklistItems: checklistData,
      };
      const resultAction = await saveChecklistApi(payload);

      if (resultAction.error) {
        console.error("Error saving checklist:", resultAction.error);
        alert(`Error saving checklist: ${resultAction.error.data?.message || resultAction.error.error || 'Unknown error'}`);
      } else {
        console.log("Checklist saved successfully:", resultAction.data);
        alert("Checklist saved successfully!");
      }

    } catch (error) {
      console.error("Error during save process:", error);
      alert(`Error during save process: ${error.message}`);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Checklist - Book an Appointment</title>
        <meta
          name="description"
          content="Contact us to book an appointment or reach out for more information."
        />
        <meta name="author" content="Wedding Vendors" />
        <link rel="canonical" href="https://www.marriagevendors.com/contactus" />
      </Helmet>

      <div className="max-w-7xl px-2 lg:px-10 mx-auto py-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Wedding Checklist
        </div>

        {/* Show loading indicator while fetching */}
        {isLoading ? (
          <div className="text-center text-pink-600">Loading checklist...</div>
        ) : (
          <>
            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSave}
                disabled={!isLoggedIn || isSavingApi}
                className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center ${
                  isLoggedIn ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                <FaSave className="mr-2" size={18} />
                {isSavingApi ? "Saving..." : isLoggedIn ? "Save Checklist" : "Login to Save"}
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {checklistData.map((category, index) => (
                <ChecklistCategory key={index} title={category.category} items={category.items} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Checklist;
