import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
const ServicePieChart = (data) => {

  if(!data.data) return null
  const data02 = data?.data.map((item) => {
    return {name: item.name, value: item.totalViews}
  })  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data02 }
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#db2777"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ServicePieChart;
