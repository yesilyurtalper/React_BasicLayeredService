import { createSlice } from "@reduxjs/toolkit";

export const generateQueryKey = (query) => {
  let key = "";
  for (const prop in query) {
    if(query[prop]){
      let name = prop === "page" ? "pageNumber" : prop;
      let value = prop === "page" ? query[prop]+1 : query[prop];
      key = `${key}${name}=${value}&`;
    }
  }
  key = `?${key}`;
  return key;
}

const initQuery = {
  id:"",
  author:"",
  title:"",
  body:"",
  dateCreatedStart:null,
  dateCreatedEnd:null,
  dateModifiedStart:null,
  dateModifiedEnd:null,
  page:0,
  pageSize:5,
  sortByDateCreated: 1,
  sortByDateModified: 0,
  sortByAuthor: 0,
  sortByTitle: 0,
  sortByBody: 0,
};

const initialState = { 
  query : initQuery,
  queryKey: generateQueryKey(initQuery),
  sortModel: {}
};

const postSlice = createSlice({
  name: "postStore",
  initialState: initialState,
  reducers: {

    setQuery(state, action) {
      let query = {...state.query, ...action.payload};
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

export const postActions = postSlice.actions;

export default postSlice.reducer;
