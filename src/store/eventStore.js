import { createSlice } from "@reduxjs/toolkit";
import getCurrentDate, { getCurrentYear } from "../utility/dateConversion";

const initialState = { 
  query :{
    id:"",
    author:"",
    title:"",
    body:"",
    dateStart:getCurrentYear(),
    dateEnd:getCurrentDate(),
    priceStart:"",
    priceEnd:"",
    page:0,
    pageSize:5
  }
};

const eventSlice = createSlice({
  name: "eventStore",
  initialState: initialState,
  reducers: {

    setQuery(state, action) {
      state.query = {...state.query, ...action.payload};
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
