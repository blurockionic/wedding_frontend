import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import sampleData from "../SampleDate";
import SubEventTask from "./SubEventTask";
import VendorCardForSubEvent from "./VendorCardForSubEvent";
import AddVendorsForSubEvent from "./AddVendorsForSubEvent";
import CreateSubEventTask from "./CreateSubEventTask";

const SubEventView = ({
  data,
  handleOnAddSubEventTask,
  handleOnAddSubEventVendor,
}) => {
  const [editingIndexes, setEditingIndexes] = useState({});
  const [eventSubData, setSubEventData] = useState(data);
  const [isActiveActions, setIsActiveActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);



  const handleRemove = (id) => {
    console.log("Remove task:", id);
  };

  const handleSchedule = (task) => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      task.name
    )}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const toggleEditing = (index, field) => {
    setEditingIndexes((prev) => ({
      ...prev,
      [`${index}-${field}`]: !prev[`${index}-${field}`],
    }));
  };

  const handleChange = (index, field, value) => {
    setSubEventData((prevData) =>
      prevData.map((event, i) =>
        i === index ? { ...event, [field]: value } : event
      )
    );
  };

  //handle to show the options
  const handleOnPlus = (index) => {
    setIsActiveActions((prev) => !prev);
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center  bg-gray-100 p-6 rounded-md">
        No sub event data available
      </div>
    );
  }

  return (
    <section className="bg-yellow-100 w-full p-2 mt-10 border-4 border-dashed rounded-md">
      {eventSubData.map((subEvent, index) => (
        <div
          key={index}
          className="flex gap-20 justify-between  mb-4 p-4 bg-white shadow-md rounded-md "
        >
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-4 items-center">
              <span>{index + 1}.</span>
              {/* Editable Event Name */}
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="font-thin">Sub-Event Name</p>
                  {editingIndexes[`${index}-subEventName`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="text"
                      value={subEvent.subEventName}
                      onChange={(e) =>
                        handleChange(index, "subEventName", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "subEventName")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "subEventName")}
                    >
                      {subEvent.subEventName}
                    </p>
                  )}
                </div>

                {/* Editable Event Description */}
                <div className="flex flex-col">
                  <p className="font-thin">Sub-Event Description</p>
                  {editingIndexes[`${index}-subEventDescription`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="text"
                      value={subEvent.subEventDescription}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "subEventDescription",
                          e.target.value
                        )
                      }
                      onBlur={() => toggleEditing(index, "subEventDescription")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 w-64 cursor-pointer truncate"
                      onClick={() =>
                        toggleEditing(index, "subEventDescription")
                      }
                    >
                      {subEvent.subEventDescription}
                    </p>
                  )}
                </div>
              </div>

              {/* Editable Event Date */}
              <div className="flex flex-col">
                <p className="font-thin">Sub-Event Date</p>
                {editingIndexes[`${index}-subEventDate`] ? (
                  <input
                    className="mt-1 border rounded p-1"
                    type="date"
                    value={subEvent.subEventDate}
                    onChange={(e) =>
                      handleChange(index, "subEventDate", e.target.value)
                    }
                    onBlur={() => toggleEditing(index, "subEventDate")}
                    autoFocus
                  />
                ) : (
                  <p
                    className="mt-1 cursor-pointer"
                    onClick={() => toggleEditing(index, "subEventDate")}
                  >
                    {moment(subEvent.subEventDate).format("DD-MM-YYYY")}
                  </p>
                )}
              </div>
              {/* Editable Start Time */}
              <div className="flex flex-col">
                <p className="font-thin">Start Time</p>
                {editingIndexes[`${index}-subEventStartTime`] ? (
                  <input
                    className="mt-1 border rounded p-1"
                    type="time"
                    value={subEvent.subEventStartTime}
                    onChange={(e) =>
                      handleChange(index, "subEventStartTime", e.target.value)
                    }
                    onBlur={() => toggleEditing(index, "subEventStartTime")}
                    autoFocus
                  />
                ) : (
                  <p
                    className="mt-1 cursor-pointer"
                    onClick={() => toggleEditing(index, "subEventStartTime")}
                  >
                    {moment(subEvent.subEventStartTime).format("hh:mm A")}
                  </p>
                )}
              </div>
              {/* Editable End Time */}
              <div className="flex flex-col">
                <p className="font-thin">End Time</p>
                {editingIndexes[`${index}-subEventEndTime`] ? (
                  <input
                    className="mt-1 border rounded p-1"
                    type="time"
                    value={subEvent.subEventEndTime}
                    onChange={(e) =>
                      handleChange(index, "subEventEndTime", e.target.value)
                    }
                    onBlur={() => toggleEditing(index, "subEventEndTime")}
                    autoFocus
                  />
                ) : (
                  <p
                    className="mt-1 cursor-pointer"
                    onClick={() => toggleEditing(index, "eventEndTime")}
                  >
                    {moment(subEvent.subEventEndTime).format("hh:mm A")}
                  </p>
                )}
              </div>
              {/* Editable Event Budget */}
              <div className="flex flex-col">
                <p className="font-thin">Budget</p>
                {editingIndexes[`${index}-subEventBudget`] ? (
                  <input
                    className="mt-1 border rounded p-1"
                    type="number"
                    value={subEvent.subEventBudget}
                    onChange={(e) =>
                      handleChange(index, "subEventBudget", e.target.value)
                    }
                    onBlur={() => toggleEditing(index, "subEventBudget")}
                    autoFocus
                  />
                ) : (
                  <p
                    className="mt-1 cursor-pointer"
                    onClick={() => toggleEditing(index, "subEventBudget")}
                  >
                    ₹{subEvent.subEventBudget}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-12 mt-5">
              {/* task of sub event  */}
              <div>
                <div>
                  <h1>Task</h1>
                  {subEvent.subEventTask.map((subEventTask) => (
                    <SubEventTask
                      key={subEventTask.id}
                      task={subEventTask.items.task}
                      onRemove={handleRemove}
                      onSchedule={handleSchedule}
                    />
                  ))}
                </div>
              </div>
              {/* add vendors */}
              {/* add vendors */}
              <div>
                <h1>Vendor</h1>
                <div className="grid grid-cols-1 md:grid-cols-3">
                <VendorCardForSubEvent
                  key={"1"}
                  service={[]}
                  category={"vendor"}
                  state={"Ranchi"}
                  subCategory={"caterer"}
                  city={"chaibasa"}
                />
                </div>
               
              </div>
            </div>
          </div>

          {/* Floating Button with Hover Menu */}
          <div className="right-4 top-4 relative">
            <button
              className="p-2 bg-primary text-white rounded-md"
              onClick={() => handleOnPlus(index)}
            >
              <Plus />
            </button>

            {/* Group of divs - hidden by default, shown on hover */}
            {isActiveActions && index === activeIndex && (
              <div
                className={`absolute z-40 right-0 mt-2 w-48 bg-white p-4 rounded-md shadow-md transition-all duration-300 
              ${
                isActiveActions && index === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              >
                <div className="flex flex-col gap-3">
                  <div
                    onClick={handleOnAddSubEventVendor}
                    className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed border-primary text-primary flex justify-center items-center gap-2 rounded-md hover:bg-pink-100"
                  >
                    <Plus /> <span>Vendor</span>
                  </div>
                  <div
                    onClick={handleOnAddSubEventTask}
                    className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed flex justify-center items-center gap-2 rounded-md border-primary text-primary  hover:bg-pink-100"
                  >
                    <Plus /> <span>Task</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SubEventView;
