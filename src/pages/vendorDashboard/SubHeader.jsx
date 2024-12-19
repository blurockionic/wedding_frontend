import { useState, useEffect } from "react";
import CustomButton from "../../global/CustomButton";
import { CiImport } from "react-icons/ci";
import Calendar from 'react-calendar';
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { MdMoreVert } from "react-icons/md";

import { IoShareSocialOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { fetchDataset } from "../../../services/GetData";
import { baseUrl } from "../../../constant/constant";
import { getUserPreferences, saveUserPreferences } from "../../../services/CookieManager";
import CustomText from "../../global/CustomText";
import FileUploader from "../../../utils/FileUploader";
import CustomInput from "../../global/CustomInput";
import BarChartComponent from "../../global/charts/BarChartComponent";

const SubHeader = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenShare, setModalOpenShare] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [copyLink, setCopyLink] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [dataset, setDataSet] = useState([]);
  const [queryParams, setQueryParams] = useState({
    age: "",
    gender: "",
    from: "",
    to: "",
  });

  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  });

  const [userPrefernces, setUserPrefrences] = useState({
    from: undefined,
    to: undefined,
    age: "",
    gender: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  //  Update queryParams when searchParams or refreshKey changes
  useEffect(() => {
    setQueryParams({
      age: searchParams.get("age") || "",
      gender: searchParams.get("gender") || "",
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
    });
  }, [searchParams]);

  // useEffect(()=>{
  //   const fetchData = async (preferences: any) => {
  //     const res = await fetchDataset(preferences);
  //     console.log(res);
  //     setDataSet(res);
  //   };

  // },[queryParams])

  useEffect(() => {
    const savedPreferences = getUserPreferences();

    // Set user preferences and date from saved preferences
    if (savedPreferences) {
      setUserPrefrences(savedPreferences);
      setDate({ from: savedPreferences.from, to: savedPreferences.to });
    }

    const fetchData = async (preferences) => {
      const res = await fetchDataset(preferences);
      console.log(res);
      setDataSet(res);
    };

    if (savedPreferences) {
      // Fetch data using saved preferences if queryParams is not present
      fetchData(savedPreferences);
    }
  }, []);

  // //push into data int url
  useEffect(() => {
    const params = new URLSearchParams();

    if (userPrefernces.age) params.append("age", userPrefernces.age.toString());
    if (userPrefernces.gender) params.append("gender", userPrefernces.gender);

    // Convert the Date objects to a string format (ISO or custom format)
    if (userPrefernces.from)
      params.append("from", userPrefernces.from);
    if (userPrefernces.to) params.append("to", userPrefernces.to);

    // Dynamically update the URL with query parameters
    window.history.pushState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );

    setCopyLink(`${baseUrl}${location.pathname}?${params.toString()}`);
  }, [userPrefernces]);

  //save userpreference
  useEffect(() => {
    if (isUpdate) {
      //cookie
      saveUserPreferences(userPrefernces);
      setIsUpdate(true);
    }
  }, [isUpdate, userPrefernces]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOnSelectFrom = (selectedRange) => {
    console.log(selectedRange)
    setIsUpdate(true);
    setDate(selectedRange);

    setUserPrefrences((prev) => ({
      ...prev,
      from: selectedRange,
    }));
  };

  const handleOnSelectTo = (selectedRange)=>{
    setIsUpdate(true);
    setDate(selectedRange);

    setUserPrefrences((prev) => ({
      ...prev,
      to: selectedRange ,
    }));
  }
  console.log(userPrefernces)

  const handleOnChangeFilterGender = (value) => {
    setIsUpdate(true);
    setUserPrefrences((prev) => ({ ...prev, gender: value }));
    // setFilters((prev) => ({ ...prev, gender: value }));
  };

  const handleOnChangeFilterAge = (value) => {
    setIsUpdate(true);
    setUserPrefrences((prev) => ({ ...prev, age: value }));
    // setFilters((prev) => ({ ...prev, age: value }));
  };

  //share
  const toggleModalShare = () => {
    setModalOpenShare(!isModalOpenShare);
  };

  //copy link
  const handleOnCopyLink = (link) => {
    // Check if Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log(`Link copied to clipboard: ${link}`);
          toast.success("Link copied to clipboard");
          setModalOpenShare(false);
        })
        .catch((err) => {
          console.error("Failed to copy the link: ", err);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom
      textArea.style.left = "-9999px"; // Keep it off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        console.log(`Link copied to clipboard: ${link}`);
        toast.success("Link copied to clipboard");
        setModalOpenShare(false);
      } catch (err) {
        console.error("Failed to copy the link: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const onSearch = async () => {
    console.log(userPrefernces);
    const l = await fetchDataset(userPrefernces);
    console.log(l);
    setDataSet(l);
  };

  // const onChange =(newDate)=>{
    
  //     setSelectedDate(newDate);
  //     handleOnSelect(newDate);
    
  // }

  return (
    <>
      <div className="w-full flex lg:items-center justify-between p-4 bg-gray-100 dark:bg-gray-400">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-y-3 lg:gap-x-2">
          <div className="w-full flex justify-center lg:justify-end items-center gap-x-3">
            <select
              value={userPrefernces.age}
              onChange={(e) => handleOnChangeFilterAge(e.target.value)}
              className="w-full lg:w-[125px] dark:bg-card dark:text-card-foreground p-2 rounded-md"
            >
              <option value="" disabled>
                Age
              </option>
              <option value="15-25">15-25</option>
              <option value=">25">&gt;25</option>
            </select>

            <select
              value={userPrefernces.gender}
              onChange={(e) => handleOnChangeFilterGender(e.target.value)}
              className="w-full lg:w-[150px] dark:bg-card dark:text-card-foreground p-2 rounded-md"
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="w-full lg:w-auto flex gap-x-2">
            {/* Date Picker Button */}
            <div className="relative w-full lg:w-auto flex gap-x-2">
              <button
                id="date"
                className={`w-full lg:w-[400px] justify-start text-left font-normal flex items-center p-2 border border-gray-300 rounded-md ${
                  !userPrefernces?.from && "text-muted-foreground"
                }`}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                <CalendarIcon size={24} className="mr-2"/>
                {userPrefernces?.from ? (
                  userPrefernces?.to ? (
                    <>
                      {format(userPrefernces.from, "LLL dd, y")} -{" "}
                      {format(userPrefernces.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(userPrefernces.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </button>
             


              {/* Calendar Popup */}
              {showCalendar && (
                <div className="absolute mt-2 p-4 w-auto bg-white border border-gray-300 shadow-lg rounded-md z-50">
                  {/* <Calendar
                    initialFocus={true}
                    mode="range"
                    defaultView="month"
                    defaultMonth={userPrefernces?.from || new Date()}
                    value={selectedDate}
                    onChange={(date) => console.log(date)}
                    numberOfMonths={2}
                    className="react-calendar rounded-lg shadow-md"
                  /> */}
                  <div className="flex justify-end">
                   <X size={24} className="mr-2 bg-white text-red-500 cursor-pointer" onClick={()=>{setShowCalendar(!showCalendar)}}/>
                  </div>
                  <Calendar
                    className="z-50 p-4"
                    initialFocus={true}
                    mode="range"
                    defaultView="month"
                    defaultMonth={userPrefernces?.from}
                    value={selectedDate} 
                    onChange={(date) => handleOnSelectFrom(date)}
                  />
                  <Calendar
                  className="z-50 p-4"
                    initialFocus={true}
                    mode="range"
                    defaultView="month"
                    defaultMonth={userPrefernces?.to}
                    value={selectedDate} 
                    onChange={(date) => handleOnSelectTo(date)}
                  />
                </div>
              )}
            </div>

            {/* Search Button */}
            <CustomButton
              text="Search"
              onClick={() => onSearch()}
              iconLeft={<CiImport />}
              className="flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
            />

            {/* More Button for Mobile */}
            <div className="flex lg:hidden">
              <button
                className="flex items-center justify-center p-2 border border-gray-300 rounded-md"
                onClick={() => setShowMore((prev) => !prev)}
              >
                <MdMoreVert />
              </button>

              {/* More Options Popup */}
              {showMore && (
                <div className="absolute right-4  mt-12 w-40 bg-white border border-gray-300 shadow-lg rounded-md flex flex-col gap-y-2">
                  <CustomButton
                    text="Import"
                    onClick={toggleModal}
                    iconLeft={<CiImport />}
                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                  />
                  <CustomButton
                    text="Share"
                    onClick={toggleModalShare}
                    iconLeft={<IoShareSocialOutline />}
                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <CustomButton
            text="Import"
            onClick={toggleModal}
            iconLeft={<CiImport />}
            className="hidden lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
          />
          <CustomButton
            text="Share"
            onClick={toggleModalShare}
            iconLeft={<IoShareSocialOutline />}
            className="hidden lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
          />
        </div>

        <button
          onClick={toggleModal}
          className="fixed hidden bottom-4 right-4 z-50 items-center justify-center w-14 h-14 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {/* upload  */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-card dark:text-card-foreground dark:shadow-xl dark:shadow-white">
              <CustomText
                className="text-lg font-semibold mb-8"
                style={{ textAlign: "center", fontSize: 24 }}
              >
                Upload CSV File
              </CustomText>
              <FileUploader />
              <div className="flex justify-end space-x-2">
                <CustomButton
                  text="Cancel"
                  onClick={toggleModal}
                  className="px-4 py-2 mt-5 bg-red-500  dark:bg-red-900 rounded-md hover:bg-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* //share  */}

        {isModalOpenShare && (
          <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-card dark:text-card-foreground dark:shadow-xl dark:shadow-white">
              <CustomText
                className="text-lg font-semibold mb-8"
                style={{ textAlign: "center", fontSize: 24 }}
              >
                Share link with other
              </CustomText>
              <div className="flex justify-between items-center gap-x-2">
                <CustomInput
                  style={{ width: 290 }}
                  type="text"
                  value={copyLink}
                  className="dark:bg-gray-200 dark:text-black"
                  iconLeft={
                    <>
                      <MdContentCopy size={24} className="dark:text-black" />
                    </>
                  }
                />
                <CustomButton
                  text="Copy Link"
                  onClick={() => handleOnCopyLink(copyLink)}
                  className=" w-full px-4 py-3 text-sm bg-blue-500 dark:bg-blue-900 rounded-md hover:bg-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <CustomButton
                  text="Cancel"
                  onClick={toggleModalShare}
                  className="px-4 py-2 mt-5 bg-red-500 dark:bg-red-900 rounded-md hover:bg-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <BarChartComponent data={dataset} />
    </>
  );
};

export default SubHeader;
