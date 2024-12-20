import React, { useState } from "react";
import CustomText from "../../global/text/CustomText";

const RecentBooking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to generate the days of the month
  const generateCalendar = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDay = startOfMonth.getDay();
    const totalDays = endOfMonth.getDate();

    const weeks = [];
    let currentWeek = [];
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null); // Empty slots before the start of the month
    }

    for (let day = 1; day <= totalDays; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek); // Add any remaining days to the last week
    }

    return weeks;
  };

  // Function to navigate between months
  const changeMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const weeks = generateCalendar();
  return (
    <div>
      <div className="flex justify-start items-center px-5 mt-2">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
          Service Status
        </h5>
        <svg
          data-popover-target="chart-info"
          data-popover-placement="bottom"
          className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
        </svg>
        <div
          data-popover
          id="chart-info"
          role="tooltip"
          className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        ></div>
      </div>

      <div className="max-w-xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div
                key={index}
                className="text-center font-semibold text-gray-700"
              >
                {day}
              </div>
            )
          )}
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div key={dayIndex} className="text-center py-2">
                  <button
                    disabled={!day}
                    className={`w-8 h-8 inline-flex items-center justify-center rounded-full ${
                      day ? "hover:bg-blue-200 cursor-pointer" : "text-gray-400"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBooking;
