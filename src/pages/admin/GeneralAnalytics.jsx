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
        "wedding decor": "#1f93ff",
        "wedding videographers": "#8c63da",
        "wedding dj": "#ff928a",
        "makeup salon": "#2bb7dc",
        "caterers": "#6fd195",
        "wedding entertainment":"#8c63da",
        "mehndi artist":"#2bb7dc",
        "wedding photographers" : "#ff928a",
        "tent house" : "#1f93ff"
      };

      const planColors = {
        "Business": "#ffae4c",
        "Free": "#ff928a",
        "Professional": "#8c63da",
        "Starter": "#2bb7dc",
      };
      
      // TotalServicesbyType with counts in labels
      const pieChartDataTotalServicesbyType = analytics.data.TotalServicesbyType.map((item, index) => ({
        id: index,
        value: item._count.service_type,
        label: `${item.service_type} (${item._count.service_type})`, // Add count to label
        color: serviceTypeColors[item.service_type] || "#cccccc"
      }));
      setPieChartTotalServicesbyType(pieChartDataTotalServicesbyType);

      // TotalServicesbyViews with counts in labels
      const pieChartDataTotalServicesbyViews = analytics.data.MostViewedServicesData.map((item, index) => ({
        id: index,
        value: item.totalViewCount,
        label: `${item.service_type} (${item.totalViewCount})`, // Add count to label
        color: serviceTypeColors[item.service_type] || "#cccccc"
      }));
      setPieChartTotalServicesbyViews(pieChartDataTotalServicesbyViews);

      // TotalRevenueByType with counts in labels
      const pieChartDataPlansbyRevenue = analytics.data.RevenuebyPlans.map((item, index) => ({
        id: index,
        value: item.totalRevenue,
        label: `${item.plan} (${item.totalRevenue})`, // Add count to label
        color: planColors[item.plan] || "#cccccc"
      }));
      setPieChartPlansbyRevenue(pieChartDataPlansbyRevenue);
    }
  }, [analytics]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  

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
              <div>
                <p className="text-md font-semibold mb-3 break-words whitespace-normal w-full">
                  Total Services by Type
                </p>
                <PieChart
                  series={[
                    {
                      data: pieChartTotalServicesbyType,
                      innerRadius: 50,
                      outerRadius: 100,
                      paddingAngle: 0,
                      cornerRadius: 0,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                      labelStyle: {
                        fontSize: 14,
                        fill: '#333',
                      },
                    },
                  }}
                  width={300}
                  height={800}
                />
              </div>
              <div>
                <p className="text-md font-semibold mb-3 break-words whitespace-normal w-full">
                  Total Views by Service Type
                </p>
                <PieChart
                  series={[
                    {
                      data: pieChartTotalServicesbyViews,
                      innerRadius: 50,
                      outerRadius: 100,
                      paddingAngle: 0,
                      cornerRadius: 0,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                      labelStyle: {
                        fontSize: 14,
                        fill: '#333',
                      },
                    },
                  }}
                  width={300}
                  height={840}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-10 w-full px-5 md:px-0 mt-4">
                <div>
                  <p className="text-md font-semibold mb-3 break-words whitespace-normal w-full -mt-4">
                    Revenue per Plan
                  </p>
                  <PieChart
                    series={[
                      {
                        data: pieChartPlansbyRevenue,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 0,
                        cornerRadius: 0,
                        cx: 100,
                        cy: 100,
                      },
                    ]}
                    slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 100,
                      labelStyle: {
                        fontSize: 14,
                        fill: '#333',
                      },
                    },
                  }}
                    width={250}
                    height={460}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}