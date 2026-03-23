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

      const existing = state.cart.find(
        (i) =>
          i.product_id === item.product_id &&
          i.variant_id === item.variant_id &&
          JSON.stringify(i.variant_attribute_id) ===
            JSON.stringify(item.variant_attribute_id),
      );

      if (existing) {
        existing.quantity += item.quantity; // ✅ use selected quantity
      } else {
        state.cart.push({
          ...item,
          quantity: item.quantity, // ✅ use selected quantity
        });
      }
    },

    decreaseQty: (state, action) => {
      const product_id = action.payload;
      const item = state.cart.find((i) => i.product_id === product_id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      console.log("action", action.payload);
      console.log("state first cart item", state.cart?.[0]);

      state.cart = state.cart.filter((item) => {
        const sameProduct = item.product_id === action.payload.product_id;

        // Compare variant_attribute_id arrays deeply and safely
        const sameVariant =
          Array.isArray(item.variant_attribute_id) &&
          Array.isArray(action.payload.variant_attribute_id) &&
          item.variant_attribute_id.length ===
            action.payload.variant_attribute_id.length &&
          item.variant_attribute_id.every(
            (val, idx) => val === action.payload.variant_attribute_id[idx],
          );

        // Keep item only if it does NOT match both product and variant
        return !(sameProduct && sameVariant);
      });

      console.log("Updated cart:", state.cart);
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
