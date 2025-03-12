import React, { useEffect, useState } from "react";
import { useGetGeneralAnalyticsQuery } from "../../redux/adminApiSlice";
import CustomCard from "../../components/vendor-analytics/Card/CustomCard";
// import ui components
import { FaUsers, FaUsersCog, FaStore    } from "react-icons/fa";
import { PieChart } from '@mui/x-charts/PieChart';


export default function Admin() {
  const { data: analytics, isLoading, error } = useGetGeneralAnalyticsQuery();
  const [pieChartTotalServicesbyType, setPieChartTotalServicesbyType] = useState([]);
  const [pieChartTotalServicesbyViews, setPieChartTotalServicesbyViews] = useState([]);

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
    }
  }, [analytics]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(analytics);
  return (
    <div>
      {analytics ? (
        <div>
          <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">General Analytics</h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-5 md:px-0 mt-4">
              <CustomCard
                count={analytics.data.totalUsers}
                title="Total Users (verified)"
                icon={<FaUsers  />}
                className="bg-gray-50"
              />
              <CustomCard
                count={analytics.data.totalVendors}
                title="Total Vendors (verified)"
                icon={<FaUsersCog />}
                className="bg-gray-50"
              />
              <CustomCard
                count={analytics.data.totalServices}
                title="Total Services (active)"
                icon={<FaStore />}
                className="bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-5 md:px-0 mt-4">
              <div>
                <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
                  TotalServicesbyType
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
                  width={500}
                  height={225}
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">
                  TotalServicesbyViews
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
                  width={500}
                  height={225}
                />
              </div>
            </div>
          </div>
          <pre>{JSON.stringify(analytics, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
