export const ChatMessage = ({ message }) => {


  

 

  const isUser = message?.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser
            ? "bg-rose-50 text-gray-800 rounded-tr-none"
            : "bg-rose-500 text-white rounded-tl-none"
        }`}
      >
        {message?.text}
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-gray-500" : "text-rose-100"
          }`}
        >
          {message.timestamp ? formatTime(message.timestamp) : ""}
        </div>
      </div>
    </div>
  );
};

const formatTime = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};