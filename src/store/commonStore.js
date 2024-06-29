import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    oidcProfile : null,
    refresh: false,
    swrMutate: false,
    //Login sonrası apiye yapılan istekle set ediliyor
    authProfile :{},
    superAdmin: false,
    readingAdmin: false,
    role: "",
    access_token: "",
};

const commonSlice = createSlice({
  name: 'commonStore',
  initialState: initialState,
  reducers: {
    setOidcProfile(state,action) {
      let oidc = action.payload;
      state.oidcProfile = oidc ?? {};
      let role = oidc?.realm_role;
      state.role = role;
      state.superAdmin = role?.some(role => role === "superAdmin");
      state.readingAdmin = role?.some(role => role === "readingAdmin");
    },

    setAccessToken(state,action) {
      state.access_token = action.payload ?? "";
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

    swrMutate(state, action) {
      state.swrMutate = !state.swrMutate;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;