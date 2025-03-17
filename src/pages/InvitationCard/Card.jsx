import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAddGuestMutation } from "../../redux/apiSlice.guest";

const Card = () => {
  const [addGuest, { isLoading, isError }] = useAddGuestMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get the template value passed from the Preview component
  const template = searchParams.get("template");

  const [guestData, setGuestData] = useState({
    name: "",
    phone: "",
    status: "Not invited",
  });

  const handleAddGuest = async () => {
    const res = await addGuest(
      { ...guestData, template },
    ).unwrap();
    if (!res.success) {
      console.log(res.error);
      toast.error(res.message);
    } else {
      toast.success(res.message);
      setGuestData({
        name: "",
        phone: "",
        status: "Not invited",

      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen md:p-8 md:w-screen flex justify-center items-center">
      <div className="arrow2">
        <a href="/preview">
          <FaCircleArrowLeft />
        </a>
      </div>
      <div className="h-[95vh] w-[90%] flex justify-center items-center image">
        <div className="md:h-[70%] w-[70%] bg-white h-[90%] rounded-2xl opacity-[90%]">
          <div className="md:h-[90px] md:w-[100%] para md:mt-[60px] mt-[10px] h-[130px]">
            {" "}
            You're invited to a beautiful weeding
          </div>
          <div className="para_1">Celebration</div>
          <div>
            <div className="para_2">
              Please help us make our special day even more memorable by adding
              your{" "}
            </div>
            <div className="para_3">guests below</div>
            <div className="h-5 w-[100%] flex justify-center items-center">
              <div className="md:h-1 md:w-[12%] h-1 w-[20%] bg-[#ff2f7b] rounded-lg mt-6"></div>
            </div>
          </div>
          <div className="b_4 gap-0 ">
            <input
              type="text"
              placeholder="Guest Name"
              value={guestData.name}
              onChange={handleInputChange}
              className="input input-bordered w-[412.47px] h-[60px] b_5"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={guestData.phone}
              onChange={handleInputChange}
              className="input input-bordered w-[412.47px] h-[60px] b_5"
            />
          </div>
          <div className="md:flex md:justify-center md:items-center md:gap-4 mt-10 md:visible hidden">
            <Link to={`/guests?template=${template}`}>
              <button className="btn_1 gap-3">
                <IoPersonAddSharp />
                Add Guests
              </button>
            </Link>
            <button className="btn_2 gap-3">
              <span className="text-[30px]">
                <MdMailOutline />
              </span>
              Send Invitation
            </button>
            <button className="btn_3 gap-3">
              <span className="text-[30px]">
                <MdMailOutline />
              </span>
              View guests
            </button>
          </div>
          <div className="md:flex md:justify-center md:items-center md:gap-4 mt-10 lg:hidden block">
            <div>
              <button className="btn_1 gap-3" onClick={handleAddGuest}>
                <IoPersonAddSharp />
                Add Guests
              </button>
            </div>
            <Link to="/guests/see-Template/template">
              <button className="btn_2 gap-3">
                <span className="text-[20px] mt-1">
                  <GrView />
                </span>
                View Template
              </button>
            </Link>
            <Link to="/guests">
              <button className="btn_3 gap-3">
                <span className="text-[30px]">
                  <MdMailOutline />
                </span>
                View guests
              </button>
            </Link>
          </div>
          <div className="md:h-[140px] h-[80px] md:w-[100%] flex justify-center items-center text-[#6f6868] w-[95%] md:ms-0 ms-2 md:text-[15px] text-[14px]">
            Click "Add Guests" to start creating your guest list
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
