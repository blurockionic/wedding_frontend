import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
const ServicePieChart = ({data}) => {

  console.log(data)

  if(!data) return null
  const data02 = data?.map((item) => {
    return {name: item?.name, value: item.totalViews}
  })  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data02 }
          cx="50%"
          cy="50%"
          outerRadius={140}
          fill="#db2777"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ServicePieChart;
