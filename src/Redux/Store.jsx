import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import buyNowReducer from "./buyNowSlice";
import productReducer from "./ProductSlice"; // ✅ PRODUCT SLICE ADD
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* ================= ROOT REDUCER ================= */
const rootReducer = combineReducers({
  cart: cartReducer,
  buyNow: buyNowReducer,
  products: productReducer, // ✅ REQUIRED for filter
});

/* ================= PERSIST CONFIG ================= */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "buyNow"], 
  // ❌ products ko persist nahi karna (filter temporary hota hai)
};

/* ================= PERSISTED REDUCER ================= */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ================= STORE ================= */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/* ================= PERSISTOR ================= */
export const persistor = persistStore(store);