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
import general_image_icon_1 from "../../../public/general_image_icon_1.svg";
import general_image_icon_2 from "../../../public/general_image_icon_2.svg";
import icon_general_image_3 from "../../../public/icon_general_image_3.svg";
import query_image_icon_4 from "../../../public/query_image_icon_4.svg";

export default function Admin() {
  const { data: analytics, isLoading, error } = useGetGeneralAnalyticsQuery();
  const [pieChartTotalServicesbyType, setPieChartTotalServicesbyType] = useState([]);
  const [pieChartTotalServicesbyViews, setPieChartTotalServicesbyViews] = useState([]);
  const [pieChartPlansbyRevenue, setPieChartPlansbyRevenue] = useState([]);

  useEffect(() => {
    if (analytics) {
      const serviceTypeColors = {
        "wedding decor": "#1f93ff",//blue
        "wedding videographers": "#8c63da", //purple
        "wedding dj": "#ff928a", //red
        "makeup salon": "#2bb7dc", // skyblue
        "caterers": "#6fd195",//green
        "wedding entertainment":"#8c63da",//purple
        "mehndi artist":"#2bb7dc",// skyblue
        "wedding photographers" : "#ff928a",//red
        "tent house" : "#1f93ff"
      };

      const planColors = {
        "Business": "#ffae4c", // orange
        "Free": "#ff928a", // red
        "Professional": "#8c63da", // purple
        "Starter": "#2bb7dc",// skyblue
      };
      // TotalServicesbyType
      const pieChartDataTotalServicesbyType = analytics.data.TotalServicesbyType.map((item, index) => ({
        id: index,
        value: item._count.service_type,
        label: item.service_type,
        color: serviceTypeColors[item.service_type] || "#cccccc"
      }));
      setPieChartTotalServicesbyType(pieChartDataTotalServicesbyType);

      // TotalServicesbyViews
      const pieChartDataTotalServicesbyViews = analytics.data.MostViewedServicesData.map((item, index) => ({
        id: index,
        value: item.totalViewCount,
        label: item.service_type,
        color: serviceTypeColors[item.service_type] || "#cccccc"
      }));
      setPieChartTotalServicesbyViews(pieChartDataTotalServicesbyViews);

      // TotalRevenueByType
      const pieChartDataPlansbyRevenue = analytics.data.RevenuebyPlans.map((item, index) => ({
        id: index,
        value: item.totalRevenue,
        label: item.plan,
        color: planColors[item.plan] || "#cccccc"
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
                backgroundColor="#f5efec"
              />
              <AnalyticsCard
                title="Total Vendors"
                count={analytics.data.totalVendors}
                increment={15}
                backgroundColor="#f0f5ec"
              />
              <AnalyticsCard
                title="Total Services"
                count={analytics.data.totalServices}
                increment={15}
                backgroundColor="#e3e6e6"
              />
            </div>
            <h2 className="text-[26px] font-semibold text-[#f20574] mt-[60px] mb-6">Services Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <ServicesCard
                title="Total Views"
                count={analytics.data.ServicesData._sum.viewCount}
                increment={15}
                backgroundColor="#dceeee"
                image={general_image_icon_1}
              />
              <ServicesCard
                title="Total Leads"
                count={analytics.data.ServicesData._count.lead}
                increment={15}
                backgroundColor="#eedce8"
                image={general_image_icon_2}
              />
            </div>
            <h2 className="text-[26px] font-semibold text-[#f20574] mt-[60px] mb-6">Revenue Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <ServicesCard
                title="Total Subscribers"
                count={analytics.data.TotalRevenue[0].totalSubscribers}
                increment={15}
                backgroundColor="#ebeedc"
                image={icon_general_image_3}
              />
              <ServicesCard
                title="Total Revenue"
                count={analytics.data.TotalRevenue[0].totalRevenue}
                increment={15}
                backgroundColor="#e4d8d8"
                image={query_image_icon_4}
              />
            </div>
            <h2 className="text-[26px] font-semibold text-[#f20574] mt-[60px] mb-6">Distribution Chart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-4">
              {/* Total Services by Type */}
              <div className="flex flex-col items-center">
                <p className="text-md font-semibold mb-3 w-full text-center">
                Total Services by Type
                </p>
                <div className="relative w-full h-[300px]">
                  <PieChart
                    series={[
                      {
                      data: pieChartTotalServicesbyType,
                        innerRadius: 40,
                        outerRadius: 80,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: { top: 20 },
                        labelStyle: { fontSize: 12 },
                      },
                    }}
                    width={300}
                    height={300}
                    margin={{ bottom: 100 }}
                  />
                </div>
              </div>

              {/* Total Views by Service Type */}
              <div className="flex flex-col items-center">
                <p className="text-md font-semibold mb-3 w-full text-center">
                  Total Views by Service Type
                </p>
                <div className="relative w-full h-[300px]">
                  <PieChart
                    series={[
                      {
                        data: pieChartTotalServicesbyViews,
                        innerRadius: 40,
                        outerRadius: 80,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: { top: 20 },
                        labelStyle: { fontSize: 12 },
                      },
                    }}
                    width={300}
                    height={300}
                    margin={{ bottom: 100 }}
                  />
                </div>
              </div>

              {/* Revenue per Plan */}
              <div className="flex flex-col items-center">
                <p className="text-md font-semibold mb-3 w-full text-center">
                  Revenue per Plan
                </p>
                <div className="relative w-full h-[300px]">
                  <PieChart
                  series={[
                      {
                        data: pieChartPlansbyRevenue,
                        innerRadius: 40,
                        outerRadius: 80,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: { top: 20 },
                        labelStyle: { fontSize: 12 },
                      },
                    }}
                    width={300}
                    height={300}
                    margin={{ bottom: 100 }}
                  />
                </div>
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