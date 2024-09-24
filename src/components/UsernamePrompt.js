import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/chatSlice";

const UsernamePrompt = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [isPromptVisible, setIsPromptVisible] = useState(true);
  useEffect(() => {
    localStorage.removeItem("chatUser");
    setIsPromptVisible(true);
  }, []);
  const generateUserId = () =>
    `user-${Math.random().toString(36).substr(2, 9)}`;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      return;
    }
    const userId = generateUserId();
    const userData = { id: userId, name: username };

    localStorage.setItem("chatUser", JSON.stringify(userData));
    dispatch(setUser(userData));
    setIsPromptVisible(false);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isPromptVisible && (
        <form onSubmit={handleSubmit} className="p-4 ">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-blue-600 p-2 mb-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded items-center">
            Join Chat
          </button>
        </form>
      )}
    </div>
  );
};

export default UsernamePrompt;
