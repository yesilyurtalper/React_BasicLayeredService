import { configureStore } from '@reduxjs/toolkit';

import postReducer from './post';
import eventReducer from './event';


const store = configureStore({
  reducer: { postStore: postReducer, eventStore: eventReducer },
});

export default store;
