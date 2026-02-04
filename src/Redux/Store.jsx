import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import buyNowReducer from "./buyNowSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔹 Root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  buyNow: buyNowReducer, // ✅ FIXED
});

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "buyNow"], // ✅ FIXED
};

// 🔹 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
