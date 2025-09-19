import React, { useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState(""); // user ka input
  const [results, setResults] = useState([]); // API ka data store karna

  const handleSearch = async () => {
    try {
      // API ko hit karna
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      
      // response ko JSON me convert karna
      const data = await res.json();
      
      // data ko state me save karna
      setResults(data.products);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;
