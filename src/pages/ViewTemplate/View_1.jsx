import React, { useState } from 'react'
import { FaCircleArrowLeft } from "react-icons/fa6";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
function View_1() {
  const [brideName, setBrideName] = useState('');
  const handleBrideNameChange = (e) => setBrideName(e.target.value);
  const [groomName, setGroomName] = useState('');
  const handleGroomNameChange = (e) => setGroomName(e.target.value);
  const [weddingDate, setWeddingDate] = useState('');
  const handleWeddingDateChange = (e) => setWeddingDate(e.target.value);
  const [weddingTime, setWeddingTime] = useState('');
  const handleWeddingTimeChange = (e) => setWeddingTime(e.target.value);
  const [weddingLocation, setWeddingLocation] = useState('');
  const handleWeddingLocationChange = (e) => setWeddingLocation(e.target.value);
  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const [title1, setTitle1] = useState('');
  const handleTitle1Change = (e) => setTitle1(e.target.value);
  const [title2, setTitle2] = useState('');
  const handleTitle2Change = (e) => setTitle2(e.target.value);
  const handleSave = async () => {
    
    const templateData = {
    title1: title1 || "WE INVITE YOU", 
    title2: title2 || "TO CELEBRATE OUR WEDDING", 
    brideName: brideName || "Arohi", 
    groomName: groomName || "Aarav", 
    weddingDate: weddingDate || "2025-02-10", 
    weddingTime: weddingTime || "12:00 PM",
    weddingLocation: weddingLocation || "Grace Church432 Thurston Ave, Greentown",
    description: description || "A reception will follow immediately after the ceremony." 
    };
    localStorage.setItem("invitationTemplate", JSON.stringify(templateData));

    try {
      const response = await fetch('http://localhost:4000/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });
  
      if (response.ok) {
        toast.success('Data saved to MongoDB!');
      } else {
        console.error('Failed to save data to MongoDB.');
      }
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
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
                  <div className="prev_sec_53_1">
                    <div className="pre_1">
                      <div className="pre_2">{title1 || 'WE INVITE YOU'}</div>
                      <div className="pre_3">{title2 || 'TO CELEBRATE OUR WEDDING'}</div>
                      <div className="pre_4">{groomName || 'Aarav'}</div>
                      <div className="pre_5">and</div>
                      <div className="pre_6">{brideName || 'Aarohi'}</div>
                      <div className="pre_7">
                        <div className='pre_8'>
                          <div className='day'>{weddingDate || 'Saturday, May 24th'}</div>
                          <div className='day'>{weddingTime || '2:00 PM'}</div>
                          <div className='day'>{weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div>
                        </div>
                      </div>
                      <div className='day1'>{description || 'A reception will follow immediately after the ceremony.'}</div>
                    </div>
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
                  <div className="another_prev_sec_53">
                    <div className="pre_1">
                      <div className="another_pre_2">{title1 || 'WE INVITE YOU'}</div>
                      <div className="another_pre_3">{title2 || 'TO CELEBRATE OUR WEDDING'}</div>
                      <div className="another_pre_4">{groomName || 'Aarav'}</div>
                      <div className="pre_5">and</div>
                      <div className="another_pre_6">{brideName || 'Aarohi'}</div>
                      <div className="another_pre_7">
                        <div className='pre_8'>
                          <div className='another_day'>{weddingDate || 'Saturday, May 24th'}</div>
                          <div className='another_day'>{weddingTime || '2:00 PM'}</div>
                          <div className='another_day'>{weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div>
                        </div>
                      </div>
                      <div className='another_day1'>{description || 'A reception will follow immediately after the ceremony.'}</div>
                    </div>
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

export default View_1
