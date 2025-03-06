import React, { useEffect, useState } from 'react';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useGetTemplateByIdQuery } from '../../redux/TemplateSlice';
import { useParams, Link } from 'react-router-dom'; // Import Link for better navigation

function Modify() {
    const { template } = useParams();
    const templateId = template;

   
    const { data: fetchedTemplateResponse, isLoading, isError, error } = useGetTemplateByIdQuery(templateId);

    const [templateData, setTemplateData] = useState(null);

    useEffect(() => {
        if (fetchedTemplateResponse && fetchedTemplateResponse.success && fetchedTemplateResponse.template) {
            const templateArray = fetchedTemplateResponse.template;
            if (templateArray && templateArray.length > 0) {
                setTemplateData(templateArray[0]); 
            } else {
                setTemplateData(null);
            }
        } else {
            setTemplateData(null);
        }
    }, [fetchedTemplateResponse]);


    if (isLoading) {
        return <div>Loading template...</div>;
    }

    if (isError) {
        return (
            <div>
                <h4>Error loading template</h4>
                <p>There was an error loading the template. Please try again or check the template ID.</p>
                {error && error.message && <p>Error details: {error.message}</p>}
                <p><Link to="/guests">Go back to Guests page</Link></p>
            </div>
        );
    }

    if (!templateData) {
        return <div>No template data found.</div>; // Displayed if API response is successful but template array is empty or no template is found
    }

    return (
        <div>
            <div className="h-[100vh] max-w-full flex justify-center items-center">
                <div className="arrow2">
                    <Link to="/guests">
                        <FaCircleArrowLeft />
                    </Link>
                </div>
                <div className="main_temp">
                    <div className="view_prev_section_4">
                        <div className="prev_sec_4">
                            <div className="prev_sec_5">
                                <div className="view_preview_1">
                                    <div className="sec_52">
                                        <div className="prev_sec_53">
                                            <div className="pre_1">
                                                <div className="view_pre_2">{templateData.eventHeading || 'WE INVITE YOU'}</div> {/* Use eventHeading from response */}
                                                <div className="view_pre_3">{templateData.eventSubheading || 'TO CELEBRATE OUR WEDDING'}</div> {/* Use eventSubheading from response */}
                                                <div className="view_pre_4">{templateData.groomName || 'Aarav'}</div>
                                                <div className="pre_5">and</div>
                                                <div className="view_pre_6">{templateData.brideName || 'Aarohi'}</div>
                                                <div className="view_pre_7">
                                                    <div className='pre_8'>
                                                        <div className='view_day'>{templateData.eventDate || 'Saturday, May 24th'}</div> {/* Use eventDate from response */}
                                                        <div className='view_day'>{templateData.weddingTime || '2:00 PM'}</div> {/* Use weddingTime from response */}
                                                        <div className='view_day'>{templateData.weddingLocation || 'Grace Church432 Thurston Ave, Greentown'}</div> {/* Use weddingLocation from response */}
                                                    </div>
                                                </div>
                                                <div className='view_day1'>{templateData.description || 'A reception will follow immediately after the ceremony.'}</div> {/* Use description from response */}
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
    );
}

export default Modify;