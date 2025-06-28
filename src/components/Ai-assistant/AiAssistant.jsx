import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, X, Send, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";

import { ChatMessage } from "./ChatMessage";

const suggestions = [
  "How can find vendors?",
  "I want to speak with agent",
  "Tell me about pricing",
  "Help with payment issue",
];

import ServiceList from "../serviceList/ServiceList";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [agentName, setAgentName] = useState(null);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const userIdRef = useRef("");
  const lastSupportMessageRef = useRef("");
  const inputRef = useRef(null);
  const [databaseJsonRes, setDatabaseJsonRes] = useState([]);

  const formatAgentName = (name) =>
    name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Initialization function to replace useEffect
  const initializeChatUser = () => {
    const storedId = localStorage.getItem("chatUserId");
    if (storedId) {
      userIdRef.current = storedId;
    } else {
      const newId = "user_" + crypto.randomUUID();
      localStorage.setItem("chatUserId", newId);
      userIdRef.current = newId;
    }

    const storedAgentName = localStorage.getItem("chatAgentName");
    if (storedAgentName) {
      setAgentName(storedAgentName);
    }
  };

  // Call the initialization function once when the component mounts
  useState(() => {
    initializeChatUser();
    return undefined;
  });

  useEffect(() => {
    if (agentName) {
      localStorage.setItem("chatAgentName", agentName);
    } else {
      localStorage.removeItem("chatAgentName");
    }
  }, [agentName]);

  const generateMessageId = useCallback(() => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Enhanced scroll to bottom function
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  }, []);

  useEffect(() => {
    if (isOpen && !wsRef.current) {
      const wsUrl = "ws://localhost:4000";
      // window.location.hostname === "localhost"
      //   ?
      //   : "wss://marriage-vendors-nka3z.ondigitalocean.app/ws";

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        ws.send(
          JSON.stringify({
            type: "login",
            userId: userIdRef.current,
            role: "user",
          })
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "welcome":
            break;

          case "private_message":
            if (data.message) {
              console.log(data);

              if (data.senderRole === "Database") {
                try {
                  const jsonStartIndex = data.message.indexOf("[");
                  const rawJson = data.message.slice(jsonStartIndex);
                  const parsedData = JSON.parse(rawJson);

                  setDatabaseJsonRes(parsedData);
                  
                  // Add services as a special message type
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: generateMessageId(),
                      type: "services",
                      services: parsedData,
                      sender: "assistant",
                      timestamp: new Date(),
                    },
                  ]);
                } catch (err) {
                  console.error(
                    "Failed to parse service data from message:",
                    err
                  );
                  // If parsing fails, treat it as a regular message
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: generateMessageId(),
                      text: data.message,
                      sender: "assistant",
                      timestamp: new Date(),
                    },
                  ]);
                }

                return;
              }

              // Handle agent intro message only if it's new
              if (
                data.senderRole === "agent" &&
                data.senderName &&
                data.senderName !== agentName
              ) {
                setAgentName(data.senderName);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: generateMessageId(),
                    text: `Hi, this is ${formatAgentName(
                      data.senderName
                    )}. How can I assist you today?`,
                    sender: "assistant",
                    timestamp: new Date(),
                  },
                ]);
              }

              // Append regular message to chat
              setMessages((prev) => [
                ...prev,
                {
                  id: generateMessageId(),
                  text: data.message,
                  sender: "assistant",
                  timestamp: new Date(),
                },
              ]);
            }
            break;

          case "support_status":
            if (!data.agentAvailable) {
              setAgentName(null);
              localStorage.removeItem("chatAgentName");
            }

            if (
              data.message &&
              data.message !== lastSupportMessageRef.current
            ) {
              lastSupportMessageRef.current = data.message;
              setMessages((prev) => [
                ...prev,
                {
                  id: generateMessageId(),
                  text: data.message,
                  sender: "assistant",
                  timestamp: new Date(),
                },
              ]);
            }
            break;

          case "error":
            console.error("Server error:", data.message);
            break;
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        wsRef.current = null;
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isOpen, generateMessageId]);

  const handleToggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (
      !inputMessage.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;

    const message = inputMessage.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: generateMessageId(),
        text: message,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    // Clear services data when user sends a new message
    setDatabaseJsonRes([]);

    wsRef.current.send(
      JSON.stringify({
        type: "private_message",
        senderId: userIdRef.current,
        recipientId: agentName ? "agent" : "bot",
        message,
      })
    );

    setInputMessage("");
  }, [inputMessage, agentName, generateMessageId]);

  const handleDisconnectAgent = useCallback(() => {
    setAgentName(null);
    localStorage.removeItem("chatAgentName");
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "private_message",
          senderId: userIdRef.current,
          recipientId: agentName ? "agent" : "bot",
          message: "stop",
        })
      );
    }
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // Enhanced auto-scroll effect
  useEffect(() => {
    // Use immediate scroll for user messages, smooth for assistant messages
    const isUserMessage = messages.length > 0 && messages[messages.length - 1]?.sender === "user";
    scrollToBottom(isUserMessage ? "auto" : "smooth");
  }, [messages, scrollToBottom]);

  const filteredSuggestions =
    inputMessage.trim().length > 0
      ? suggestions
          .filter((s) => s.toLowerCase().includes(inputMessage.toLowerCase()))
          .slice(0, 2)
      : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("chatMessages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const lastActive = parsed.lastActive;
        const now = Date.now();
        // 1 hour = 3600000 ms
        if (!lastActive || now - lastActive > 3600000) {
          // Inactive for over 1 hour, clear messages and show greeting
          setMessages([
            {
              id: generateMessageId(),
              text: "Namaste! How can I help you?",
              sender: "assistant",
              timestamp: new Date(),
            },
          ]);
          localStorage.removeItem("chatMessages");
        } else {
          // Convert timestamp strings back to Date objects
          setMessages(
            parsed.messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        }
      } catch {
        // If error, show greeting
        setMessages([
          {
            id: generateMessageId(),
            text: "Namaste! How can I help you?",
            sender: "assistant",
            timestamp: new Date(),
          },
        ]);
        localStorage.removeItem("chatMessages");
      }
    } else {
      // Only add greeting if no previous messages
      setMessages([
        {
          id: generateMessageId(),
          text: "Namaste! How can I help you?",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Save last 20 messages and last activity timestamp to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const last20 = messages.slice(-20);
      localStorage.setItem(
        "chatMessages",
        JSON.stringify({
          messages: last20,
          lastActive: Date.now(),
        })
      );
    } else {
      localStorage.removeItem("chatMessages");
    }
  }, [messages]);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={handleToggleChat}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
            isOpen ? "bg-rose-600" : "bg-rose-500"
          } hover:scale-105 transition-all hover:bg-rose-600`}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageSquare className="h-6 w-6 text-white" />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 sm:right-0 md:right-6 z-50 p-2 sm:p-0 w-full max-w-[400px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <Card className="border border-rose-200/20 overflow-hidden shadow-2xl bg-white/95 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-rose-600 border-b border-rose-200/20 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg text-white">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isConnected
                          ? "bg-green-400 animate-pulse"
                          : "bg-red-400"
                      } mr-2`}
                    ></div>
                    {isConnected
                      ? agentName
                        ? `Chat with ${formatAgentName(agentName)}`
                        : "Chat with AI Assistant"
                      : "Disconnected"}
                  </CardTitle>
                  {isConnected && agentName && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-rose-200 hover:bg-rose-600/50"
                      onClick={handleDisconnectAgent}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Disconnect
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="h-[300px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.type === "services" ? (
                        // Render services as a special message
                        <div className="flex justify-start">
                          <div className="max-w-[90%] p-3 rounded-2xl bg-rose-500 text-white rounded-tl-none">
                            <div className="mb-2">
                              <p className="text-sm font-medium">Here are some services that might help you:</p>
                            </div>
                            <div className="bg-white/10   rounded-lg p-2">
                              <div className="w-full overflow-x-auto">
                                <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
                                  <div className="transform  scale-100 origin-left h-fit overflow-hidden">
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
                      ) : (
                        <ChatMessage message={message} />
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out px-2 overflow-hidden ${
                    filteredSuggestions.length > 0
                      ? "h-auto opacity-100 mt-2"
                      : "h-0 opacity-0"
                  }`}
                >
                  <div className="flex gap-1">
                    {filteredSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-rose-200 border-rose-200 text-rose-700 hover:bg-rose-200"
                        onClick={() => {
                          setInputMessage(suggestion);
                          if (wsRef.current?.readyState === WebSocket.OPEN) {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: generateMessageId(),
                                text: suggestion,
                                sender: "user",
                                timestamp: new Date(),
                              },
                            ]);

                            // Clear services data when user selects a suggestion
                            setDatabaseJsonRes([]);

                            wsRef.current.send(
                              JSON.stringify({
                                type: "private_message",
                                senderId: userIdRef.current,
                                recipientId: agentName ? "agent" : "bot",
                                message: suggestion,
                              })
                            );

                            setInputMessage("");
                          }
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-rose-200/20 p-3">
                <form
                  className="flex w-full items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isConnected ? "Type your message..." : "Disconnected"
                    }
                    className="flex-grow bg-rose-50 border-rose-200 focus-visible:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                    disabled={!isConnected}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className={`bg-rose-500 text-white hover:bg-rose-600 ${
                      !isConnected ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isConnected}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>

            <div className="flex justify-center mt-2">
              <button
                onClick={handleToggleChat}
                className="inline-flex items-center hover:text-rose-500 transition-colors"
              >
                <ChevronUp className="h-3 w-3 mr-1" /> Minimize chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
