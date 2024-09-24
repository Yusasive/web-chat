import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../store/chatSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.chat.user);
  const [inputMessage, setInputMessage] = useState("");
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage = {
        user,
        text: inputMessage,
        timestamp: new Date().toISOString(),
      };
      const storedMessages =
        JSON.parse(localStorage.getItem("chatMessages")) || [];
      const updatedMessages = [...storedMessages, newMessage];

      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      dispatch(addMessage(newMessage));

      setInputMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    dispatch(setMessages(savedMessages));
  }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "chatMessages") {
        const updatedMessages = JSON.parse(e.newValue) || [];
        dispatch(setMessages(updatedMessages));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h2 className="text-xl font-bold">Chat Application</h2>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <ul className="space-y-4">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex ${
                msg.user.id === user.id ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`p-3 rounded-lg shadow-md max-w-xs ${
                  msg.user.id === user.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}>
                <div className="text-sm">
                  <strong>{msg.user.name}</strong> at{" "}
                  {new Date(msg.timestamp).toLocaleTimeString()}:
                </div>
                <div className="text-lg">{msg.text}</div>
              </div>
            </li>
          ))}
        </ul>
        <div ref={messageEndRef}></div>
      </div>

      {/* Chat Input Box */}
      <form
        onSubmit={handleSendMessage}
        className="bg-gray-200 p-4 shadow-inner">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
