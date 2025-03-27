import { Outlet } from "react-router-dom";

import UserSideBar from "./UserSideBar";

const UserDashBoard = () => {
  return (
    <div className=" font-montserrat ">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between ">
        {/* Sidebar */}
        <UserSideBar  customClass={"hidden sticky top-10 lg:block"}/>

        {/* Outlet for rendering child components */}
        <div className="flex-1 overflow-y-auto h-screen bg-white ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
