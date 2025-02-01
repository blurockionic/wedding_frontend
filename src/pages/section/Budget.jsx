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
      <div className="p-5 w-[60vw] h-[80vh] flex items-center flex-col justify-between text-center bg-gray-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
        <section className={noMessages ? "" : "h-[calc(80vh-150px)] flex flex-col justify-between w-full overflow-hidden"}>
          {noMessages ? (
            <>
              <p className="px-[80px]">The ultimate place to ask F1 questions</p>
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
          <form
            className="h-14 w-[55vw] border-t-2 border-blue-400 pt-[20px] overflow-hidden flex justify-between"
            onSubmit={handleSubmit}
          >
            <input
              className="w-[85%] p-[10px] text-[15px] border-none focus:outline-none rounded-lg"
              type="text"
              onChange={handleInputChange}
              value={input}
              placeholder="Ask me something"
            />
            <SubmitButton />
          </form>
        </section>
      </div>
    );
  };
  
  export default Home;