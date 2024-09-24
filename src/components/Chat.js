import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../store/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);   
  const user = useSelector((state) => state.chat.user);           
  const [inputMessage, setInputMessage] = useState('');           
  const messageEndRef = useRef(null);                             

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        user,
        text: inputMessage,
        timestamp: new Date().toISOString(),
      };
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

      const updatedMessages = [...storedMessages, newMessage];

      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

      dispatch(addMessage(newMessage));

      setInputMessage('');
      scrollToBottom();
    }
  };

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    dispatch(setMessages(savedMessages)); 
  }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'chatMessages') {
        const updatedMessages = JSON.parse(e.newValue) || [];
        dispatch(setMessages(updatedMessages));  
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="mb-2">
              <div className="text-sm text-gray-600">
                <strong>{msg.user.name}</strong> at {new Date(msg.timestamp).toLocaleTimeString()}:
              </div>
              <div className="text-lg">{msg.text}</div>
            </li>
          ))}
        </ul>
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4 bg-gray-200">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          required
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
