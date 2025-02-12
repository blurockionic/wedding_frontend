import React, { useRef, useEffect } from "react";
import { useChat } from 'ai/react';
import Bubble from '../../components/budget/Bubble';
import PromptSuggestionsRow from '../../components/budget/PromptSuggestionsRows';
import LoadingBubble from '../../components/budget/LoadingBubble';
import SubmitButton from '../../components/budget/SubmitButton';
import PropTypes from "prop-types";
import Footer from "../Footer";
import budgetBg from '../../../public/budget/budgetpink.jpg';

const Message = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

const Home = () => {
  const processedResponses = useRef(new Set());
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: 'http://localhost:3001/api/wedding-services',
    onResponse: async (response) => {
      console.log("Response received at:", new Date().toLocaleTimeString());
      try {
        const data = await response.json();
        console.log("API Response Data:", data);

        // Create unique identifier for the response
        const responseId = data.vendors 
          ? data.vendors.map(v => v._id).join('-')
          : '';

        if (processedResponses.current.has(responseId)) {
          console.log("Duplicate response detected, skipping...");
          return;
        }
        processedResponses.current.add(responseId);

        if (data.vendors?.length > 0) {
          append({
            role: "assistant",
            content: (
              <div className="vendor-list">
                <p className="font-bold mb-4">Here are some vendors that match your criteria:</p>
                {data.vendors.map((vendor, index) => (
              <div key={vendor._id} className="mb-4 pb-4 border-b">
                <p><strong>Service Name:</strong> {vendor.service_name}</p>
                <p><strong>Rating:</strong> {vendor.rating}</p>
                <p><strong>Price Range:</strong> ₹{vendor.min_price}</p>
                <p><strong>Service Type:</strong> {vendor.service_type}</p>
              </div>
            ))}
              </div>
            ),
          });
        } else if(data.content){
          append({
            role: "assistant",
            content: data.content
          });
        }
      } catch (error) {
        console.error("Error parsing API response:", error);
        append({ role: "assistant", content: "An error occurred. Please try again." });
      }
    }
  });

  // Scroll handling
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, isLoading]);

  const noMessages = !messages?.length;

  const PromptSubmit = async (promptText) => {
    if (typeof promptText !== 'string') {
      console.error('Invalid prompt type:', promptText);
      return;
    }
    
    await append({
      role: "user",
      content: promptText,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  return (
    <>
      <section
        className="flex-col flex justify-center items-center py-3 bg-cover bg-no-repeat font-montserrat"
        style={{ backgroundImage: `url(${budgetBg})` }}
      >
        <div className="w-[70vw] py-4">
          <h1 className="text-left text-3xl my-4">Plan your budget for your dream wedding with MV AI</h1>
          <p className="text-left">
            Find the perfect service for your wedding needs. Connect with trusted vendors and plan your dream wedding seamlessly according to your budget.
          </p>
        </div>
        <div className="p-5 w-[70vw] h-[80vh] flex items-center flex-col justify-between text-center bg-[#ffdf6d] rounded-2xl">
          <div className="p-5 w-[65vw] h-[70vh] flex items-center flex-col justify-between text-center bg-[#fddbec] rounded-2xl">
            <section className={noMessages ? "" : "h-[calc(80vh-150px)] flex flex-col justify-between w-full overflow-hidden"}>
              {noMessages ? (
                <>
                  <p className="px-[80px]"></p>
                  <br />
                  <PromptSuggestionsRow onPromptClick={PromptSubmit} />
                </>
              ) : (
                <div 
                  ref={chatContainerRef}
                  className="flex flex-col overflow-y-auto h-full mb-2 w-full"
                >
                  {messages.map((message) => (
                    <Bubble key={message.id} message={message} />
                  ))}
                  {isLoading && <LoadingBubble />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </section>

          </div>

          {/* Input Form */}
          <form className="h-14 w-full pt-[20px] overflow-hidden flex justify-evenly mx-2" onSubmit={handleFormSubmit}>
            <input className="w-[80%] p-[10px] text-[15px] border-none rounded-lg"
              type="text"
              onChange={handleInputChange}
              value={input}
              placeholder="Ask me something"
            />
            <SubmitButton />
          </form>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
