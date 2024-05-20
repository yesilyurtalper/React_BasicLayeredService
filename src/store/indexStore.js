import { configureStore } from '@reduxjs/toolkit';

import postReducer from './postStore';
import eventReducer from './eventStore';
import commonReducer from './commonStore';


const store = configureStore({
  reducer: { 
    postStore: postReducer, 
    eventStore: eventReducer,
    commonStore: commonReducer
  },
});

export default store;
