import { FaBook, FaFileContract, FaServicestack } from "react-icons/fa";
import { useGetAnalyticsQuery, useGetRecentLeadsQuery } from "../../redux/serviceSlice";
import CustomCard from "../../components/vendor-analytics/Card/CustomCard";
import RecentActivityTable from "../../components/vendor-analytics/table/RecentActivityTable";
import ServicePieChart from "../../components/vendor-analytics/piechart/ServicePieChart";

const Analytics = () => {
  const { data } = useGetAnalyticsQuery();
  const {data: recentLead}= useGetRecentLeadsQuery()

  return (
    <>
    <div className="p-5 bg-gradient-to-br from-white via-pink-50 to-pink-100 rounded-md"> 
      {/* //analytical cards  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5 md:px-0 mt-10">
        <CustomCard
          count={data?.totalViews}
          title="Views"
          icon={<FaServicestack />}
          className="bg-gradient-to-tl from-teal-300 via-cyan-300 to-sky-300"
        />
        <CustomCard
          count={data?.totalLeads}
          title="Lead"
          icon={<FaFileContract />}
          className="bg-gradient-to-br from-red-300 via-orange-300 to-amber-300"
        />
      </div>

      {/* top three services and recent activity table */}
      <div className="block md:flex justify-between items-center px-5 md:px-0 w-full gap-4 md:space-x-4 mt-5 ">
        <div className="h-[490px] w-full md:w-[40%]  border border-primary rounded-md p-2">
        <h1 className="text-2xl font-thin text-start">Most Viewed Service</h1>
          <ServicePieChart data={data?.topThreeServices}/>
        </div>
        <div className="p-2  h-[490px] w-full md:w-[60%] shadow-lg rounded-md  border border-primary mt-4 md:mt-0">
          <h1 className="text-2xl font-thin text-start">Recent Activities</h1>
          <RecentActivityTable recentLead ={recentLead?.data}/>
        </div>
      </div>
      </div>
    </>
  );
};

export default Analytics;
