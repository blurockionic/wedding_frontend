import React from "react";
import { Button } from "../ui/button";
import ServiceList from "../serviceList/ServiceList";
import { ChatMessage } from "./ChatMessage";

const ChatFlexibleMessage = ({ message, onOptionClick, onTalkToAgent }) => {
  if (message.type === "options") {
    return (
      <div className="my-2">
        {message.text && (
          <div className="mb-2 text-sm text-rose-700 font-medium">{message.text}</div>
        )}
        <div className="flex flex-wrap gap-2">
          {message.options.map((btn) => (
            <Button
              key={btn.value}
              variant="outline"
              className="bg-rose-100 border-rose-300 text-rose-700 hover:bg-rose-200"
              onClick={() => onOptionClick(btn)}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }
  if (message.type === "services") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] h-[20%] p-3 rounded-2xl bg-rose-500 text-white rounded-tl-none">
          <div className="mb-2">
            <p className="text-sm font-medium">Here are some services that might help you:</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="w-full overflow-x-auto">
              <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
                <div className="transform scale-50 origin-left h-fit overflow-hidden">
                  <ServiceList services={message.services} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs mt-2 text-rose-100">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    );
  }
  if (message.type === "agent_suggestion") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] p-3 rounded-2xl bg-rose-500 text-white rounded-tl-none flex flex-col items-start">
          <div className="mb-2 text-sm font-medium">Need more help?</div>
          <Button
            variant="outline"
            className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
            onClick={onTalkToAgent}
          >
            Talk to Agent
          </Button>
          <div className="text-xs mt-2 text-rose-100">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    );
  }
  // Default: simple text message
  return <ChatMessage message={message} />;
};

export default ChatFlexibleMessage; 