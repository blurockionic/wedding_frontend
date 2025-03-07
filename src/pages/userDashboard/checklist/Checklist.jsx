import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaPlus, FaTimes, FaSave, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { BiBell, BiBellPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleItemState,
  addItem,
  removeItem,
  setChecklist,
  addCategory,
  removeCategory,
  setScheduleDate,
} from "../../../redux/checklistSlice";
import {
  useSaveChecklistMutation,
  useGetChecklistQuery,
} from "../../../redux/checklistApiSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Custom hook to detect screen size (no changes)
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
  const [clickedIndex, setClickedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scheduleIndex, setScheduleIndex] = useState(null);
  const isMediumScreenOrSmaller = useMediaQuery("(max-width: 1024px)");
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const {
    register: registerItem,
    handleSubmit: handleItemSubmit,
    reset: resetItemForm,
    formState: { errors: itemErrors },
  } = useForm();

  const handleItemClick = (index) => {
    setClickedIndex(index);
    dispatch(toggleItemState({ categoryTitle: title, itemIndex: index }));

    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
  };

  const handleAddItem = (data) => {
    dispatch(addItem({ categoryTitle: title, itemName: data.item }));
    resetItemForm();
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem({ categoryTitle: title, itemIndex: index }));
  };

  const handleRemoveCategory = () => {
    dispatch(removeCategory({ categoryTitle: title }));
  };

  const handleDateChange = (date, index) => {
    const dateString = date.toISOString();
    dispatch(
      setScheduleDate({
        categoryTitle: title,
        itemIndex: index,
        date: dateString,
      })
    );
    // closeModal();
  };

  const handleRemoveDate = (index) => {
    dispatch(
      setScheduleDate({ categoryTitle: title, itemIndex: index, date: null })
    );
    // closeModal();
  };

  const openModal = (index) => {
    setScheduleIndex(index);
  };

  const closeModal = () => {
    setScheduleIndex(null);
  };

  // Click-outside handler (for modal)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (scheduleIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scheduleIndex]);

  const Checklist = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Checklist",
      "name": "Wedding Planning Checklist",
      "description": "Comprehensive wedding planning checklist to organize your tasks and manage vendors for your perfect wedding.",
      "author": {
        "@type": "Organization",
        "name": "Marriage Vendors",
        "url": "https://www.marriagevendors.com"
      },
      "image": "https://www.marriagevendors.com/images/wedding-checklist.jpg",
      "publisher": {
        "@type": "Organization",
        "name": "Marriage Vendors",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.marriagevendors.com/logo.png"
        }
      },
      "datePublished": "2024-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.marriagevendors.com/checklist"
      },
      "itemListOrder": "Unordered",
      "itemListElement": [
        "Venue Booking",
        "Catering Selection",
        "Photographer Hiring",
        "Wedding Attire",
        "Guest List Management",
        "Vendor Coordination"
      ]
    };
  
    return (
      <div>
        <Helmet>
          <title>Wedding Planning Checklist | Marriage Vendors</title>
          <meta
            name="description"
            content="Organize your wedding planning with our comprehensive checklist. Track tasks, manage vendors, and ensure nothing is missed for your perfect wedding day."
          />
          <meta name="keywords" content="wedding checklist, wedding planning, wedding tasks, marriage vendors, wedding organization" />
          <meta name="author" content="Marriage Vendors" />
          <link rel="canonical" href="https://www.marriagevendors.com/checklist" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.marriagevendors.com/checklist" />
          <meta property="og:title" content="Wedding Planning Checklist | Marriage Vendors" />
          <meta property="og:description" content="Organize your wedding planning with our comprehensive checklist. Track tasks, manage vendors, and ensure nothing is missed for your perfect wedding day." />
          <meta property="og:image" content="https://www.marriagevendors.com/images/wedding-checklist-social.jpg" />
  
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.marriagevendors.com/checklist" />
          <meta name="twitter:title" content="Wedding Planning Checklist | Marriage Vendors" />
          <meta name="twitter:description" content="Organize your wedding planning with our comprehensive checklist. Track tasks, manage vendors, and ensure nothing is missed for your perfect wedding day." />
          <meta name="twitter:image" content="https://www.marriagevendors.com/images/wedding-checklist-social.jpg" />
  
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      </div>
    );
  };

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg border-4 border-pink-300 break-inside-avoid transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex w-full flex-wrap">
        <div className="flex-1 min-w-0">
          <h3
            className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full"
            style={{ wordBreak: "break-word" }}
          >
            {title}
          </h3>
        </div>
        <FaTimes
          className={`text-gray-300 hover:text-pink-600 cursor-pointer transition-all duration-300 ease-in-out ml-auto ${
            isHovering || isMediumScreenOrSmaller
              ? "max-h-20 opacity-100"
              : "max-h-0 opacity-0"
          }`}
          size={22}
          onClick={handleRemoveCategory}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => {
          const itemScheduleDate = item.scheduleDate
            ? new Date(item.scheduleDate)
            : null;
          return (
            <React.Fragment key={index}>
              <li
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

                <div className="flex-1 min-w-0">
                  <span
                    className={`leading-relaxed transition-all duration-150 ease-in-out hyphenate break-words whitespace-normal block ${
                      clickedIndex === index ? "scale-105" : ""
                    } ${
                      item.done
                        ? "line-through opacity-50"
                        : "group-hover:text-pink-600"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Icons Container */}
                <div className="flex flex-shrink-0 w-auto justify-end items-center space-x-2">
                  <div className="relative">
                    {item.scheduleDate ? (
                      <BiBell
                        className="text-pink-500 cursor-pointer hover:text-pink-700 transition-all duration-300 ease-in-out cursor-pointer"
                        size={18}
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(index);
                        }}
                      />
                    ) : (
                      <BiBellPlus
                        className={`transition-all duration-300 ease-in-out text-gray-300 hover:text-pink-600 cursor-pointer ${
                          hoveredIndex === index || isMediumScreenOrSmaller
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                        }`}
                        size={18}
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(index);
                        }}
                      />
                    )}
                  </div>
                  <FaTimes
                    className={`transition-all duration-300 ml-1 ease-in-out text-gray-300 hover:text-pink-600 ${
                      hoveredIndex === index || isMediumScreenOrSmaller
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
                    size={18}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(index);
                    }}
                  />
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      
      {/* Render Modal Conditionally */}
      {scheduleIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-3">
              <div>
                <h2 className="text-2xl font-bold text-pink-600 mb-1">Schedule Task</h2>
                <p className="text-gray-500 text-sm">(Select a completion date)</p>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-pink-600 transition-all duration-300"
                onClick={closeModal}
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* Task Name & Date */}
            <div className="px-4 py-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {items[scheduleIndex]?.name}
              </h3>
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                <p className="text-gray-700">
                  Complete by:{" "}
                  {items[scheduleIndex]?.scheduleDate ? (
                    <span className="font-semibold text-pink-600">
                      {new Date(items[scheduleIndex].scheduleDate).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-500">Not Set</span>
                  )}
                </p>
              </div>
            </div>

            {/* Calendar Picker */}
            <div className="flex justify-center my-4">
              <Calendar
                onChange={(date) => handleDateChange(date, scheduleIndex)} // Ensure this doesn't close modal
                value={items[scheduleIndex]?.scheduleDate ? new Date(items[scheduleIndex].scheduleDate) : null}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Google Calendar Button */}
            {items[scheduleIndex]?.scheduleDate && (
              <div className="flex justify-center my-4">
                <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      items[scheduleIndex].name
                    )}&details=${encodeURIComponent(
                      `Reminder to complete your task: "${items[scheduleIndex].name}"\n\nMake sure to finish it before the deadline!`
                    )}&dates=${new Date(items[scheduleIndex].scheduleDate)
                      .toISOString()
                      .replace(/[-:]/g, "")
                      .split(".")[0]}Z/${new Date(items[scheduleIndex].scheduleDate)
                      .toISOString()
                      .replace(/[-:]/g, "")
                      .split(".")[0]}Z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center shadow-md"
                  >
                    <FaCalendarAlt className="mr-2" /> Set Reminder on Google Calendar
                  </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              {items[scheduleIndex]?.scheduleDate && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-all"
                  onClick={() => handleRemoveDate(scheduleIndex)}
                >
                  <FaTrash /> Remove Date
                </button>
              )}

              <button
                type="button"
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-all ml-auto"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Add new item Form */}
      <div className="mt-4">
        <div className="relative">
          <form
            onSubmit={handleItemSubmit(handleAddItem)}
            className={`transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center space-x-2">
              <button type="submit" className="flex-shrink-0">
                <FaPlus
                  className="text-pink-500 hover:text-pink-600 transition cursor-pointer"
                  size={20}
                />
              </button>
              <input
                {...registerItem("item", {
                  required: " ",
                  maxLength: {
                    value: 100,
                    message: "Item name cannot exceed 100 characters",
                  },
                })}
                type="text"
                placeholder="Add a new item"
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 focus-visible:outline-none"
              />
            </div>
            {itemErrors.item && (
              <p className="text-red-500 text-sm ml-8">
                {itemErrors.item.message}
              </p>
            )}
          </form>

          {/* Invisible Form Placeholder - Always Takes Up Space(for hover effect NA anymore) */}
          <div
            className="absolute top-0 left-0 w-full opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <form>
              <div className="flex items-center space-x-2">
                <button type="button" className="flex-shrink-0">
                  <FaPlus size={20} />
                </button>
                <input type="text" className="flex-grow p-2 border rounded-md" />
              </div>
              <p className="text-sm ml-8 invisible">Placeholder</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checklist = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveChecklistApi, { isLoading: isSavingApi }] =
    useSaveChecklistMutation();
  const {
    data: fetchedChecklist,
    isLoading,
    isError,
  } = useGetChecklistQuery();
  const checklistData = useSelector((state) => state.checklist);
  const testData = useSelector((state) => state.auth.user);
  const [progress, setProgress] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  console.log(testData);
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategoryForm,
    formState: { errors: categoryErrors },
  } = useForm();

  const handleAddCategory = (data) => {
    dispatch(addCategory({ categoryTitle: data.category }));
    resetCategoryForm();
  };

  useEffect(() => {
    if (fetchedChecklist) {
      dispatch(setChecklist(fetchedChecklist.checklist1));
    }
  }, [fetchedChecklist, dispatch]);

  useEffect(() => {
    handleSave(true);
  }, [checklistData]);

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
      
      if (!isLoading){     
        const payload = { checklistItems: checklistData };
        const resultAction = await saveChecklistApi(payload);
        toast.dismiss();

        if (resultAction.error) {
          console.error("Error saving checklist:", resultAction.error);
          toast.error(
            `Error saving checklist: ${
              resultAction.error.data?.message || "Unknown error"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
              theme: "light",
            }
          );
        } else if (!isUpdate) {
          toast.success("Checklist saved successfully!");
        }
      }
    } catch (error) {
      console.error("Error during save process:", error);
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

        {isLoading ? (
          <div className="text-center text-pink-600">Loading checklist...</div>
        ) : (
          <>
            <div className="sm:flex items-center justify-between w-full gap-4 mb-4 sm:mb-8">
              <div className="flex flex-col-reverse sm:w-1/2 sm:pr-12 pb-3 sm:pb-0">
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-pink-400 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-md text-gray-700 font-semibold whitespace-nowrap mb-2">
                  Completed{" "}
                  <span className="font-bold">
                    {completedTasks}/{totalTasks}
                  </span>{" "}
                  tasks
                </p>
              </div>

              <button
                onClick={() => handleSave(false)}
                disabled={!isLoggedIn || isSavingApi}
                className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center ${
                  isLoggedIn
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                } ml-auto`}
              >
                <FaSave className="mr-2" size={18} />
                {isSavingApi
                  ? "Saving..."
                  : isLoggedIn
                  ? "Save Checklist"
                  : "Login to Save"}
              </button>
            </div>

            {/* Add New Category Form */}
            <form
              onSubmit={handleCategorySubmit(handleAddCategory)}
              className="flex items-center shadow-md gap-2 mb-4 border-2 p-3 py-2 rounded-lg"
            >
              <button type="submit" className="flex-shrink-0">
                <FaPlus
                  className="text-pink-500 hover:text-pink-600 transition cursor-pointer"
                  size={30}
                />
              </button>
              <input
                {...registerCategory("category", {
                  required: " ",
                  maxLength: {
                    value: 75,
                    message: "Category name cannot exceed 75 characters",
                  },
                })}
                type="text"
                placeholder="Enter new category"
                className="flex-grow p-2 focus:outline-none border-transparent focus:border-transparent focus:ring-0"
              />
            </form>
            {categoryErrors.category && (
              <p className="text-red-500 text-sm ml-10">
                {categoryErrors.category.message}
              </p>
            )}

            <div className="columns-1 sm:columns-2 lg:columns-2 gap-6 space-y-6 mt-6">
              {checklistData.map((category, index) => (
                <ChecklistCategory
                  key={index}
                  title={category.category}
                  items={category.items}
                />
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Checklist;