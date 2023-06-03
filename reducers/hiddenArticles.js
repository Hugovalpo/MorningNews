import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const hiddenArticlesSlice = createSlice({
  name: "hiddenArticles",
  initialState,
  reducers: {
    hideArticle: (state, action) => {
      state.value.push(action.payload);
    },
    unHideArticle: (state, action) => {
      state.value = state.value.filter(
        (hidden) => hidden.title !== action.payload.title
      );
      console.log(action.payload);
    },
    showArticles: (state) => {
      state.value = [];
      console.log("unhidden all articles");
    },
  },
});

export const { hideArticle, unHideArticle, showArticles } =
  hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;
