import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
import { useAddTemplateMutation } from '../../redux/TemplateSlice';
function Preview_2({ pricing}) {
  const navigate = useNavigate();
  const [addTemplate, { isLoading }] = useAddTemplateMutation();
  const [eventHeading, setEventHeading] = useState('');
  const handleEventHeadingChange = (e) => setEventHeading(e.target.value);
  const [eventSubheading, setEventSubheading] = useState('');
  const handleEventSubheadingChange = (e) => setEventSubheading(e.target.value);
  const [brideName, setBrideName] = useState('');
  const handleBrideNameChange = (e) => setBrideName(e.target.value);
  const [groomName, setGroomName] = useState('');
  const handleGroomNameChange = (e) => setGroomName(e.target.value);
  const [eventDate, setEventDate] = useState('');
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const [weddingTime, setWeddingTime] = useState('');
  const handleWeddingTimeChange = (e) => setWeddingTime(e.target.value);
  const [weddingLocation, setWeddingLocation] = useState('');
  const handleWeddingLocationChange = (e) => setWeddingLocation(e.target.value);
  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  
  const handleSave = async () => {
    
    const templateData = {
      eventHeading: eventHeading || "WE INVITE YOU", 
      eventSubheading: eventSubheading || "TO CELEBRATE OUR WEDDING", 
      brideName: brideName || "Arohi", 
      groomName: groomName || "Aarav", 
      eventDate: eventDate ? new Date(eventDate).toISOString() : "2025-02-10", 
      weddingTime: weddingTime || "12:00 PM",
      weddingLocation: weddingLocation || "Grace Church432 Thurston Ave, Greentown",
      description: description || "A reception will follow immediately after the ceremony."
    };
    localStorage.setItem("invitationTemplate", JSON.stringify(templateData));

    try {
      const response = await addTemplate(templateData).unwrap();
  
      toast.success("Data saved successfully!");
      navigate(pricing === "Paid" ? "/payment" : "/card");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data.");
    }
  };


  return (
    <div className="h-[100vh] max-w-full flex justify-center items-center">
      <div className="main_temp">
        <div className="prev_section_4">
          <div className="prev_sec_4">
            <div className="prev_sec_5">
              <div className="preview_1">
                <div className="sec_52">
                  <div className="prev2_sec_53_1">
                    <div className="pre_1">
                      <div className="pre_2">{eventHeading || 'WE INVITE YOU'}</div>
                      <div className="pre_3">{eventSubheading || 'TO CELEBRATE OUR WEDDING'}</div>
                      <div className="pre_4">{groomName || 'Aarav'}</div>
                      <div className="pre_5">and</div>
                      <div className="pre_6">{brideName || 'Aarohi'}</div>
                      <div className="pre_7">
                        <div className='pre_8'>
                          <div className='day'>{eventDate || 'Saturday, May 24th'}</div>
                          <div className='day'>{weddingTime || '2:00 PM'}</div>
                          <div className='day'>{weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div>
                        </div>
                      </div>
                      <div className='day1'>{description || 'A reception will follow immediately after the ceremony.'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="temp_sec_51">
                <div className="sec_52">
                  <div className="preview_2">
                  <div className='pre_temp1'>
                      CUSTOMIZE YOUR TEMPLATE
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter your title (line 1)" value={eventHeading}
                        onChange={handleEventHeadingChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter your title (line 2)" value={eventSubheading}
                        onChange={handleEventSubheadingChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Bride name" value={brideName}
                        onChange={handleBrideNameChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Groom name" value={groomName}
                        onChange={handleGroomNameChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type='date' placeholder="Enter Day and Date" value={eventDate}
                        onChange={handleEventDateChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Time" value={weddingTime}
                        onChange={handleWeddingTimeChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Location" value={weddingLocation}
                        onChange={handleWeddingLocationChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Description" value={description}
                        onChange={handleDescriptionChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                  </div>
                  
                  <div className="sec_54">
                  <Link className="sec_56" to="/card?template=template1">
                    <div className="">Choose</div>
                  </Link>
                    <div className="sec_56" onClick={handleSave} disabled={isLoading}>{isLoading ? "Saving..." : "Save"}Save</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="another_prev_section_4">
          <div className="prev_sec_4">
            <div className="prev_sec_5">
              <div className="another_preview_1">
                <div className="sec_52">
                  <div className="another_prev2_sec_53">
                    <div className="pre_1">
                      <div className="another_pre_2">{eventHeading || 'WE INVITE YOU'}</div>
                      <div className="another_pre_3">{eventSubheading || 'TO CELEBRATE OUR WEDDING'}</div>
                      <div className="another_pre_4">{groomName || 'Aarav'}</div>
                      <div className="pre_5">and</div>
                      <div className="another_pre_6">{brideName || 'Aarohi'}</div>
                      <div className="another_pre_7">
                        <div className='pre_8'>
                          <div className='another_day'>{eventDate || 'Saturday, May 24th'}</div>
                          <div className='another_day'>{weddingTime || '2:00 PM'}</div>
                          <div className='another_day'>{weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div>
                        </div>
                      </div>
                      <div className='another_day1'>{description || 'A reception will follow immediately after the ceremony.'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="another_temp_sec_51">
                <div className="sec_52">
                  <div className="preview_2">
                  <div className='pre_temp1'>
                      CUSTOMIZE YOUR TEMPLATE
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter your title (line 1)" value={eventHeading}
                        onChange={handleEventHeadingChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter your title (line 2)" value={eventSubheading}
                        onChange={handleEventSubheadingChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Bride name" value={brideName}
                        onChange={handleBrideNameChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Groom name" value={groomName}
                        onChange={handleGroomNameChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Day and Date" value={eventDate}
                        onChange={handleEventDateChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Time" value={weddingTime}
                        onChange={handleWeddingTimeChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Location" value={weddingLocation}
                        onChange={handleWeddingLocationChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                    <div className='pre_temp'>
                      <input type="text" placeholder="Enter Description" value={description}
                        onChange={handleDescriptionChange} className="input input-bordered w-[100%] h-[60px] b_2" />
                    </div>
                  </div>
                  
                  <div className="sec_54">
                  <Link className="sec_56" to="/card">
                    <div className="sec_55">Choose</div>
                  </Link>
                    <div className="sec_56" onClick={handleSave}>Save</div>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview_2
