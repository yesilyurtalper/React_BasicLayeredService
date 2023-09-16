import { createSlice } from '@reduxjs/toolkit';

const initialState = { events : []};

const eventSlice = createSlice({
  name: 'eventState',
  initialState: initialState,
  reducers: {
    setEvents(state,action) {
      state.events = action.payload;
    },
    createEvent(state,action) {
      state.events.unshift(action.payload);
    },
    deleteEvent(state, action) {
      state.events = state.events.filter(p => p.id != action.payload);
    },
    updateEvent(state, action) {
      let index = state.events.findIndex(p => p.id === action.payload.id);
      state.events[index] = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;