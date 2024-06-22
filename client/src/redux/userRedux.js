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
    logOutStart: (state) => {
      state.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },
    logOutFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});
export const {
  loginSuccess,
  loginStart,
  loginFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = userSlice.actions;
export default userSlice.reducer;
