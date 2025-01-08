import Chart from "react-apexcharts";
import { dummyData } from "../../../utils/DummyData";

const CategorySale = () => {
  const data = dummyData.ServiceResult;

  // Create a mapping of service_type and their counts
  const serviceTypeCounts = data.reduce((acc, service) => {
    acc[service.service_type] = (acc[service.service_type] || 0) + 1;
    return acc;
  }, {});

  // Extract categories and counts for the chart
  const categories = Object.keys(serviceTypeCounts);
  const counts = Object.values(serviceTypeCounts);

// calculate expense 
// WIP: CALCULATE PROFIT AND LOSS, GROWTH PERCENTAGE
// const profile = data.reduce((acc, service) => {
//   return acc + service.max_price;
// }, 0);

// console.log(totalExpenses)

  // Define chart options
  const chartOptions = {
    series: [
      //   {
      //     name: "Income",
      //     color: "#31C48D",
      //     data: [1420, 1620, 1820, 1420, 1650, 2120],
      //   },
      {
        name: "Sales",
        // color: "#F05252",
        color: "#31C48D",
        data: counts,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "50%",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          width: "100%",
          horizontal: true,
          columnWidth: "100%",
          borderRadius: 6,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        // categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            colors: "#6B7280",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            colors: "#6B7280",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      grid: {
        strokeDashArray: 4,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 px-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Sales
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            $5,405
          </dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            Profit rate 23.5%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-2">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Income
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            $23,635
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Expense
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            -$18,230
          </dd>
        </dl>
      </div>

      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width={ "100%"}
        height={"100%"}
        className="w-full"
      />

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-4">
          <button
            id="dropdownDefaultButton"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 6 months
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
          >
            Revenue Report
            <svg
              className="w-2.5 h-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategorySale;
