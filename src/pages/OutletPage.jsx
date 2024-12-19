import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function OutletPage() {



  

  return (
    <>
     <div className=""><Navbar /> </div>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}