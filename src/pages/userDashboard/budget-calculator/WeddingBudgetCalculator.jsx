import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const servicesList = [
  "Venue",
  "Catering",
  "Photography",
  "Decorations",
  "Music & Entertainment",
  "Bridal Wear",
  "Groom Wear",
  "Transportation",
  "Invitations",
  "Miscellaneous",
];

const WeddingBudgetCalculator = () => {
  const [budget, setBudget] = useState(150000);
  const [selectedServices, setSelectedServices] = useState([]);
  const [result, setResult] = useState(null);

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const calculateBudget = () => {
    if (budget <= 0 || selectedServices.length === 0) {
      alert("Please enter a valid budget and select at least one service.");
      return;
    }

    const baseAllocation = budget / selectedServices.length;
    const minBudget = budget * 0.88; // 12% decrease
    const maxBudget = budget * 1.1; // 10% increase

    const breakdown = selectedServices.map((service) => {
      const estimatedCost = baseAllocation * (0.88 + Math.random() * 0.22);
      return {
        service,
        estimatedCost: estimatedCost.toFixed(2),
        percentage: ((estimatedCost / budget) * 100).toFixed(2),
      };
    });

    setResult({ minBudget, maxBudget, breakdown });
  };

  const pieData = result
    ? {
        labels: result.breakdown.map(
          (item) =>
            `${item.service} \n₹${item.estimatedCost} (${item.percentage}%)`
        ),
        datasets: [
          {
            data: result.breakdown.map((item) =>
              parseFloat(item.estimatedCost)
            ),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9966FF",
              "#FF9F40",
              "#FFCD56",
              "#C9CBCF",
              "#36A2EB",
              "#FF6384",
            ],
          },
        ],
      }
    : null;

  const pieOptions = {
    plugins: {
      cutout: 50, // 0 for full pie, increase for donut effect
      radius: "20%", // Adjust the pie chart size
      legend: {
        position: "bottom",
      },
      datalabels: {
        color: "white",
        formatter: (value, ctx) => {
          let label = ctx.chart.data.labels[ctx.dataIndex] || "";
          return label;
        },
      },
    },
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Wedding Budget Calculator</h2>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        placeholder="Enter total budget"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <h3 className="font-semibold">Select Services:</h3>
      <div className="grid grid-cols-2 gap-2 my-4">
        {servicesList.map((service) => (
          <label key={service} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => handleServiceChange(service)}
            />
            <span>{service}</span>
          </label>
        ))}
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded w-full"
        onClick={calculateBudget}
      >
        Calculate
      </button>
      {result && (
        <div className="mt-4 p-4 border rounded ">
          <p className="font-semibold">Estimated Budget Range:</p>
          <p>
            ₹{result.minBudget.toFixed(2)} - ₹{result.maxBudget.toFixed(2)}
          </p>
          <div className="flex">
            <div className="mt-4 w-1/2">
              <h3 className="font-semibold">Budget Distribution:</h3>
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="w-1/2">
              <h3 className="font-semibold mt-2">Service Breakdown:</h3>
              <ul className="list-disc pl-4">
                {result.breakdown.map((item, index) => (
                  <li key={index}>
                    {item.service}: ₹{item.estimatedCost} ({item.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingBudgetCalculator;
