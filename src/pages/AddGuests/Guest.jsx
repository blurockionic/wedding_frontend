import React, { useState, useEffect, useCallback } from 'react';
import { FaUsersViewfinder } from 'react-icons/fa6';
import { MdDeleteForever, MdMailOutline, MdPlaylistAdd } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { GrView } from 'react-icons/gr';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    useGetGuestsQuery,
    useAddGuestMutation,
    useUpdateGuestStatusMutation,
    useDeleteGuestMutation,
} from '../../redux/apiSlice.guest';

// Reusable Styled Button Component
const StyledButton = ({ className, gapClass = 'gap-3', icon, text, onClick, disabled }) => (
    <button className={`${className} ${gapClass} flex justify-center items-center`} onClick={onClick} disabled={disabled}>
        {icon && <span className="text-[20px] md:text-[inherit]">{icon}</span>}
        {text}
    </button>
);

// Reusable Invitation Card Component
const InvitationCard = ({ children, isMobileList = false }) => (
    <div className={`bg-white rounded-2xl opacity-[90%] ${isMobileList ? 'md:h-[92vh] md:w-[300px] h-[90vh] w-[400px] md:ms-[60px] ms-[0px]' : 'md:h-[75%] md:w-[70%] h-[90%] ms-[120px] md:block hidden'}`}>
        {!isMobileList && ( // Conditionally render header for main card only
            <>
                <div className="md:h-[90px] md:w-[100%] para mt-[30px] h-[130px]"> You're invited to a beautiful weeding</div>
                <div className="para_1">Celebration</div>
                <div>
                    <div className="para_2">Please help us make our special day even more memorable by adding your guests</div>
                    <div className="para_3"> below</div>
                    <div className="h-5 w-[100%] flex justify-center items-center"><div className="h-1 w-[12%] bg-[#ff2f7b] rounded-lg mt-6"></div></div>
                </div>
            </>
        )}
        {children}
    </div>
);


const Guest = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const template = searchParams.get('template');
    const navigate =  useNavigate();

    const { data: guestsData, isLoading: isGuestsLoading, isError: isGuestsError, refetch: getGuests } = useGetGuestsQuery();
    const [addGuestApi, { isLoading: isAddGuestLoading }] = useAddGuestMutation();
    const [updateGuestStatusApi, { isLoading: isUpdateStatusLoading }] = useUpdateGuestStatusMutation();
    const [deleteGuestApi, { isLoading: isDeleteGuestLoading }] = useDeleteGuestMutation();

    const [guestInput, setGuestInput] = useState({ name: '', phone: '', status: 'Not invited' });
    const { name, phone, status } = guestInput;
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        if (guestsData?.guests) {
            setGuests(guestsData.guests);
            getGuests();
        }
    }, [guestsData]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setGuestInput(prevInput => ({ ...prevInput, [name]: value }));
    }, []);

    const addGuestHandler = useCallback(async () => {
        try {
            const res = await addGuestApi({ name, phone, status }).unwrap();
            if (res.success) {
                toast.success(res.message);
                setGuestInput({ name: '', phone: '', status: 'Not invited' });
                getGuests();
            } else {
                toast.error(res.message || "Failed to add guest");
            }
        } catch (error) {
            toast.error("Error adding guest. Please try again.");
            console.error("Error adding guest:", error);
        }
    }, [addGuestApi, getGuests, name, phone, status]);

    const updateStatus = useCallback(async (guestId, currentStatus) => {



     
      

        console.log(currentStatus);
        
        const newStatus = currentStatus === 'NOT_INVITED' ? 'Invited' : 'Not invited';

          const guestInputDAta = {...guestInput, status: newStatus };

        try {
            const res = await updateGuestStatusApi({  guestId, guestInputDAta }).unwrap();
            if (res.success) {
                toast.success(res.message || `Guest status updated to ${newStatus}`);
                getGuests();
            } else {
                toast.error(res.message || "Failed to update guest status");
            }
        } catch (error) {
            toast.error("Error updating guest status. Please try again.");
            console.error("Error updating guest status:", error);
        }
    }, [updateGuestStatusApi, getGuests]);

    const deleteGuest = useCallback(async (guestId) => {
        try {
            const res = await deleteGuestApi(guestId).unwrap();
            if (res.success) {
                toast.success(res.message || "Guest deleted successfully");
                getGuests();
            } else {
                toast.error(res.message || "Failed to delete guest");
            }
        } catch (error) {
            toast.error("Error deleting guest. Please try again.");
            console.error("Error deleting guest:", error);
        }
    }, [deleteGuestApi, getGuests]);

    console.log("Guests:", guests);
    

    const handleCopyLink = useCallback(() => {
        const templateUrl = `${window.location.origin}/guests/see-template/${template}`;
        navigator.clipboard.writeText(templateUrl)
            .then(() => toast.success("Template link copied to clipboard"))
            .catch((error) => {
                toast.error("Failed to copy template link");
                console.error("Clipboard copy error:", error);
            });
    }, [template]);


    const navigateHandler = (template) => {
        navigate(`/guests/see-template/${template}`);
    }

    

    return (
        <div>
            <div className="min-h-screen md:p-8 md:w-screen flex justify-center items-center">
                <div className="arrow2"><Link to="/card"><FaCircleArrowLeft /></Link></div>
                <div className="h-[95vh] w-[90%] flex justify-center items-center image gap-0">

                    {/* Main Invitation Card */}
                    <InvitationCard>
                        <div className="box">
                            <div className="b_1 gap-8 ">
                                <input
                                    type="text"
                                    placeholder="Guest Name"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-[412.47px] h-[60px] b_2"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={phone}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-[412.47px] h-[60px] b_2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-10 ">
                            <StyledButton
                                className="btn_1"
                                icon={<IoPersonAddSharp />}
                                text="Add Guests"
                                onClick={addGuestHandler}
                                disabled={isAddGuestLoading}
                            />
                            <StyledButton
                                className="btn_2"
                                icon={<FaUsersViewfinder className="text-[35px]" />}
                                text="View Guests"
                                onClick={getGuests}
                                disabled={isGuestsLoading}
                            />
                            <NavLink to={`/guests/see-template/${template}`}>
                                <StyledButton
                                    className="btn_2"
                                    icon={<GrView />}
                                    text="View Template"
                                />
                            </NavLink>
                        </div>
                        <div className="h-[140px] w-[100%] flex justify-center items-center text-[#6f6868]">Click "Add Guests" to start creating your guest list</div>
                    </InvitationCard>

                    {/* Mobile Guest List Card */}
                    <InvitationCard isMobileList={true}>
                        <div className="btn_gl gap-4"><span className="list"><MdPlaylistAdd /></span>GuestsList</div>
                        <div className="h-5 w-[100%] flex justify-center items-center"><div className="h-1.5 w-[50%] bg-[#ff2f7b] rounded-2xl mt-6"></div></div>
                        <div className="new_list">
                            <ul>
                                {isGuestsLoading ? (
                                    <li>Loading guests...</li>
                                ) : isGuestsError ? (
                                    <li>Error loading guests.</li>
                                ) : guests.map((guest) => (
                                    <li key={guest.id}>
                                        <div className="flex items-center justify-evenly">
                                            <li className="n_list">{guest.name}<li>{guest.phone}</li></li>
                                            <li className="invite">
                                                <StyledButton
                                                    text={guest.status}
                                                    onClick={() => updateStatus(guest.id, guest.status)}
                                                    disabled={isUpdateStatusLoading}
                                                    gapClass="gap-0" // Adjust gap for text-only button
                                                    className={`invite-button ${guest.status === 'Not invited' ? 'not-invited' : 'invited'}`} // Apply status-based class
                                                />
                                            </li>
                                            <li className="delete mt-1 text-lg">
                                                <StyledButton
                                                    onClick={() => deleteGuest(guest.id)}
                                                    disabled={isDeleteGuestLoading}
                                                    gapClass="gap-0" // Adjust gap for icon-only button
                                                    className="delete-button"
                                                    icon={<MdDeleteForever />}
                                                />
                                            </li>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <StyledButton
                            className="btn_6"
                            text="Copy Template Link"
                            onClick={handleCopyLink}
                            gapClass="gap-3 mt-5 ms-9"
                        />
                        <StyledButton
                            className="btn_6"
                            icon={<MdMailOutline className="text-[30px]" />}
                            text="Send Invitation"
                            gapClass="gap-3 mt-10 ms-9"
                        />
                    </InvitationCard>
                </div>
            </div>
        </div>
    );
}

export default Guest;