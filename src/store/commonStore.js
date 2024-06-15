import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    user : null,
    refresh: false,
    //Login sonrası apiye yapılan istekle set ediliyor
    authProfile :{},
    superAdmin: false,
    readingAdmin: false,
    role: ""
};

const commonSlice = createSlice({
  name: 'commonStore',
  initialState: initialState,
  reducers: {
    setUser(state,action) {
      let user = action.payload;
      state.user = user ?? {};
      let role = user?.profile?.realm_role;
      state.role = role;
      state.superAdmin = role?.some(role => role === "superAdmin");
      state.readingAdmin = role?.some(role => role === "readingAdmin");
    },

    setAuthProfile(state, action){
      state.authProfile = action.payload;
      // state.role = 
      // state.superAdmin = 
      // state.yetkiliMi = 
    },

    toggleRefresh(state) {
      state.refresh = !state.refresh
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;