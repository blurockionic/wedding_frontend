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
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

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
    // More subtle color palette
    const weddingPink = "#E91E63"; // Main accent color (slightly muted)
    const weddingRed = "#C62828"; // Deeper red for headings
    const weddingGold = "#E6C200"; // More subtle gold
    const weddingCream = "#FFF8E6"; // Background cream color
    const weddingLightPink = "#FCE4EC"; // Very light pink for sections
    const textColor = "#424242"; // Darker grey for better readability

    // Format date function
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    // Format time function
    const formatTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const content = [];

    // Title with decorative elements
    content.push({
      stack: [
        {
          canvas: [
            {
              type: "rect",
              x: 125,
              y: 0,
              w: 300,
              h: 50,
              r: 5,
              lineWidth: 2,
              lineColor: weddingPink,
              fillOpacity: 0.05,
              fillColor: weddingLightPink,
            },
          ],
        },
        {
          text: "॥ Indian Wedding Event Plan ॥",
          fontSize: 22,
          bold: true,
          color: weddingRed,
          alignment: "center",
          margin: [0, 15, 0, 0],
        },
      ],
      margin: [0, 10, 0, 30],
    });

    events.forEach((event, index) => {
      // Event header with decorative circle
      content.push({
        stack: [
          {
            canvas: [
              {
                type: "ellipse",
                x: 257.5,
                y: 15,
                r1: 100,
                r2: 1,
                lineWidth: 1,
                lineColor: weddingGold,
              },
            ],
            absolutePosition: { x: 40, y: content.length * 20 + 90 },
          },
          {
            text: `Event ${index + 1}: ${event.eventName}`,
            fontSize: 18,
            color: weddingRed,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
        ],
      });

      // Event details - top row with two boxes side by side
      content.push({
        columns: [
          {
            width: "48%",
            stack: [
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 235,
                    h: 70,
                    r: 10,
                    lineWidth: 1,
                    lineColor: weddingPink,
                    fillOpacity: 0.03,
                    fillColor: weddingLightPink,
                  },
                ],
              },
              {
                text: "Event Name",
                fontSize: 12,
                bold: true,
                color: weddingRed,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {
                text: event.eventName,
                fontSize: 14,
                color: textColor,
                alignment: "center",
                margin: [0, 0, 0, 5],
              },
              {
                text: "Date",
                fontSize: 12,
                bold: true,
                color: weddingRed,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {
                text: formatDate(event.eventDate),
                fontSize: 14,
                color: textColor,
                alignment: "center",
                margin: [0, 0, 0, 0],
              },
            ],
            margin: [0, 0, 10, 0],
          },
          {
            width: "48%",
            stack: [
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 235,
                    h: 70,
                    r: 10,
                    lineWidth: 1,
                    lineColor: weddingPink,
                    fillOpacity: 0.03,
                    fillColor: weddingLightPink,
                  },
                ],
              },
              {
                text: "Timings",
                fontSize: 12,
                bold: true,
                color: weddingRed,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {
                text: `${formatTime(event.eventStartTime)} - ${formatTime(event.eventEndTime)}`,
                fontSize: 14,
                color: textColor,
                alignment: "center",
                margin: [0, 0, 0, 5],
              },
              {
                text: "Budget",
                fontSize: 12,
                bold: true,
                color: weddingRed,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {
                text: `₹${event.eventBudget}`,
                fontSize: 14,
                color: textColor,
                alignment: "center",
                margin: [0, 0, 0, 0],
              },
            ],
            margin: [10, 0, 0, 0],
          },
        ],
        margin: [0, 0, 0, 15],
      });

      // Description box - full width
      content.push({
        stack: [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 490,
                h: 55,
                r: 10,
                lineWidth: 1,
                lineColor: weddingPink,
                fillOpacity: 0.02,
                fillColor: weddingLightPink,
              },
            ],
          },
          {
            text: "Description",
            fontSize: 12,
            bold: true,
            color: weddingRed,
            alignment: "center",
            margin: [0, 5, 0, 5],
          },
          {
            text: event.eventDescription || "No description provided",
            fontSize: 14,
            color: textColor,
            alignment: "center",
            margin: [40, 5, 40, 0],
          },
        ],
        margin: [0, 0, 0, 20],
      });

      // Vendors Section with decorative elements
      if (event.eventVendors?.length > 0) {
        content.push({
          columns: [
            {
              width: 100,
              stack: [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 5,
                      x2: 100,
                      y2: 5,
                      lineWidth: 1,
                      lineColor: weddingGold,
                    },
                  ],
                },
              ],
            },
            {
              width: "*",
              text: "Vendors & Services",
              fontSize: 16,
              color: weddingRed,
              bold: true,
              alignment: "center",
            },
            {
              width: 100,
              stack: [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 5,
                      x2: 100,
                      y2: 5,
                      lineWidth: 1,
                      lineColor: weddingGold,
                    },
                  ],
                },
              ],
            },
          ],
          margin: [0, 10, 0, 15],
        });

        // Create vendor cards in a cleaner layout
        const vendorRows = [];
        for (let i = 0; i < event.eventVendors.length; i += 2) {
          const vendorRow = {
            columns: [],
          };

          // First vendor in the row
          vendorRow.columns.push({
            width: "48%",
            stack: [
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 230,
                    h: 60,
                    r: 5,
                    lineWidth: 1,
                    lineColor: weddingPink,
                    fillOpacity: 0.02,
                    fillColor: weddingLightPink,
                  },
                ],
              },
              {
                columns: [
                  {
                    width: "*",
                    text: event.eventVendors[i].name,
                    fontSize: 14,
                    bold: true,
                    color: weddingRed,
                    margin: [10, 8, 0, 0],
                  },
                  {
                    width: "auto",
                    text: `₹${event.eventVendors[i].price}`,
                    fontSize: 14,
                    bold: true,
                    color: textColor,
                    margin: [0, 8, 10, 0],
                  },
                ],
              },
              {
                text: `Unit: ${event.eventVendors[i].unit}`,
                fontSize: 12,
                color: textColor,
                margin: [10, 8, 10, 0],
              },
            ],
            margin: [0, 0, 10, 10],
          });

          // Second vendor in the row (if exists)
          if (i + 1 < event.eventVendors.length) {
            vendorRow.columns.push({
              width: "48%",
              stack: [
                {
                  canvas: [
                    {
                      type: "rect",
                      x: 0,
                      y: 0,
                      w: 230,
                      h: 60,
                      r: 5,
                      lineWidth: 1,
                      lineColor: weddingPink,
                      fillOpacity: 0.02,
                      fillColor: weddingLightPink,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      width: "*",
                      text: event.eventVendors[i + 1].name,
                      fontSize: 14,
                      bold: true,
                      color: weddingRed,
                      margin: [10, 8, 0, 0],
                    },
                    {
                      width: "auto",
                      text: `₹${event.eventVendors[i + 1].price}`,
                      fontSize: 14,
                      bold: true,
                      color: textColor,
                      margin: [0, 8, 10, 0],
                    },
                  ],
                },
                {
                  text: `Unit: ${event.eventVendors[i + 1].unit}`,
                  fontSize: 12,
                  color: textColor,
                  margin: [10, 8, 10, 0],
                },
              ],
              margin: [10, 0, 0, 10],
            });
          } else {
            // Add empty space if no second vendor
            vendorRow.columns.push({
              width: "48%",
              text: "",
              margin: [10, 0, 0, 0],
            });
          }

          vendorRows.push(vendorRow);
        }

        // Add vendor rows to content
        vendorRows.forEach((row) => content.push(row));

        // Total expense with subtle styling
        content.push({
          columns: [
            { width: "30%", text: "" },
            {
              width: "40%",
              stack: [
                {
                  canvas: [
                    {
                      type: "rect",
                      x: 0,
                      y: 0,
                      w: 200,
                      h: 30,
                      r: 5,
                      lineWidth: 1,
                      lineColor: weddingRed,
                      fillOpacity: 0.05,
                      fillColor: weddingLightPink,
                    },
                  ],
                },
                {
                  text: `Total Expense: ₹${event.eventVendors.reduce(
                    (sum, vendor) => sum + parseFloat(vendor.price),
                    0,
                  )}`,
                  fontSize: 14,
                  bold: true,
                  color: weddingRed,
                  alignment: "center",
                  margin: [0, 8, 0, 0],
                },
              ],
            },
            { width: "30%", text: "" },
          ],
          margin: [0, 10, 0, 20],
        });
      } else {
        // No vendors message with better alignment
        content.push({
          stack: [
            {
              canvas: [
                {
                  type: "rect",
                  x: 145,
                  y: 0,
                  w: 200,
                  h: 30,
                  r: 5,
                  lineWidth: 1,
                  lineColor: weddingPink,
                  fillOpacity: 0.02,
                  fillColor: weddingLightPink,
                },
              ],
            },
            {
              text: "No vendors available.",
              fontSize: 14,
              color: textColor,
              italics: true,
              alignment: "center",
              margin: [0, 8, 0, 0],
            },
          ],
          margin: [0, 10, 0, 20],
        });
      }

      // Decorative separator - more subtle and aligned
      content.push({
        columns: [
          {
            width: "35%",
            stack: [
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 7,
                    x2: 165,
                    y2: 7,
                    lineWidth: 1,
                    lineColor: weddingGold,
                  },
                ],
              },
            ],
          },
          {
            width: "30%",
            stack: [
              {
                canvas: [
                  {
                    type: "polyline",
                    lineWidth: 1,
                    closePath: true,
                    points: [
                      { x: 0, y: 0 },
                      { x: 75, y: 15 },
                      { x: 150, y: 0 },
                    ],
                    color: weddingRed,
                    fillOpacity: 0.1,
                  },
                ],
              },
            ],
          },
          {
            width: "35%",
            stack: [
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 7,
                    x2: 165,
                    y2: 7,
                    lineWidth: 1,
                    lineColor: weddingGold,
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 15, 0, 15],
      });
    });

    // Footer with better alignment
    const footer = (currentPage, pageCount) => {
      return {
        columns: [
          { width: "35%", text: "" },
          {
            width: "30%",
            stack: [
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 5,
                    x2: 150,
                    y2: 5,
                    lineWidth: 1,
                    lineColor: weddingPink,
                  },
                ],
              },
              {
                text: `Page ${currentPage} of ${pageCount}`,
                alignment: "center",
                fontSize: 10,
                color: weddingRed,
                margin: [0, 5, 0, 0],
              },
            ],
          },
          { width: "35%", text: "" },
        ],
        margin: [0, 10, 0, 0],
      };
    };

    // PDF Definition with more subtle border design
    const docDefinition = {
      content,
      footer,
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      background: (currentPage) => {
        return {
          canvas: [
            // Main border with more subtle coloring
            {
              type: "rect",
              x: 20,
              y: 20,
              w: 555,
              h: 800,
              lineWidth: 2,
              color: weddingCream,
              lineColor: weddingPink,
            },
            // Inner border - more subtle
            {
              type: "rect",
              x: 30,
              y: 30,
              w: 535,
              h: 780,
              lineWidth: 0.5,
              lineColor: weddingGold,
            },
            // Corner decorations - more subtle and properly aligned
            // Top left
            {
              type: "polyline",
              lineWidth: 1,
              closePath: true,
              points: [
                { x: 20, y: 20 },
                { x: 40, y: 30 },
                { x: 30, y: 40 },
              ],
              color: weddingGold,
              fillOpacity: 0.3,
            },
            // Top right
            {
              type: "polyline",
              lineWidth: 1,
              closePath: true,
              points: [
                { x: 575, y: 20 },
                { x: 555, y: 30 },
                { x: 565, y: 40 },
              ],
              color: weddingGold,
              fillOpacity: 0.3,
            },
            // Bottom left
            {
              type: "polyline",
              lineWidth: 1,
              closePath: true,
              points: [
                { x: 20, y: 820 },
                { x: 40, y: 810 },
                { x: 30, y: 800 },
              ],
              color: weddingGold,
              fillOpacity: 0.3,
            },
            // Bottom right
            {
              type: "polyline",
              lineWidth: 1,
              closePath: true,
              points: [
                { x: 575, y: 820 },
                { x: 555, y: 810 },
                { x: 565, y: 800 },
              ],
              color: weddingGold,
              fillOpacity: 0.3,
            },
          ],
        };
      },
    };

    // Generate and download PDF with formatted date
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    pdfMake
      .createPdf(docDefinition)
      .download(`wedding-plan-${formattedDate}.pdf`);
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
