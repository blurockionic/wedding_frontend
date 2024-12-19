import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const MonthlyReportOnLineChart = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("Last week");

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#e0e0e0",
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
    },
    series: [
      {
        name: "Clicks",
        data: [50, 100, 80, 150, 200, 130, 160],
        color: "#4F46E5", // Blue
      },
      {
        name: "CPC",
        data: [1.2, 1.1, 1.5, 1.4, 1.6, 1.3, 1.5],
        color: "#A855F7", // Purple
      },
    ],
    tooltip: {
      theme: "light",
      shared: true,
      intersect: false,
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(
      document.querySelector("#line-chart"),
      chartOptions
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []); // Empty dependency array ensures the chart is initialized once.

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
    // Add logic to update chart data based on selected date range.
  };

  return (
    <div className="p-4 rounded-lg bg-white shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Monthly Report
        </h2>
        <select
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          className="p-2 bg-gray-100 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="Last week">Last week</option>
          <option value="Last month">Last month</option>
          <option value="Last year">Last year</option>
        </select>
      </div>

      <div id="line-chart"></div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
          <h3 className="font-semibold text-gray-600 dark:text-gray-200">
            Clicks
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total number of clicks received over the selected period.
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
          <h3 className="font-semibold text-gray-600 dark:text-gray-200">
            CPC
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average cost-per-click during the selected period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReportOnLineChart;
