import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

// 🔴 DIRECT API KEY (temporary use)
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
