import { createSlice } from "@reduxjs/toolkit";
import getCurrentDate, { getCurrentYear } from "../utility/dateConversion";
import { generateQueryKey } from "./postStore";

const initQuery = {
  id: "",
  author: "",
  title: "",
  body: "",
  dateStart: getCurrentYear(),
  dateEnd: getCurrentDate(),
  dateCreatedStart: null,
  dateCreatedEnd: null,
  dateModifiedStart: null,
  dateModifiedEnd: null,
  priceStart: "",
  priceEnd: "",
  page: 0,
  pageSize: 5,
  sortByPrice: 0,
  sortByDate: 1,
  sortByDateCreated: 0,
  sortByDateModified: 0,
  sortByAuthor: 0,
  sortByTitle: 0,
  sortByBody: 0,
};

const initialState = {
  query: initQuery,
  queryKey: generateQueryKey(initQuery),
  sortModel: {}
};

const eventSlice = createSlice({
  name: "eventStore",
  initialState: initialState,
  reducers: {
    setQuery(state, action) {
      let query = { ...state.query, ...action.payload };
      state.query = query;
      state.queryKey = generateQueryKey(query);
    },

    setSortModel(state, action) {
      let sortModel = action.payload;
      state.sortModel = {
        sortField: sortModel.sortField,
        sortOrder: sortModel.sortOrder,
      };
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
