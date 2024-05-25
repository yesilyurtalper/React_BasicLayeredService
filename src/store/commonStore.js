import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    user : {}
};

const commonSlice = createSlice({
  name: 'commonStore',
  initialState: initialState,
  reducers: {
    setUser(state,action) {
      state.user = action.payload ?? {};
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;