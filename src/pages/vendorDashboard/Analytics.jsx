import { FaChartBar, FaFileContract, FaUser } from "react-icons/fa";
import {
  useGetAnalyticsQuery,
  useGetRecentLeadsQuery,
} from "../../redux/serviceSlice";
import CustomCard from "../../components/vendor-analytics/Card/CustomCard";
import RecentActivityTable from "../../components/vendor-analytics/table/RecentActivityTable";
import ServicePieChart from "../../components/vendor-analytics/piechart/ServicePieChart";

import MostViewedService from "../../components/vendor-analytics/table/MostViewedService";

const Analytics = () => {
  const { data } = useGetAnalyticsQuery();
  const { data: recentLead } = useGetRecentLeadsQuery();

  const cardDetails = [
    {
      title: "Views",
      count: data?.totalViews,
      icon: <FaChartBar />,
    },
    {
      title: "Leads",
      count: data?.totalLeads,
      icon: <FaFileContract />,
    },
    {
      title: "Profile Visit",
      count: data?.profileViews,
      icon: <FaUser />,
    },
  ];

  const colorCodesForChart = ["#FA00FF" ," #DCFAF8"," #FC7900", "#0000004D" ];

  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10  w-full  mt-4">
        {cardDetails.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="bg-[#F3CEE8] rounded-[32px] flex flex-col md:flex-row-reverse justify-between items-center p-5 w-full gap-6 mt-5">
        {/* Pie Chart Section */}
        <div className="rounded-[32px] h-[490px]  bg-white  w-full md:w-[40%] lg:w-[35%]">
          <ServicePieChart
            colorCodesForChart={colorCodesForChart}
            data={data?.topThreeServices}
          />
        </div>

        {/* Most Viewed Service Section */}
        <div className="p-5 min-h-[490px] overflow-x-scroll flex-1  bg-white rounded-[32px] w-full md:w-[60%] lg:w-[65%] mt-4 md:mt-0">
          <h1 className="text-2xl mb-5  font-semibold text-start">
            Most Viewed Service
          </h1>
          <MostViewedService
            colorCodesForChart={colorCodesForChart}
            mostviewed={data?.topThreeServices}
          />
        </div>
      </div>

      {/* recent lead  */}
      <div className="p-5  bg-[#FEB3B1B2] w-full md:w-full shadow-lg  rounded-[32px]  mt-4 md:mt-5">
        <div className="bg-white h-[490px]  rounded-[32px]  p-4 ">
          <h1 className="text-2xl mb-5  font-semibold text-start">
            Recent Activities
          </h1>
          <RecentActivityTable recentLead={recentLead?.data} />
        </div>
      </div>
    </>
  );
};

export default Analytics;
