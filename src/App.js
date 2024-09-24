import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './store/chatSlice';
import Chat from './components/Chat';       
import UsernamePrompt from './components/UsernamePrompt';

function App() {
  const user = useSelector((state) => state.chat.user);   
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      dispatch(setUser(savedUser));  
    }
  }, [dispatch]);

  return (
    <div className="App">
      {user ? <Chat /> : <UsernamePrompt />} 
    </div>
  );
}

export default App;
