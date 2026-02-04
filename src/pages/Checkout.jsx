import React, { useState } from "react";
import Formpay from "./Formpay";
import Ordersum from "./Ordersum";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null); // ✅ ADD THIS

  console.log('selectedAddress----->', selectedAddress);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md">
            <Formpay setSelectedAddress={setSelectedAddress}  />
          </div>
          <div className="col-md">
            <Ordersum selectedAddress={selectedAddress} />
          </div>
        </div>
      </div>
    </div>
  );
}
