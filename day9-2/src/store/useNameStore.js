import { create } from "zustand";

const useNameStore = create((set) => ({

  page1: [],
  page2: [],
  page3: [],

  addPage1Name: (name) =>
    set((state) => ({
      page1: [
        ...state.page1,
        {
          id: Date.now(),
          name,
        },
      ],
    })),

  addPage2Name: (name) =>
    set((state) => ({
      page2: [
        ...state.page2,
        {
          id: Date.now(),
          name,
        },
      ],
    })),

  addPage3Name: (name) =>
    set((state) => ({
      page3: [
        ...state.page3,
        {
          id: Date.now(),
          name,
        },
      ],
    })),
}));

export default useNameStore;