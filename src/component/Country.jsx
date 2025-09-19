import React, { useEffect, useState } from "react";

export default function CountrySelector() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags,currencies")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setFilteredCountries(sorted);

          const india = sorted.find((c) => c.cca3 === "IND");
        if (india) setSelectedCountry(india);
      
      });
  }, []);

  // search filter
  useEffect(() => {
    if (search === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, countries]);
    const getCurrency = (country) => {
    if (!country.currencies) return "";
    const code = Object.keys(country.currencies)[0]; // e.g. INR
    const currency = country.currencies[code];
    return `${currency.symbol || ""} ${code}`; // "₹ INR"
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Dropdown Box */}
      <div className="relative">
        <div
          className="select-country flex items-center justify-between "
          onClick={() => setOpen(!open)}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedCountry.flags.svg}
                alt={selectedCountry.name.common}
                className="w-6 h-4 object-cover"
              />
              <span>{selectedCountry.name.common} ({getCurrency(selectedCountry)})</span>
            </div>
          ) : (
            <span className="text-gray-500">-- Choose Country --</span>
          )}
          <span className="text-gray-400">{open ? "⮝" : "⮟"}</span>
        </div>

        {/* Dropdown List */}
        {open && (
          <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg manage-country shadow-lg max-h-60 overflow-y-auto">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border-b outline-none text-sm"
            />
            {filteredCountries.map((country) => (
              <div
                key={country.cca3}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCountry(country);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-6 h-4 object-cover"
                />
                <span>{country.name.common}</span>
              </div>
            ))}
          </div>
        )}
      </div>
{/* 
      {selectedCountry && (
        <p className="mt-3 text-lg">
          You selected:{" "}
   <img
  src={selectedCountry.flags.svg}
  alt={selectedCountry.name.common}
  className="w-6 h-4 object-contain rounded-sm"
/>
          <strong>{selectedCountry.name.common}</strong>
        </p>
      )} */}
    </div>
  );
}
