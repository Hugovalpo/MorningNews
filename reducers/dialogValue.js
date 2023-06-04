import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const dialogValueSlice = createSlice({
  name: "dialogValue",
  initialState,
  reducers: {
    dialogShow: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    // dialogOff: (state, action) => {
    //   state.value = false;
    // },
  },
});

export const { dialogShow } = dialogValueSlice.actions;
export default dialogValueSlice.reducer;
