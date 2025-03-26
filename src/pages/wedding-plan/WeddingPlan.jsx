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
import imagebg1 from "../../../public/userprofile/imagebg1.png";

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

  //handle on download plan
  const handleOnDownloadPlan = (events) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Event Plan Details", 10, 10);

    let currentY = 20; // Track the Y position

    events.forEach((event, index) => {
      // Add Event Title
      doc.setFontSize(14);
      doc.text(`Event ${index + 1}: ${event.eventName}`, 10, currentY);

      // Event Table
      autoTable(doc, {
        startY: currentY + 5,
        head: [["Field", "Value"]],
        body: [
          ["Event Name", event.eventName],
          ["Event Date", moment(event.eventDate).format("DD-MM-YYYY")],
          ["Start Time", moment(event.eventStartTime).format("hh:mm A")],
          ["End Time", moment(event.eventEndTime).format("hh:mm A")],
          ["Budget", `${event.eventBudget}`],
          ["Description", event.eventDescription],
        ],
      });

      let totalExpense = 0; // Initialize total expense

      // Vendors Table (if available)
      if (event.eventVendors?.length > 0) {
        totalExpense = event.eventVendors.reduce(
          (sum, vendor) => sum + parseFloat(vendor.price),
          0
        );

        doc.text("Vendors", 10, doc.lastAutoTable.finalY + 10);
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 15,
          head: [["Vendor Name", "Price", "Unit"]],
          body: event.eventVendors.map((vendor) => [
            vendor.name,
            `${vendor.price}`,
            vendor.unit,
          ]),
        });

        // Display total expense
        doc.text(
          `Total Expense: ${totalExpense}`,
          10,
          doc.lastAutoTable.finalY + 10
        );
      } else {
        doc.text("No vendors available.", 10, doc.lastAutoTable.finalY + 10);
      }

      currentY = doc.lastAutoTable.finalY + 20; // Update position for next event

      // Add a new page if needed
      if (index < events.length - 1 && currentY > 250) {
        doc.addPage();
        currentY = 20;
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
      <section className=" w-full flex lg:flex-row flex-col ">
        <div className="w-full flex flex-col gap-6 lg:gap-10  lg:h-screen overflow-y-scroll">
          <div className="relative font-montserrat ">
            <div className=" inset-0 ">
              <img
                className="w-full h-full object-cover"
                src={imagebg1}
                alt="bg image"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white   text-center">
              <h2 className="text-[4vw] font-bold mb-2">
                From Wishes to Reality!
              </h2>
              <h5 className="text-[2vw] font-light">
                Curate your favorites and plan with ease.
              </h5>
            </div>
          </div>
          <div className=" lg:hidden w-full lg:w-1/3">
            <WeddingPlanSideNavber
              handleToSelectSuggestion={handleToSelectSuggestion}
            />
          </div>
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
        <div className="hidden lg:block w-full lg:w-1/3">
          <WeddingPlanSideNavber
            handleToSelectSuggestion={handleToSelectSuggestion}
          />
        </div>
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
