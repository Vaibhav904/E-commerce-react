import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cart.find((i) => i.product_id === item.product_id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },

    setCartFromApi: (state, action) => {
      state.cart = action.payload;
    },

    decreaseQty: (state, action) => {
      const product_id = action.payload;
      const item = state.cart.find((i) => i.product_id === product_id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.product_id !== action.payload);
    },

    // 🔥 THIS IS REQUIRED
    setCartFromApi: (state, action) => {
      state.cart = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  decreaseQty,
  removeFromCart,
  setCartFromApi, // 🔥 EXPORT ADDED
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
