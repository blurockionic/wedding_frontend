import { useEffect, useState } from "react";
import ActionHeader from "./component/ActionHeader";
import CreateYourWeddingPlan from "./component/CreateYourWeddingPlan";
import HeadingCard from "./component/HeadingCard";
import WeddingEventList from "./component/WeddingEventList";
import WeddingPlanSideNavber from "./component/WeddingPlanSideNavber";
import { Loader2, X, Menu } from "lucide-react";
import AddVevdors from "./component/AddVevdors";
import { useGetWeddingPlanQuery } from "../../redux/weddingPlanSlice";
import moment from "moment";
import { useSelector } from "react-redux";
import CreateTaskForm from "./component/CreateTaskForm";
import DocumentTemplate from "./component/DocumentTemplate";
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
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  //handle to select suggestion
  const handleToSelectSuggestion = (eventName) => {
    setPreLoadEvent(eventName);
    setIsActiveWeddingPlanForm((prev) => !prev);
  };

  //handle on share
  const handleOnShare = () => {
    console.log("clicked share");
  };

  // Handle document preview/download
  const handleOnDownloadPlan = () => {
    setShowDocumentPreview(true);
  };

  //handle refetch
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

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
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
      <p className="h-screen flex justify-center items-center p-4 text-center">
        Please login to use the wedding planning diary.
      </p>
    );

  return (
    <div className="flex-col relative">
      {/* Document Preview Modal */}
      {showDocumentPreview && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-start pt-4 sm:pt-10 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl mb-10">
              <div className="sticky top-0 bg-white z-10 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-2xl font-serif text-pink-600">Wedding Plan Preview</h2>
                <button 
                  onClick={() => setShowDocumentPreview(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-3 sm:p-6">
                <DocumentTemplate events={events} user={user} />
              </div>
            </div>
          </div>
        </>
      )}

      <section className="flex flex-col lg:flex-row w-full">
      <div className="w-full flex flex-col gap-6 lg:gap-10  lg:h-screen overflow-y-scroll">
          <div className="relative font-montserrat ">
            <div className=" inset-0 ">
              <img
                className="w-full h-[15vh]  md:h-[25vh] object-cover"
                src={imagebg1}
                alt="bg image"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white   text-center">
              <h2 className="text-[5vw] sm:text-[3vw] md:text-[2vw] lg:text-[3vw] font-bold mb-2">
                From Wishes to Reality!
              </h2>
              <h5 className="text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] font-light">
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

      {/* Backdrop for mobile sidebar */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30" onClick={toggleSidebar}></div>
      )}

      {/* Backdrop Blur Effect for forms */}
      {(isActiveWeddingPlanForm ||
        isActiveSubEvent ||
        isActiveTask ||
        isActiveVendor) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity z-40"></div>
      )}

      {/* Sliding Form for event */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg p-4 sm:p-6 overflow-auto transform ${
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg p-4 sm:p-6 overflow-auto transform ${
          isActiveTask ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
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
        className={`fixed top-0 right-0 h-full w-[90%] bg-white shadow-lg p-4 sm:p-6 transform ${
          isActiveVendor ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-100 z-50 bg-primary rounded-full"
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