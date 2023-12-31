import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts : []};

const postSlice = createSlice({
  name: 'postStore',
  initialState: initialState,
  reducers: {
    setPosts(state,action) {
      state.posts = Array.isArray(action.payload) ? action.payload : [];
    },
    createPost(state,action) {
      state.posts.unshift(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p.id != action.payload);
    },
    updatePost(state, action) {
      let index = state.posts.findIndex(p => p.id === action.payload.id);
      state.posts[index] = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;