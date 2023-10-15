import { createSlice } from "@reduxjs/toolkit";
import getCurrentDate, { getCurrentYear } from "../utility/dateConversion";

const initialState = { 
  events: [],
  totalCount: 0,
  paginationModel: {
    page:0,
    pageSize: 10
  },
  queryInput :{
    Id:"",
    Author:"",
    Title:"",
    Body:"",
    DateStart:getCurrentYear(),
    DateEnd:getCurrentDate(),
    PriceStart:"",
    PriceEnd:""
  }
};

const eventSlice = createSlice({
  name: "eventStore",
  initialState: initialState,
  reducers: {
    setEvents(state, action) {
      console.log(action.payload);
      let items = Array.isArray(action.payload.items) ? action.payload.items : [];
      state.events = items;
      state.totalCount = action.payload.count;
    },

    createEvent(state, action) {
      state.events.unshift(action.payload);
      state.totalCount++;
      state.paginationModel.pageSize++;
    },

    deleteEvent(state, action) {
      state.events = state.events.filter((ev) => ev.id != action.payload);
      state.totalCount--;
      state.paginationModel.pageSize--;
    },

    updateEvent(state, action) {
      let index = state.events.findIndex((ev) => ev.id === action.payload.id);
      state.events[index] = action.payload;
    },

    setQueryInput(state, action) {
      state.queryInput = action.payload;
    },

    setPaginationModel(state, action){
      state.paginationModel = action.payload;
    }
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
