import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Testing() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      setUsers(res.data)
    });
  },[])
  return (
    <div>
     <h4>my data</h4>
      {users.map((user)=>(
        <h4 key={user}>{user.name}</h4>
      ))}
    </div>
  );
}
