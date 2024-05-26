import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    user : {},
    refresh: false,
};

const commonSlice = createSlice({
  name: 'commonStore',
  initialState: initialState,
  reducers: {
    setUser(state,action) {
      state.user = action.payload ?? {};
    },

    setRefresh(state) {
      state.refresh = !state.refresh
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;