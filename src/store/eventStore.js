import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  events: [],
  totalCount: 100,
  page : 0,
  pageSize : 100,
  lastId : 0
};

const eventSlice = createSlice({
  name: "eventState",
  initialState: initialState,
  reducers: {
    setQueryResult(state, action) {
      let items = Array.isArray(action.payload.items) ? action.payload.items : [];
      state.events = items;
      state.totalCount = action.payload.count;
      state.lastId = items.length > 0 ? items[items.length-1].id : 0;
    },

    createEvent(state, action) {
      state.events.unshift(action.payload);
      state.totalCount++;
    },
    deleteEvent(state, action) {
      state.events = state.events.filter((ev) => ev.id != action.payload);
      state.totalCount--;
    },
    updateEvent(state, action) {
      let index = state.events.findIndex((ev) => ev.id === action.payload.id);
      state.events[index] = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
