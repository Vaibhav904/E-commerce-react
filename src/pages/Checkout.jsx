import React from 'react';
import Formpay from './Formpay';
import Ordersum from './Ordersum';

export default function Checkout() {
  return (
    <div>
    <div className="container">
        <div className="row">
            <div className="col-md">
                <Formpay/>
            </div>
             <div className="col-md">
                <Ordersum/>
            </div>
        </div>
    </div>
    </div>
  );
}
