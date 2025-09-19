import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setFiltered } from '../Redux/ProductSlice';
import Accordion from 'react-bootstrap/Accordion';


function Filter({showStock}) {
   const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
   const [brands, setBrands] = useState([]); // ✅ store unique brands
  const [selectedBrands, setSelectedBrands] = useState([]);
  console.log('selectedBrands', brands);
    const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
   

  const productsNEw = useSelector((state) => state?.products?.items);

  const min = 0;
  const max = 1000;
  const step = 10;

  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.products))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };
  // const handlecheck = (e) => {
  //   e?.preventDefault();
  //   // handlecheck()
  // };

   const currentCards = productsNEw?.products?.filter(
    (p) =>
      p.price >= minPrice &&
      p.price <= maxPrice &&
      (selectedBrands.length === 0 || selectedBrands.includes(p.brand))
  );

  // ✅ filter
  // const currentCards = productsNEw?.products?.filter(
  //   (p) => p.price >= minPrice && p.price <= maxPrice
  // );

  // console.log('currentCards', currentCards);


  // ✅ dispatch whenever currentCards change

  useEffect(() => {
    if (productsNEw?.products?.length > 0) {
      // get all brands
      const allBrands = productsNEw.products.map((p) => p.brand);
      console.log('allBrands', allBrands);
      // remove duplicates
      const uniqueBrands = [...new Set(allBrands)];

      // save in state
      setBrands(uniqueBrands);
    }
  }, [productsNEw]);
 useEffect(() => {
  dispatch(setFiltered(currentCards)); // sirf filtered products save
}, [currentCards, dispatch]);
 
  return (
    <div>
      <div className="filter-section">
        <h4>Filters</h4>
         <Accordion defaultActiveKey={['0', '1','2']}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Availability</Accordion.Header>
        <Accordion.Body>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="aaaaaa"
          id="checkDefault"
        />
        <label className="form-check-label " onClick={(e) => showStock('Instock')} htmlFor="checkDefault">
         In stock (6)
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          name="aaaaaa"
          type="radio"
          id="checkDefault2"
        />
        <label className="form-check-label" onClick={(e) => showStock('Out')} htmlFor="checkDefault2" >
          Out of stock (0)
        </label>
      </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body>
        <div>
      <h2>Filter by Price</h2>
      <p>
        Price Range: <b>${minPrice}</b> - <b>${maxPrice}</b>
      </p>

      {/* ✅ Double Range Slider */}
      <div className="slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className="thumb thumb-left"
        /> 
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxPrice}
          onChange={handleMaxChange}
          className="thumb thumb-right"
        />

        <div className="slider">
          <div className="slider-track"></div>
          <div
            className="slider-range"
            style={{
              left: `${(minPrice / max) * 100}%`,
              right: `${100 - (maxPrice / max) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* ✅ Products List */}
      
    </div>
        </Accordion.Body>
      </Accordion.Item>
        <Accordion.Item eventKey="2">
        <Accordion.Header>Color</Accordion.Header>
        <Accordion.Body>
         <div className="color-selector">
          <div className="black-sel"></div>
          <span>Black(3)</span>
         </div>
         <div className="color-selector">
          <div className="black-sel-blue"></div>
          <span>Blue(5)</span>
         </div>
         <div className="color-selector">
          <div className="black-sel-red"></div>
          <span>Red(3)</span>
         </div>
         <div className="color-selector">
          <div className="black-sel-pink"></div>
          <span>Pink(6)</span>
         </div>
        </Accordion.Body>
      </Accordion.Item>
        <Accordion.Item eventKey="3">
        <Accordion.Header>Brand</Accordion.Header>
        <Accordion.Body>
           {/* <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="checkDefault2"
        />
        <label className="form-check-label" htmlFor="checkDefault2">
        Foxecom (1)
        </label>
      </div>
        <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="checkDefault3"
        />
        <label className="form-check-label" htmlFor="checkDefault3">
        Sunglasses (5)
        </label>
      </div> */}
      {brands.map((brand, index) => (
        <label className="brand-list" key={index}>
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
          />
          {brand}
        </label>
      ))}
 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div className="offer-img">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-filter-promotion.webp?v=1708486296&width=2000" alt="" />
    </div>
      </div>
    </div>
  );
}

export default Filter;
