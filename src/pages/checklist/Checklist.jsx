import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { FaCheckCircle, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { toggleItemState, addItem, removeItem, setChecklist, addCategory, removeCategory  } from "../../redux/checklistSlice";
import { useSaveChecklistMutation, useGetChecklistQuery } from "../../redux/checklistApiSlice";
import { toast } from "react-toastify";

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

const ChecklistCategory = ({ title, items, handleSave }) => {
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

  const handleRemoveCategory = (index) => {
    dispatch(removeCategory({ categoryTitle: title }));
  };

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg border border-pink-300 break-inside-avoid transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex w-full">
      <h3 className="text-xl font-semibold text-pink-600 mb-3">{title}</h3>
      <FaTimes
        className={`relative top-0 right-0 text-gray-300 hover:text-pink-600 cursor-pointer transition-all duration-300 ease-in-out ml-auto ${
          isHovering || isMediumScreenOrSmaller ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
        size={18}
        onClick={handleRemoveCategory}
      />
      </div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItem();
            }
          }}
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
  const [progress, setProgress] = useState(0);    
  const [totalTasks, setTotalTasks] = useState(0); 
  const [completedTasks, setCompletedTasks] = useState(0); 
  const [newCategory, setNewCategory] = useState("");

  // add new category
  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    dispatch(addCategory({ categoryTitle: newCategory.trim() }));
    setNewCategory("");
    handleSave(true);
  };

  // Set checklist data when fetched
  useEffect(() => {
    if (fetchedChecklist) {
      dispatch(setChecklist(fetchedChecklist.checklist1));
    }
  }, [fetchedChecklist, dispatch]);

  useEffect(() => {
    handleSave(true);
  }, [checklistData]);

  // progress bar
  useEffect(() => {
    let total = 0;
    let completed = 0;
  
    checklistData.forEach((category) => {
      category.items.forEach((item) => {
        total++;
        if (item.done) completed++;
      });
    });

    setTotalTasks(total);
    setCompletedTasks(completed);
    setProgress(total > 0 ? ((completed / total) * 100).toFixed(2) : 0);
  }, [checklistData]);

  const handleSave = async (isUpdate) => {
    try {
      console.log("Checklist being saved:", checklistData);

      const payload = {
        checklistItems: checklistData,
      };
      const resultAction = await saveChecklistApi(payload);
      toast.dismiss();
      if (resultAction.error) {
        console.error("Error saving checklist:", resultAction.error);
        toast.error(`Error saving checklist: ${resultAction.error.data?.message == "Access token is missing or invalid" ? "Please login to save!!" : (resultAction.error.data?.message || resultAction.error.error || 'Unknown error')}`, {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
              });
      } else {
        console.log("Checklist saved successfully:", resultAction.data);
        if (isUpdate == false){
          toast.success("Checklist saved successfully!");
        }
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

            {/* Progress bar + Save button container */}
            <div className="sm:flex items-center justify-between w-full gap-4 mb-4 sm:mb-8">

              <div className="flex flex-col-reverse sm:w-1/2 sm:pr-12 pb-3 sm:pb-0">
                {/* Progress Bar Container */}
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  {/* Progress Indicator */}
                  <div
                    className="bg-pink-400 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {/* Progress Text */}
                <p className="text-md text-gray-700 font-semibold whitespace-nowrap mb-2">
                  You have completed <span className="font-bold">{completedTasks} out of {totalTasks}</span> tasks.
                </p>
              </div>

              {/* Save Button (Right Aligned) */}
              <button
                onClick={() => handleSave(false)}
                disabled={!isLoggedIn || isSavingApi}
                className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center ${
                  isLoggedIn ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                } ml-auto`}
              >
                <FaSave className="mr-2" size={18} />
                {isSavingApi ? "Saving..." : isLoggedIn ? "Save Checklist" : "Login to Save"}
              </button>
            </div>

            {/* Add New Category Field */}
            <div className="flex items-center shadow-md gap-2 mb-4 border-2 p-3 py-2 mb-6 rounded-lg">
              <FaPlus
                className="text-pink-500 hover:text-pink-600 transition cursor-pointer"
                size={30}
                onClick={handleAddCategory}
              />
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="flex-grow p-2 focus:outline-none border-transparent focus:border-transparent focus:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory();
                  }
                }}
              />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {checklistData.map((category, index) => (
                <ChecklistCategory key={index} title={category.category} items={category.items} handleSave={handleSave} />
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
