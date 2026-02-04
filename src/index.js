import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./Context/AuthContext";

// 👇 GOOGLE MAPS
import GoogleMapsProvider from "./Provider/GoogleMapsProvider";

// 👇 STRIPE
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ publishable key (env nahi use kar rahe)
const stripePromise = loadStripe(
  "pk_test_51Of6sWCHHdYKkxfglpixgDunheIYKjrwUtTwCBZYcZ5gbUjJ0OdLDEk6MtjfpLINiIkTUxfUUxGcgl7Q7hXdCQz600Ye9kw91M"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <GoogleMapsProvider>
          {/* 🔥 YAHI PE STRIPE ELEMENTS */}
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </GoogleMapsProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
