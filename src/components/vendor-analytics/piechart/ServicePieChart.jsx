import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const ServicePieChart = ({ data,colorCodesForChart }) => {


  if (!data || data.length === 0) return <p>No data available</p>;

  const data02 = data.map((item) => ({
    name: item?.name,
    value: item?.totalViews || 0, // Fallback to 0 if totalViews is undefined
  }));


  return (
    <ResponsiveContainer  width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          
          isAnimationActive={true}
          data={data02}
          cx="50%"
          cy="50%"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          paddingAngle={4}
        >
          {data02.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorCodesForChart[index % colorCodesForChart.length]}
              stroke="white"
             
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ServicePieChart;
