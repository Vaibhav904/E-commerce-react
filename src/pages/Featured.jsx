import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";
import Dropdown from 'react-bootstrap/Dropdown';
import Deatils from './Alldetail';
import { useNavigate } from "react-router-dom";
import Alldetail from './Alldetail';
import { getProd, getProducts } from '../utils/requests';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Redux/ProductSlice';

export default function Featured({stockUpdate}) {
const [brands,setBrands]=useState([]);
  // console.log('stockUpdate', stockUpdate);
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const productsNEw = useSelector((state) => state?.products?.items);
  const filteredNEw = useSelector((state) => state?.products?.filtered);
  // console.log('filteredNEw', filteredNEw);
  const [product,setProduct]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // agar filter laga hai to usko use karo warna full list
const dataToPaginate = filteredNEw?.length > 0 ? filteredNEw : productsNEw?.products || [];

// current page ke cards
const currentCards = dataToPaginate.slice(indexOfFirstCard, indexOfLastCard);

// const currentCards = dataToPaginate.slice(indexOfFirstCard, indexOfLastCard);

// total pages calculate
const totalPages = Math.ceil(dataToPaginate.length / cardsPerPage);

  const fetchpro= async()=>{
    try{
      const data = await getProducts();
      
      dispatch(addProduct(data));
      setProduct(data);
      const  uniquevalue= [...new Set(data.products.map((p)=>p.brand))];
      
      setBrands(uniquevalue);
      
    }
    catch(err){
      console.log("Api is not Fetching",err.message);
    }
  }
  const fetchByOrder = async (order) =>{
    try{
      const data = await getProd(order);
       dispatch(addProduct(data));
      setProduct(data); 
    } catch(e){

    }
  }
  useEffect(()=>{
    fetchpro();
  },[]);
     const bestseller =[
    {img:"https://fashion.minimog.co/cdn/shop/products/22.1b.jpg?v=1708672024&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
     {img:"https://fashion.minimog.co/cdn/shop/products/2.1b.jpg?v=1708671658&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/7.1b.jpg?v=1708671676&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/14.1b_7dfad9d2-b8fd-49aa-9e87-8c2afc776a68.jpg?v=1709119519&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/6.1b.jpg?v=1708671720&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/9.1a.jpg?v=1708671749&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
     {img:"https://fashion.minimog.co/cdn/shop/products/11.1a.jpg?v=1708671758&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/4.1b.jpg?v=1708671778&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/13.1a.jpg?v=1708671787&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/18.1a-1.jpg?v=1708671807&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
    

  ]
  return (
    <div>
       <div className="featured-pro">
        <div className="filter-cards">
          <div className="filter-drop">
                <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Featured
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Featured</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Best Selling</Dropdown.Item>
        <Dropdown.Item onClick={(e) => fetchByOrder('asc')} >Alphabetically, A-Z</Dropdown.Item>
        <Dropdown.Item onClick={(e) => fetchByOrder('desc')} >Alphabetically, Z-A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>
          <div className="filter-boxmanage">
            {/* <a><HiOutlineBars3 /></a>
             <a><HiOutlineBars3 /></a>
              <a><HiOutlineBars3 /></a> */}
            
          </div>
        </div>
       <div className="ten-card gy-4">
  {stockUpdate === "Instock" && currentCards?.map((seller, index) => (
    <div 
      onClick={() => navigate(`/product/${seller?.id}`)}  
      className="best-sellercard2" 
      key={seller?.id}
    >
      <div className="seller-card">
        <img src={seller.images?.[0]} alt="" />
        <h4>{seller.title}</h4>
        <p>{seller.price}</p>
        <div className="btn-selectwish">
          <div className="whislist-icon">
            <button><CiHeart /></button>
            <button><FaEye /></button>
          </div>
          <div className="select-option">
            <button>Select options</button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

{/* Pagination */}
<div className="pagin-center pagination mt-4 flex justify-center gap-2">
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 border rounded ${
        currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
      }`}
    >
      {i + 1}
    </button>
  ))}
</div>
       </div>
    </div>
  );
}
