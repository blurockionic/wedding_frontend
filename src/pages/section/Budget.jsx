import React, { useRef, useEffect } from "react";
import { useChat } from 'ai/react'
import Bubble from '../../components/budget/Bubble'
import PromptSuggestionsRow from '../../components/budget/PromptSuggestionsRows'
import LoadingBubble from '../../components/budget/LoadingBubble'
import SubmitButton from '../../components/budget/SubmitButton'
import PropTypes from "prop-types";

const Message = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  };

const Home = () => {
    const { append, messages, input, handleInputChange, isLoading, setInput } =
      useChat();
    const noMessages = !messages || messages.length === 0;
    const messagesEndRef = useRef(null);
  
    // Auto-scroll to the last message when messages update
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const PromptSubmit = async (promptText) => {
      const msg = {
        id: crypto.randomUUID(),
        content: promptText,
        role: "user",
      };
      append(msg);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, msg] }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        const cleanResponse = data.replace(/<think>.*?<\/think>/gs, "").trim();
        const aiMessage = {
          id: crypto.randomUUID(),
          content: cleanResponse || "Sorry, I couldn't get the information.",
          role: "assistant",
        };
        append(aiMessage);
      } catch (error) {
        console.error("Error:", error);
        const aiMessage = {
          id: crypto.randomUUID(),
          content: "Sorry, something went wrong. Please try again later.",
          role: "assistant",
        };
        append(aiMessage);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      const msg = {
        id: crypto.randomUUID(),
        content: input,
        role: "user",
      };
      append(msg);
      setInput(""); // Clear input field after submission
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, msg] }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        const cleanResponse = data.replace(/<think>.*?<\/think>/gs, "").trim();
        const aiMessage = {
          id: crypto.randomUUID(),
          content: cleanResponse || "Sorry, I couldn't get the information.",
          role: "assistant",
        };
        append(aiMessage);
      } catch (error) {
        console.error("Error:", error);
        const aiMessage = {
          id: crypto.randomUUID(),
          content: "Sorry, something went wrong. Please try again later.",
          role: "assistant",
        };
        append(aiMessage);
      }
    };
  
    return (
        <>
        
        <section className="flex-col flex justify-center items-center">
            <div className="w-[70vw] my-8">
                <h1 className="text-left text-3xl my-4">Plan your budget for your dream wedding with MV AI</h1>
                <p className="text-left">Find the perfect service for your wedding needs. Connect with trusted vendors and plan your dream wedding seamlessly according to your budgets and need.</p>
            </div>
            <div className="p-5 w-[70vw] h-[80vh] flex items-center flex-col justify-between text-center bg-[#FBCB17] rounded-2xl">
                <div className="p-5 w-[65vw] h-[70vh] flex items-center flex-col justify-between text-center bg-[#F8BFDA] rounded-2xl">
                    <section className={noMessages ? "" : "h-[calc(80vh-150px)] flex flex-col justify-between w-full overflow-hidden"}>
                    {noMessages ? (
                        <>
                        <p className="px-[80px]"></p>
                        <br />
                        <PromptSuggestionsRow onPromptClick={PromptSubmit} />
                        </>
                    ) : (
                        <div className="flex flex-col overflow-y-auto h-full mb-2">
                        {messages.map((message, index) => (
                            <Bubble key={`message-${index}`} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                        <div ref={messagesEndRef} />
                        </div>
                    )}
                    
                    </section>
                    
                </div>
                <form
                className="h-14 w-full pt-[20px] overflow-hidden flex justify-evenly mx-2"
                onSubmit={handleSubmit}
                >
                    <input
                    className="w-[80%] p-[10px] text-[15px] border-none focus:outline-none rounded-lg"
                    type="text"
                    onChange={handleInputChange}
                    value={input}
                    placeholder="Ask me something"
                    />
                    <SubmitButton />
                </form>
            </div>
        </section>
        </>
    );
  };
  
  export default Home;