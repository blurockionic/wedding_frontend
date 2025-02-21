import React, { useState, useEffect } from 'react'
import axios from "axios";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link ,useLocation} from "react-router-dom";
import {toast} from 'react-toastify';
const Guest = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the 'template' query parameter
  const template = searchParams.get('template');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState([]);
  const [status, setStatus] = useState('Not invited');

  const addGuest = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/guests/add', {
        name,
        phone,
        status: status ||"not invited"
      });
      
      setName('');
      setPhone('');
      setStatus("Not invited");
      toast.success("Guest added successfully");
    } catch (error) {
      console.error('Error adding guest:', error);
      toast.error("Fill details");
    }
  };

  const getGuests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/guests');
      setGuests(response.data.guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      getGuests();
    }
  }, []);

  const updateStatus = async (guestId, currentStatus) => {
    const newStatus = currentStatus === 'Not invited' ? 'Invited' : 'Not invited';
    try {
      await axios.put(`http://localhost:4000/api/guests/update-status/${guestId}`, {
        status: newStatus,
      });

      // Update status in frontend list
      setGuests(guests.map(guest =>
        guest._id === guestId ? { ...guest, status: newStatus } : guest
      ));
      toast.success("Status updated successfully");
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error("Error updating status");
    }
  };

  const deleteGuest = async (guestId) => {
    try {
      await axios.delete(`http://localhost:4000/api/guests/delete/${guestId}`);

      // Remove the guest from the local state
      setGuests(guests.filter(guest => guest._id !== guestId));
      toast.success("Guest deleted successfully");
    } catch (error) {
      console.error('Error deleting guest:', error);
      toast.error("Error deleting guest");
    }
  };

  const handleCopyLink = () => {
    const templateUrl = window.location.origin + `/guests/see-template/${template}`; 
    navigator.clipboard.writeText(templateUrl)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        toast.error("Failed to copy link");
        console.error(error);
      });
  };

  return (
    <div>
      <div className="min-h-screen md:p-8 md:w-screen flex justify-center items-center">
        <div className="arrow2"><a href="/card"><FaCircleArrowLeft /></a></div>
      <div className="h-[95vh] w-[90%] flex justify-center items-center image gap-0">
        <div className="md:h-[75%] w-[70%] bg-white h-[90%] rounded-2xl opacity-[90%] ms-[120px] md:block hidden">
          <div className="md:h-[90px] md:w-[100%] para mt-[30px] h-[130px]"> You're invited to a beautiful weeding</div>
          <div className="para_1">Celebration</div>
          <div>
            <div className="para_2">Please help us make our special day even more memorable by adding your guests</div>
            <div className="para_3"> below</div>
            <div className="h-5 w-[100%] flex justify-center items-center"><div className="h-1 w-[12%] bg-[#ff2f7b] rounded-lg mt-6"></div></div>
          </div>
          <div className="box">
            <div className="b_1 gap-8 ">
              <input type="text" placeholder="Guest Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-[412.47px] h-[60px] b_2" />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered w-[412.47px] h-[60px] b_2" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-10 ">
            <button className="btn_1 gap-3" onClick={addGuest}><IoPersonAddSharp />Add Guests</button>
            <button className="btn_2 gap-3"onClick={getGuests}><span className="text-[35px]"><FaUsersViewfinder /></span>View Guests</button>
            <Link to={`/guests/see-template/${template}`}>
              <button className="btn_2 gap-3"><span className="text-[20px] mt-1"><GrView /></span>View Template</button>
            </Link>
          </div>
          <div className="h-[140px] w-[100%] flex justify-center items-center text-[#6f6868]">Click "Add Guests" to start creating your guest list</div>
        </div>
        <div className="md:h-[92vh] md:w-[300px] h-[90vh] w-[400px] bg-white md:ms-[60px] ms-[0px] rounded-lg opacity-[90%]">
          <div className="btn_gl gap-4"><span className="list"><MdPlaylistAdd /></span>GuestsList</div>
          <div className="h-5 w-[100%] flex justify-center items-center"><div className="h-1.5 w-[50%] bg-[#ff2f7b] rounded-2xl mt-6"></div></div>
          <div className="new_list">
          <ul>
            {guests.map((guest) => (
              <>
              <div className="flex items-center justify-evenly">
              <li className="n_list" key={guest._id}>{guest.name}<li>{guest.phone}</li></li>
              <li className="invite"><button 
              onClick={() => updateStatus(guest._id, guest.status)}
              style={{ cursor: 'pointer', color: guest.status === 'Not invited' ? 'red' : 'green' }}
              >
              {guest.status}
              </button></li>
              <li className="delete mt-1 text-lg">
                <button onClick={() => deleteGuest(guest._id)} style={{ cursor: 'pointer', color: 'red' }}>
                  <MdDeleteForever />
                </button>
              </li>
              </div>
              </>
            ))}
          </ul>
          </div>
          <button className="btn_6 gap-3 mt-5 ms-9" onClick={handleCopyLink}>
            <span className="text-[20px]"></span> Copy Template Link
          </button>
          <button className="btn_6 gap-3 mt-10 ms-9"><span className="text-[30px]"><MdMailOutline /></span>Send Invitation</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Guest

