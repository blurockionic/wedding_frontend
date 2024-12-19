import MonthlySale from "../../components/vendor-analytics/service-sales-report/CategorySale";
import MonthlyReportOnLineChart from "../../components/vendor-analytics/service-sales-report/MonthlyReportOnLineChart";
import RecentBooking from "../../components/vendor-analytics/service-tracfic-progress/RecentBooking";
import ServiceStatusReport from "../../components/vendor-analytics/service-tracfic-progress/ServiceStatusReport";
import TraficOnService from "../../components/vendor-analytics/service-tracfic-progress/TraficOnService";
import SubHeader from "../../components/vendor-analytics/SubHeader";

const Analytics = () => {
  return (
    <>
      {/* Dashboard SubHeader */}
      <SubHeader />

      {/* trafic  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-5">
        <div>
          <RecentBooking />
        </div>
        <div>
          <ServiceStatusReport />
        </div>
        <div>
          <TraficOnService />
        </div>
      </div>

      {/* salre or booking report  */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
        <div className="">
          <MonthlySale />
        </div>
        <div className="">
          <MonthlyReportOnLineChart />
        </div>
      </div>
    </>
  );
};

export default Analytics;
