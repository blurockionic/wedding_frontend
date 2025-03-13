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


const WeddingPlan = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetWeddingPlanQuery();
  const [isActiveWeddingPlanForm, setIsActiveWeddingPlanForm] = useState(false);
  const [isActiveSubEvent, setIsActiveSubEvent] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState(false);
  const [isActiveVendor, setIsActiveVendor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isRefetchData, setIsRefetchData] = useState(false);
  const [eventId, setEventId] =  useState(null)
  const [preLoadEvent, setPreLoadEvent] =  useState("")


  useEffect(()=>{
    if(refetch){
      refetch() //refetch the event 
      setIsRefetchData(false)
    }
  },[isRefetchData, refetch])

  const handleOnActive = () => {
    setIsActiveWeddingPlanForm((prev) => !prev); // Toggle the state
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
    setEventId(serviceId)
    setIsActiveVendor((prev) => !prev);
  };

  //handle on dwonload plan
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
          ["Event Date", moment(event.eventDate).format('DD-MM-YYYY')],
          ["Start Time", moment(event.eventStartTime).format("hh:mm A")],
          ["End Time", moment(event.eventEndTime).format("hh:mm A")],
          ["Budget", `${event.eventBudget}`],
          ["Description", event.eventDescription],
        ],
      });
  
      let totalExpense = 0; // Initialize total expense
  
      // Vendors Table (if available)
      if (event.eventVendors?.length > 0) {
        totalExpense = event.eventVendors.reduce((sum, vendor) => sum + parseFloat(vendor.price), 0);
  
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
  const handleToSelectSuggestion =(eventName)=>{
    setPreLoadEvent(eventName)
    setIsActiveWeddingPlanForm((prev)=> !prev)

  }

  //handle on share 
  const handleOnShare =()=>{
    console.log("clicked share")
  }

  if (isLoading) return <p className="h-screen flex justify-center items-center gap-3"><Loader2 className="animate-spin"/>Loading</p>;
  if (error) return <p className="h-screen flex justify-center items-center">Error fetching wedding plans.</p>;

 
  return (
    <div className="flex-col relative">
      <section className="p-3 w-full flex ">
        <WeddingPlanSideNavber handleToSelectSuggestion={handleToSelectSuggestion}/>
        <div className="w-full p-3">
          <HeadingCard user={user}/>
          <ActionHeader 
          handleOnShare={handleOnShare}
          handleOnEventActive={handleOnActive} 
          handleOnDownloadPlan={()=>handleOnDownloadPlan(data.events)}/>
          <WeddingEventList
            data={data.events}
            handleOnAddSubEvent={handleOnAddSubEvent}
            handleOnAddTask={handleOnAddTask}
            handleOnAddVendor={handleOnAddVendor}
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
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
          isActiveWeddingPlanForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveWeddingPlanForm(false)}
        >
          <X />
        </button>

        <CreateYourWeddingPlan setRefetch={() => setIsRefetchData(true)} preLoadEvent={preLoadEvent}/>
      </div>

      {/* Sliding Form for sub-event */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
          isActiveSubEvent ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveSubEvent(false)}
        >
          <X />
        </button>

        <CreateSubEvent />
      </div> */}

      {/* Sliding Form for task */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
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

        {/* {isActiveTask && selectedEvent && ( */}
          {/* // <CreateTaskForm  */}
          {/* //   eventId={selectedEvent.id} 
          //   eventTitle={selectedEvent.title} 
          // /> */}


        {/* )} */}
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
        <AddVevdors eventId={eventId}/>
      </div>
    </div>
  );
};

export default WeddingPlan;