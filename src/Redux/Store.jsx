import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import FilterReducer from "./FilterSlice"; // adjust path


const store = configureStore({
  reducer: {
    // cart: cartReducer,
    products: productReducer,
        Filters: FilterReducer, // ✅ key must match your useSelector
  },
});

export default store;