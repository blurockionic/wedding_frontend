import PropTypes from "prop-types";
import { Calendar, CheckCircle, Briefcase, IndianRupee } from "lucide-react";

const EventSummary = ({ summary = {} }) => {
  const {
    total_event_count = 0,
    total_task_count = 0,
    total_service_count = 0,
    grand_total = 0,
  } = summary;

  const summaryItems = [
    {
      label: "Total Events",
      value: total_event_count,
      icon: <Calendar />,
      bgColor: "bg-red-100",
      iconBg: "bg-red-200",
      textColor: "text-red-900",
    },
    {
      label: "Total Tasks",
      value: total_task_count,
      icon: <CheckCircle />,
      bgColor: "bg-green-100",
      iconBg: "bg-green-200",
      textColor: "text-green-900",
    },
    {
      label: "Total Services",
      value: total_service_count,
      icon: <Briefcase />,
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-200",
      textColor: "text-yellow-900",
    },
    {
      label: "Total Expense",
      value: `₹${grand_total.toLocaleString()}`,
      icon: <IndianRupee />,
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200",
      textColor: "text-blue-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4  bg-gray-50 rounded-lg ">
      {summaryItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-3 rounded-lg ${item.bgColor}`}
        >
          <div className={`p-2 rounded-full ${item.iconBg}`}>{item.icon}</div>
          <div className="flex w-full flex-col">
            <p className={` text-xs md:text-[1vw] ${item.textColor}`}>{item.label}</p>
            <p className={`text-lg font-semibold ${item.textColor}`}>
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

EventSummary.propTypes = {
  summary: PropTypes.shape({
    total_event_count: PropTypes.number,
    total_task_count: PropTypes.number,
    total_service_count: PropTypes.number,
    grand_total: PropTypes.number,
  }),
};

export default EventSummary;
