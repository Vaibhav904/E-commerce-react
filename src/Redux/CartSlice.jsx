import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      } else { 
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(p => p.id !== action.payload);
    },
    decreaseQty: (state, action) => {
      const item = state.cart.find(p => p.id === action.payload);P
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(p => p.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;