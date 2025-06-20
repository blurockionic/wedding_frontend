import React, { useState, useRef, useEffect } from "react";

const WEBSOCKET_URL =
  window.location.hostname === "localhost"
    ? "ws://localhost:8080"
    : "wss://marriage-vendors-nka3z.ondigitalocean.app/ws";

function shortenId(id) {
  if (!id) return "";
  if (id.length <= 12) return id;
  return id.slice(0, 6) + "..." + id.slice(-4);
}

export default function AgentDashboard() {
  // Separate input for login and actual agentId used for connection
  const [loginInput, setLoginInput] = useState("");
  const [agentId, setAgentId] = useState(() => localStorage.getItem("agentId") || "");
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [contacts, setContacts] = useState([]); // [{userId, lastMessage}]
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({}); // { userId: [ {sender, text, timestamp} ] }
  const [input, setInput] = useState("");
  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);

  // --- WebSocket connect/disconnect/reconnect logic ---
  const connect = () => {
    if (!agentId) return;
    if (wsRef.current) wsRef.current.close();
    const ws = new WebSocket(WEBSOCKET_URL + "/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setReconnecting(false);
      ws.send(JSON.stringify({ type: "login", userId: agentId, role: "agent" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "private_message") {
        const { senderId, message } = data;
        setMessages((prev) => ({
          ...prev,
          [senderId]: [...(prev[senderId] || []), { sender: "user", text: message, timestamp: new Date() }],
        }));
        setContacts((prev) => {
          const filtered = prev.filter((c) => c.userId !== senderId);
          return [{ userId: senderId, lastMessage: message }, ...filtered];
        });
      }
    };

    ws.onclose = () => {
      setConnected(false);
      if (agentId) {
        setReconnecting(true);
        reconnectTimeout.current = setTimeout(connect, 3000);
      }
    };
    ws.onerror = () => {
      setConnected(false);
      if (agentId) {
        setReconnecting(true);
        reconnectTimeout.current = setTimeout(connect, 3000);
      }
    };
  };

  // On mount, auto-connect if agentId is present
  useEffect(() => {
    if (agentId && !connected) {
      connect();
    }
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
    // eslint-disable-next-line
  }, [agentId]);

  // Logout logic
  const logout = () => {
    setAgentId("");
    setLoginInput("");
    localStorage.removeItem("agentId");
    setConnected(false);
    setReconnecting(false);
    setContacts([]);
    setSelectedUser(null);
    setMessages({});
    setInput("");
    if (wsRef.current) wsRef.current.close();
  };

  // Login logic
  const handleLogin = () => {
    if (!loginInput.trim()) return;
    localStorage.setItem("agentId", loginInput.trim());
    setAgentId(loginInput.trim());
  };

  // Send message to selected user
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser || !wsRef.current || wsRef.current.readyState !== 1) return;
    wsRef.current.send(
      JSON.stringify({
        type: "private_message",
        senderId: agentId,
        recipientId: selectedUser,
        message: input,
      })
    );
    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), { sender: "agent", text: input, timestamp: new Date() }],
    }));
    setContacts((prev) => {
      const filtered = prev.filter((c) => c.userId !== selectedUser);
      return [{ userId: selectedUser, lastMessage: input }, ...filtered];
    });
    setInput("");
  };

  // Select a contact to chat with
  const selectContact = (userId) => setSelectedUser(userId);

  // Show messages for selected user
  const chatMessages = messages[selectedUser] || [];

  // UI connection status
  let statusText = "Disconnected";
  let statusColor = "text-red-500";
  if (connected) {
    statusText = "Connected";
    statusColor = "text-green-500";
  } else if (reconnecting) {
    statusText = "Reconnecting...";
    statusColor = "text-yellow-500";
  }

  return (
    <div className="flex h-screen font-montserrat bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-primary to-rose-200 border-r border-rose-100 p-0 flex flex-col shadow-xl rounded-r-3xl">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-primary to-rose-500 text-white rounded-tr-3xl rounded-br-3xl shadow flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg tracking-wide">Agent Panel</span>
            {agentId && (
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/40 rounded text-xs font-semibold transition"
                title="Logout"
              >
                Logout
              </button>
            )}
          </div>
          {agentId && (
            <div className="text-xs mt-1 opacity-80">ID: <span className="font-mono">{shortenId(agentId)}</span></div>
          )}
          <div className={`text-xs mt-1 font-semibold ${statusColor}`}>{statusText}</div>
        </div>
        {/* Login or Contacts */}
        {!agentId ? (
          <div className="flex flex-col gap-2 p-6 mt-10">
            <input
              type="text"
              placeholder="Enter agent ID"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full p-2 border border-rose-200 rounded focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-primary to-rose-500 text-white py-2 rounded font-semibold shadow hover:from-rose-500 hover:to-primary transition"
            >
              Connect
            </button>
          </div>
        ) : (
          <>
            <div className="font-bold text-rose-700 mt-6 mb-2 px-6">Contacts</div>
            <div className="flex-1 overflow-y-auto px-2 pb-4">
              {contacts.length === 0 && <div className="text-gray-400 px-4 py-8 text-center">No users yet</div>}
              {contacts.map((c) => (
                <div
                  key={c.userId}
                  className={`p-3 rounded-xl cursor-pointer mb-2 transition-all border border-transparent ${
                    selectedUser === c.userId
                      ? "bg-gradient-to-r from-pink-100 to-rose-100 border-rose-300 shadow"
                      : "hover:bg-rose-50 hover:border-rose-200"
                  }`}
                  onClick={() => selectContact(c.userId)}
                >
                  <div className="font-semibold text-primary">{shortenId(c.userId)}</div>
                  <div className="text-xs text-gray-600 truncate mt-1">{c.lastMessage}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-white/80 rounded-l-3xl shadow-xl overflow-hidden">
        {/* Chat header */}
        <div className="h-16 flex items-center px-8 border-b border-rose-100 bg-gradient-to-r from-pink-50 to-rose-100">
          {selectedUser ? (
            <>
              <span className="font-semibold text-lg text-rose-700">Chat with <span className="font-mono">{shortenId(selectedUser)}</span></span>
            </>
          ) : (
            <span className="text-gray-400">Select a user to start chatting</span>
          )}
        </div>
        {/* Messages */}
        <ul className="flex-1 list-none p-8 overflow-y-auto flex flex-col gap-2">
          {chatMessages.map((msg, i) => (
            <li
              key={i}
              className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-base font-medium ${
                msg.sender === "agent"
                  ? "bg-gradient-to-r from-primary to-rose-400 text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              <div>{msg.text}</div>
              <div className="text-[10px] text-right mt-1 opacity-70">
                {msg.sender} • {msg.timestamp.toLocaleTimeString()}
              </div>
            </li>
          ))}
        </ul>
        {/* Input */}
        {agentId && connected && selectedUser && (
          <form className="flex p-6 border-t bg-white/90" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border border-rose-200 rounded-xl mr-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-rose-500 text-white px-8 py-2 rounded-xl font-semibold shadow hover:from-rose-500 hover:to-primary transition"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 