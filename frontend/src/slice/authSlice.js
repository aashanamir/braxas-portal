import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAdmin: false,
    status: 'idle',
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setStatus(state , action){
      state.status = action.payload;
    }
  }
});

export const { setUser, setToken, setIsAdmin  , setStatus} = authSlice.actions;


export default authSlice.reducer;