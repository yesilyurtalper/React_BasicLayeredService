import { configureStore } from '@reduxjs/toolkit';

import postReducer from './postStore';
import eventReducer from './eventStore';


const store = configureStore({
  reducer: { postStore: postReducer, eventStore: eventReducer },
});

export default store;
