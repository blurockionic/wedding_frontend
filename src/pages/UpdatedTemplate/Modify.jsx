import React, { useEffect, useState } from 'react';
import { FaCircleArrowLeft } from "react-icons/fa6";
import axios from 'axios';
function Modify() {
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:4000/api/templates/latest') 
      .then((response) => {
        setTemplateData(response.data[0]); 
      })
      .catch((error) => {
        console.error("Error fetching template:", error);
      });
  }, []);

  if (!templateData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className="h-[100vh] max-w-full flex justify-center items-center">
      <div className="arrow2"><a href="/guests"><FaCircleArrowLeft /></a></div>
      <div className="main_temp">
        <div className="view_prev_section_4">
          <div className="prev_sec_4">
            <div className="prev_sec_5">
              <div className="view_preview_1">
                <div className="sec_52">
                  <div className="prev_sec_53">
                    <div className="pre_1">
                      <div className="view_pre_2">{templateData.title1 || 'WE INVITE YOU'}</div>
                      <div className="view_pre_3">{templateData.title2 || 'TO CELEBRATE OUR WEDDING'}</div>
                      <div className="view_pre_4">{templateData.groomName || 'Aarav'}</div>
                      <div className="pre_5">and</div>
                      <div className="view_pre_6">{templateData.brideName || 'Aarohi'}</div>
                      <div className="view_pre_7">
                        <div className='pre_8'>
                          <div className='view_day'>{templateData.weddingDate || 'Saturday, May 24th'}</div>
                          <div className='view_day'>{templateData.weddingTime || '2:00 PM'}</div>
                          <div className='view_day'>{templateData.weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div>
                        </div>
                      </div>
                      <div className='view_day1'>{templateData.description || 'A reception will follow immediately after the ceremony.'}</div>
                    </div>
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

export default Modify

