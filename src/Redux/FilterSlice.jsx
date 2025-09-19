// src/redux/FilterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    allItems: [],       // ✅ original API data
    filteredItems: [],  // ✅ filter ka result
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allItems = action.payload;
      state.filteredItems = action.payload; // default same as all
    },
    setFilteredProducts: (state, action) => {
      state.filteredItems = action.payload;
    },
  },
});

export const { setAllProducts, setFilteredProducts } = filterSlice.actions;
export default filterSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const FilterSlice = createSlice({
//   name: "Filters",
//   initialState: {
//     items: null,          // all products
//     filteredItems: null,  // filter result
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.items = action.payload;
//       state.filteredItems = action.payload; // default same as items
//     },
//     setFilteredProducts: (state, action) => {
//       state.filteredItems = { products: action.payload };
//     },
//   },
// });

// export const { addProduct, setFilteredProducts } = FilterSlice.actions;
// export default FilterSlice.reducer;
