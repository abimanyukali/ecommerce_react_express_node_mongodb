import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload; 
    },
    loginFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});
export const { loginSuccess,loginStart,loginFailure } = userSlice.actions;
export default userSlice.reducer;
