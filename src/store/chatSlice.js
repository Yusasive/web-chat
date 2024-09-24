import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],     
  user: null,       
  pageSize: 25,     
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages)); 
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    loadMoreMessages: (state) => {
      state.pageSize += 25;
    },
  },
});

export const { setUser, addMessage, setMessages, loadMoreMessages } = chatSlice.actions;

export default chatSlice.reducer;
