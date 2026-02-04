import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

// 🔴 DIRECT API KEY (temporary use)
const GOOGLE_MAPS_API_KEY = "AIzaSyD04NzQ2HfRC8IuDlpJOAufjR81uXRurus";

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
