// src/redux/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filtered: [],
    loading: false,
    error: null,
  },
  reducers: {
    // agar manually product add karna ho
    addProduct: (state, action) => {
      state.items = action.payload;
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload;
    },
  },
 
});

export const { addProduct, setFiltered  } = productSlice.actions;
export default productSlice.reducer;
