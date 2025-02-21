import { FaBook, FaChartBar, FaDashcube, FaFileContract, FaServicestack } from "react-icons/fa";
import { useGetAnalyticsQuery, useGetRecentLeadsQuery } from "../../redux/serviceSlice";
import CustomCard from "../../components/vendor-analytics/Card/CustomCard";
import RecentActivityTable from "../../components/vendor-analytics/table/RecentActivityTable";
import ServicePieChart from "../../components/vendor-analytics/piechart/ServicePieChart";
import { MdSpaceDashboard, MdVisibility } from "react-icons/md";

const Analytics = () => {
  const { data } = useGetAnalyticsQuery();
  const {data: recentLead}= useGetRecentLeadsQuery()

  console.log(data?.services)
  return (
    <>
    <div className="p-5 rounded-md"> 
      {/* //analytical cards  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-5 md:px-0 mt-4">
        <CustomCard
          count={data?.totalViews}
          title="Views"
          icon={<FaChartBar  />}
          className="bg-gray-50"
        />
        <CustomCard
          count={data?.totalLeads}
          title="Lead"
          icon={<FaFileContract />}
         className="bg-gray-50"
        />
        <CustomCard
          count={data?.totalLeads}
          title="Profile Visit"
          icon={<MdVisibility />}
          className="bg-gray-50"
        />
      </div>

      {/* top three services and recent activity table */}
      <div className="bg-[#F3CEE8] block md:flex justify-between items-center p-5 w-full gap-2 md:space-x-4 mt-5 rounded-lg">
        <div className="p-3  h-[490px] w-full md:w-[60%] bg-white rounded-md mt-4 md:mt-0">
          <h1 className="text-2xl font-thin text-start">Most Viewed Service</h1>
          <RecentActivityTable recentLead ={data?.topThreeServices}/>
        </div>
        <div className="h-[490px] w-full md:w-[40%] bg-white rounded-md p-3">
        {/* <h1 className="text-2xl font-thin text-start">Most Viewed Service</h1> */}
          <ServicePieChart data={data?.topThreeServices}/>
        </div>
      </div>

      {/* recent lead  */}
      <div className="p-2 h-[490px] w-full md:w-full shadow-lg rounded-md  border border-primary mt-4 md:mt-5">
          <h1 className="text-2xl font-thin text-start">Recent Activities</h1>
          <RecentActivityTable recentLead ={recentLead?.data}/>
        </div>
      </div>

      
    </>
  );
};

export default Analytics;
