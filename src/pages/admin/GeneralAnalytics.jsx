import { useEffect, useState } from "react";
import { useGetGeneralAnalyticsQuery } from "../../redux/adminApiSlice";
import CustomCard from "../../components/vendor-analytics/Card/CustomCard";
// import ui components
import { FaUsers, FaUsersCog, FaStore, FaCheck , FaCheckDouble, FaMoneyBillWave  } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { PieChart } from '@mui/x-charts/PieChart';
import { PiArrowUpRightBold } from "react-icons/pi";
import ChartBar from "../../components/admin-chart/ChartBar.jsx";
import AnalyticsCard from "../../components/admin-chart/AnalyticsCard.jsx";
import ServicesCard from "../../components/admin-chart/ServicesCard.jsx";


export default function Admin() {
  const { data: analytics, isLoading, error } = useGetGeneralAnalyticsQuery();
  const [pieChartTotalServicesbyType, setPieChartTotalServicesbyType] = useState([]);
  const [pieChartTotalServicesbyViews, setPieChartTotalServicesbyViews] = useState([]);
  const [pieChartPlansbyRevenue, setPieChartPlansbyRevenue] = useState([]);

  useEffect(() => {
    if (analytics) {
      // TotalServicesbyType
      const pieChartDataTotalServicesbyType = analytics.data.TotalServicesbyType.map((item, index) => ({
        id: index,
        value: item._count.service_type,
        label: item.service_type,
      }));
      setPieChartTotalServicesbyType(pieChartDataTotalServicesbyType);

      // TotalServicesbyViews
      const pieChartDataTotalServicesbyViews = analytics.data.MostViewedServicesData.map((item, index) => ({
        id: index,
        value: item.totalViewCount,
        label: item.service_type,
      }));
      setPieChartTotalServicesbyViews(pieChartDataTotalServicesbyViews);

      // TotalRevenueByType
      const pieChartDataPlansbyRevenue = analytics.data.RevenuebyPlans.map((item, index) => ({
        id: index,
        value: item.totalRevenue,
        label: item.plan,
      }));
      setPieChartPlansbyRevenue(pieChartDataPlansbyRevenue);
    }
  }, [analytics]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(analytics);
  return (
    <div>
      {analytics ? (
        <div>
          <h2 className="text-[26px] font-semibold text-[#f20574] mb-11">General Analytics</h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnalyticsCard
                title="Total Users"
                count={analytics.data.totalUsers}
                increment={15}
                bgColor="#f5efec"
              />
              <AnalyticsCard
                title="Total Vendors"
                count={analytics.data.totalVendors}
                increment={15}
                bgColor="#f0f5ec"
              />
              <AnalyticsCard
                title="Total Services"
                count={analytics.data.totalServices}
                increment={15}
                bgColor="#e3e6e6"
              />
            </div>
            <h2 className="text-[26px] font-semibold text-[#f20574] mt-[60px] mb-6">Services Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[67%]">
              <ServicesCard
                title="Total Views"
                count={analytics.data.ServicesData._sum.viewCount}
                increment={15}
                bgColor="#dceeee"
              />
              <ServicesCard
                title="Total Leads"
                count={analytics.data.ServicesData._count.lead}
                increment={15}
                bgColor="#eedce8"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 w-full px-5 md:px-0 mt-4">
              <div>
                <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
                  Total Services by Type
                </p>
                <PieChart
                  series={[
                    {
                      data: pieChartTotalServicesbyType,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  width={800}
                  height={225}
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
                  Total Views by Service Type
                </p>
                <PieChart
                  series={[
                    {
                      data: pieChartTotalServicesbyViews,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  width={800}
                  height={225}
                />
              </div>
            </div>
            <h2 className="text-[26px] font-semibold text-[#f20574] mt-[60px] mb-6">Revenue Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[67%]">
              <ServicesCard
                title="Total Subscribers"
                count={analytics.data.TotalRevenue[0].totalSubscribers}
                increment={15}
                bgColor="#ebeedc"
              />
              <ServicesCard
                title="Total Revenue"
                count={analytics.data.TotalRevenue[0].totalRevenue}
                increment={15}
                bgColor="#e4d8d8"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 w-full px-5 md:px-0 mt-4">
              <div>
                <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
                  Revenue per Plan
                </p>
                <PieChart
                  series={[
                    {
                      data: pieChartPlansbyRevenue,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  width={800}
                  height={225}
                />
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(analytics, null, 2)}</pre> */}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}