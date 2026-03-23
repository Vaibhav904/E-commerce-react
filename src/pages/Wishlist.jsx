import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import WishlistImage from '../assets/Image/common_image.png';
export default function Wishlist() {
  const { token } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch Wishlist
useEffect(() => {
  if (location.state?.wishlist) {
    setWishlist(location.state.wishlist);
    setLoading(false);
  } else {
    fetchWishlist();
  }
}, []);

const fetchWishlist = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "http://tech-shop.techsaga.live/api/wishlist/list",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (res.data.status) {
      setWishlist(res.data.data);
    }
  } catch (error) {
    console.error("Wishlist fetch error:", error);
  } finally {
    setLoading(false);
  }
};

  // Remove from wishlist
  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/wishlist/remove",
        { wishlist_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Refresh after remove
      setWishlist((prev) =>
        prev.filter((item) => item.wishlist_id !== wishlist_id)
      );
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading wishlist...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
        <p> 
          <img src={WishlistImage}/>
        </p>
         <p className="p_tag">Your wishlist is empty.</p></div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3 mb-4" key={item.wishlist_id}>
              <div className="seller-card border-wishlist">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.product_name}
                  onClick={() => navigate(`/product/${item.slug}`)}
                />

                <div className="card-body d-flex flex-column">
                  <h4
                    className="card-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    {item.product_name}
                  </h4>

                  {/* <p className="mb-1">
                    <strong>SKU:</strong> {item.sku}
                  </p> */}

                  <p className="mb-1 mt-2">
                    <strong>Price:</strong> ₹{item.price}
                  </p>

                  <p className="mb-3">
                    <strong>Stock:</strong>{" "}
                    {item.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>

                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => removeFromWishlist(item.wishlist_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}