import { useEffect, useState } from "react";
import ActionHeader from "./component/ActionHeader";
import CreateYourWeddingPlan from "./component/CreateYourWeddingPlan";
import HeadingCard from "./component/HeadingCard";
import WeddingEventList from "./component/WeddingEventList";
import WeddingPlanSideNavber from "./component/WeddingPlanSideNavber";
import { Loader2, X } from "lucide-react";
// import CreateSubEvent from "./component/CreateSubEvent";
import AddVevdors from "./component/AddVevdors";
import { useGetWeddingPlanQuery } from "../../redux/weddingPlanSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { useSelector } from "react-redux";
import CreateTaskForm from "./component/CreateTaskForm";


const WeddingPlan = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetWeddingPlanQuery();
  const [isActiveWeddingPlanForm, setIsActiveWeddingPlanForm] = useState(false);
  const [isActiveSubEvent, setIsActiveSubEvent] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState(false);
  const [isActiveVendor, setIsActiveVendor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const [isRefetchData, setIsRefetchData] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [preLoadEvent, setPreLoadEvent] = useState("");

  // refetch the data
  useEffect(() => {
    refetch();
    console.log("this is working");
    setIsRefetchData(false);
    //close the form
    setIsActiveWeddingPlanForm(false);
  }, [isRefetchData, refetch]);

  useEffect(() => {
    if (data?.events) {
      setEvents([...data.events]);
    }
  }, [data]);

  //handle to active create event form
  const handleOnActive = () => {
    setIsActiveWeddingPlanForm((prev) => !prev);
  };

  //handle add sub event
  const handleOnAddSubEvent = () => {
    setIsActiveSubEvent((prev) => !prev);
  };

  //handle to add task
  const handleOnAddTask = (eventId) => {
    setSelectedEvent(eventId);
    setIsActiveTask((prev) => !prev);
  };

  //handle to add vendor
  const handleOnAddVendor = (serviceId) => {
    setEventId(serviceId);
    setIsActiveVendor((prev) => !prev);
  };

  const handleOnDownloadPlan = (events) => {
    const doc = new jsPDF();
    
    // Soft color palette
    const colors = {
      headerBlue: [41, 128, 185],    // Soft professional blue
      labelGray: [100, 100, 120],    // Soft gray for labels
      textDark: [50, 50, 70],        // Dark text color
      lightBackground: [240, 248, 255] // Very light blue background
    };
  
    events.forEach((event, index) => {
      // New page for each event
      if (index > 0) {
        doc.addPage();
      }
  
      // Page dimensions
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
  
      // Subtle background fill
      doc.setFillColor(colors.lightBackground[0], colors.lightBackground[1], colors.lightBackground[2]);
      doc.rect(10, 10, pageWidth - 20, doc.internal.pageSize.height - 20, 'F');
  
      // Decorative soft border
      doc.setDrawColor(220, 220, 240);
      doc.setLineWidth(1);
      doc.rect(10, 10, pageWidth - 20, doc.internal.pageSize.height - 20);
  
      // Title
      doc.setFontSize(22);
      doc.setTextColor(colors.headerBlue[0], colors.headerBlue[1], colors.headerBlue[2]);
      doc.text("Event Plan Details", pageWidth / 2, 30, { align: 'center' });
  
      // Event Name
      doc.setFontSize(18);
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      doc.text(`Event ${index + 1}: ${event.eventName}`, pageWidth / 2, 45, { align: 'center' });
  
      // Prepare data for table
      const tableData = [
        { label: "Event Name", value: event.eventName },
        { label: "Event Date", value: moment(event.eventDate).format('DD-MM-YYYY') },
        { label: "Start Time", value: moment(event.eventStartTime).format("hh:mm A") },
        { label: "End Time", value: moment(event.eventEndTime).format("hh:mm A") },
        { 
          label: "Budget", 
          value: `₹ ${parseFloat(event.eventBudget).toLocaleString('en-IN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}` 
        },
        { label: "Description", value: event.eventDescription }
      ];
  
      // Create table
      autoTable(doc, {
        startY: 60,
        body: tableData.map(item => [item.label, item.value]),
        theme: 'plain',
        styles: { 
          fontSize: 11,
          cellPadding: 4,
          textColor: colors.textDark
        },
        columnStyles: {
          0: { 
            fontStyle: 'bold', 
            cellWidth: 60,
            textColor: colors.labelGray
          },
          1: { 
            cellWidth: 120,
            textColor: [0, 0, 0]  // Ensure budget is clearly visible
          }
        },
        margin: { left: margin, right: margin },
        tableWidth: 'wrap',
        showHead: 'never',
        showLines: false,
        alternateRowStyles: {
          fillColor: [245, 250, 255]  // Very light blue alternate row
        }
      });
  
      // Vendors Section
      if (event.eventVendors?.length > 0) {
        const totalExpense = event.eventVendors.reduce((sum, vendor) => 
          sum + parseFloat(vendor.price), 0);
  
        const vendorData = event.eventVendors.map((vendor) => [
          vendor.name,
          `₹ ${parseFloat(vendor.price).toLocaleString('en-IN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}`,
          vendor.unit
        ]);
  
        doc.setFontSize(16);
        doc.setTextColor(colors.headerBlue[0], colors.headerBlue[1], colors.headerBlue[2]);
        doc.text("Vendors", pageWidth / 2, doc.lastAutoTable.finalY + 15, { align: 'center' });
  
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 20,
          body: vendorData,
          theme: 'plain',
          styles: { 
            fontSize: 10,
            cellPadding: 3,
            textColor: colors.textDark
          },
          columnStyles: {
            0: { 
              cellWidth: 80, 
              textColor: colors.labelGray 
            },
            1: { 
              cellWidth: 40,
              textColor: [0, 0, 0]  // Ensure prices are clearly visible
            },
            2: { cellWidth: 40 }
          },
          margin: { left: margin, right: margin },
          tableWidth: 'wrap',
          showHead: 'never',
          showLines: false,
          alternateRowStyles: {
            fillColor: [245, 250, 255]  // Very light blue alternate row
          }
        });
  
        // Total Expense
        doc.setFontSize(12);
        doc.setTextColor(colors.headerBlue[0], colors.headerBlue[1], colors.headerBlue[2]);
        doc.text(`Total Vendor Expense: ₹ ${totalExpense.toLocaleString('en-IN', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}`, 
          pageWidth / 2, 
          doc.lastAutoTable.finalY + 10, 
          { align: 'center' }
        );
      } else {
        doc.setFontSize(12);
        doc.setTextColor(colors.headerBlue[0], colors.headerBlue[1], colors.headerBlue[2]);
        doc.text("No vendors available.", pageWidth / 2, doc.lastAutoTable.finalY + 15, { align: 'center' });
      }
    });
  
    // Save the PDF
    doc.save("Event_Plan_Details.pdf");
  };

  //handle to select suggestion
  const handleToSelectSuggestion = (eventName) => {
    setPreLoadEvent(eventName);
    setIsActiveWeddingPlanForm((prev) => !prev);
  };

  //handle on share
  const handleOnShare = () => {
    console.log("clicked share");
  };

  //handle refech
  const handleRefech = (value) => {
    console.log("this is clicked", value);
    setIsRefetchData(value);
  };

  // refetch when task created
  const handleOnTaskCreated = (value) => {
    setIsRefetchData(value);
  };
  // refetch the data when service is deleted
  const handleOnDeleteService = (value) => {
    setIsRefetchData(value);
  };

  if (isLoading)
    return (
      <p className="h-screen flex justify-center items-center gap-3">
        <Loader2 className="animate-spin" />
        Loading
      </p>
    );
  if (error)
    return (
      <p className="h-screen flex justify-center items-center">
        Please login to use the wedding planning dairy.
      </p>
    );

  return (
    <div className="flex-col relative">
      <section className="p-3 w-full flex ">
        <div className="w-full p-3 h-screen overflow-scroll">
          <HeadingCard user={user} />
          <ActionHeader
            eventSummary={data.event_summary}
            handleOnShare={handleOnShare}
            handleOnEventActive={handleOnActive}
            handleOnDownloadPlan={() => handleOnDownloadPlan(data.events)}
          />
          <WeddingEventList
            events={events}
            handleOnAddSubEvent={handleOnAddSubEvent}
            handleOnAddTask={handleOnAddTask}
            handleOnAddVendor={handleOnAddVendor}
            handleOnDeleteService={handleOnDeleteService}
          />
        </div>
        <WeddingPlanSideNavber
          handleToSelectSuggestion={handleToSelectSuggestion}
        />
      </section>

      {/* Backdrop Blur Effect */}
      {(isActiveWeddingPlanForm ||
        isActiveSubEvent ||
        isActiveTask ||
        isActiveVendor) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity z-40"></div>
      )}

      {/* Sliding Form for event */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-lg md:p-6 overflow-scroll transform ${
          isActiveWeddingPlanForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveWeddingPlanForm(false)}
        >
          <X />
        </button>

        <CreateYourWeddingPlan
          setRefetch={handleRefech}
          preLoadEvent={preLoadEvent}
        />
      </div>

      {/* Sliding Form for task */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-lg md:p-6 overflow-scroll transform ${
          isActiveTask ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => {
            setIsActiveTask(false);
            setSelectedEvent(null);
          }}
        >
          <X />
        </button>

        {isActiveTask && selectedEvent && (
          <CreateTaskForm
            setRefetch={handleOnTaskCreated}
            eventId={selectedEvent}
            eventTitle={selectedEvent.eventName}
          />
        )}
      </div>

      {/* Pop-out Form for Vendor */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg p-6 transform ${
          isActiveVendor ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveVendor(false)}
        >
          <X />
        </button>

        {/* Vendor Form */}
        <AddVevdors eventId={eventId} />
      </div>
    </div>
  );
};

export default WeddingPlan;
