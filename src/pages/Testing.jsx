import React, { useState } from 'react';

export default function Testing() {
    const [count,setCount]=useState(0);
    const [showdata,setShowdata]=useState();
   const myRef= React.useRef();
   const HandelSubmit =()=>{
    alert(myRef.current.value);
   }
 
  return (
    <div>
      <h4>vaibhav</h4>
      <button onClick={()=>setCount(count +1)}>
        Increase = {count}
      </button>
     <input type="text"
     ref={myRef}
      />
      <button onClick={HandelSubmit}>Submit</button>
    
    </div>
  );
}
