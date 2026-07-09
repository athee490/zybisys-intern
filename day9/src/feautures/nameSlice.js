import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page1: [],
  page2: [],
  page3: [],
};

const nameSlice = createSlice({
  name: "names",

  initialState,

  reducers: {
    addPage1Name: (state, action) => {
      state.page1.push({
        id: Date.now(),
        name: action.payload,
      });
    },

    addPage2Name: (state, action) => {
      state.page2.push({
        id: Date.now(),
        name: action.payload,
      });
    },

    addPage3Name: (state, action) => {
      state.page3.push({
        id: Date.now(),
        name: action.payload,
      });
    },
  },
});

export const {
  addPage1Name,
  addPage2Name,
  addPage3Name,
} = nameSlice.actions;

export default nameSlice.reducer;