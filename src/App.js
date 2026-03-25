import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layout";
import Shop from "./pages/Shop";
import Product from "./pages/CategoryshopAll";
import Page from "./pages/Page";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import Categorie from "./pages/Categorie";
import Filter from "./pages/Filter";
import Alldetail from "./pages/Alldetail";
import Addcart from "./pages/Addcart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ShopDetails from "./pages/ShopDetails";
import Contact from "./pages/Contact";
import Dashboard from "./Admin/Dashboard";
import VendorDashboard from "./Vendor/VendarAdmin/Dashboard";
import Testing from "./pages/Testing";
import Adminproduct from "./Admin/Adminproduct";
import Analytics from "./Admin/Analytics";
import Order from "./Admin/Order";
import Customer from "./Admin/Customer";
import SpecialProduct from "./Admin/SpecialProduct";
import Settings from "./Admin/Settings";
import Edit from "./Admin/Edit";
import ProductAdd from "./Admin/ProductAdd";
import AddCategory from "./Admin/AddCategory";
import SignUp from "./pages/SignUp";
import Admin from "./Admin/Admin";
import EditCategory from "./Admin/EditCategory";
import SubCategory from "./Admin/SubCategory";
import ProductEdit from "./Admin/ProductEdit";
import BannerEdit from "./Admin/BannerEdit";
import AddBanner from "./Admin/AddBanner";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import PaymentSuccess from "./Transaction/PaymentSuccess";
import PaymentFailed from "./Transaction/PaymentFailed";
import AddSpecial from "./Admin/AddSpecial";
import SpecialProductEdit from "./Admin/SpecialProductEdit";
import CategoryshopAlls from "./pages/CategoryshopAll";
import Orderlisting from "./Admin/Orderlisting";
import OrderDetails from "./Admin/OrderDetails";
import CustomerOrderDetails from "./Admin/CustomerOrderDetails";
import Wishlist from "./pages/Wishlist";
import MyOrder from "./pages/MyOrder";
import VendorLogin from "./Vendor/VendorLogin";
import VendorVerifyOtp from "./Vendor/VendorVerifyOtp";
import AdminVendor from "./Admin/AdminVendor";
import VendarOrder from "./Vendor/VendarAdmin/Order";
import VendorAdminproduct from "./Vendor/VendarAdmin/Adminproduct";
import VendarOrderlisting from "./Vendor/VendarAdmin/Orderlisting";
import VenderProductAdd from "./Vendor/VendarAdmin/ProductAdd";
import VenderProductEdit from "./Vendor/VendarAdmin/ProductEdit";
import EarningsVendor from "./Vendor/VendarAdmin/EarningsVendor";
import VendorProfile from "./Vendor/VendarAdmin/VendorProfile";
// import VendorProfile from "./Vendor/VendarAdmin/VendorProfile";


import VendorPayment from "./Admin/VendorPayment";
import VendorOrderDetails from "./Vendor/VendarAdmin/VendorOrderDetails";
import Updatepassword from "./Admin/Updatepassword";

function App() {
  // const { token } = useContext(AuthContext); // 🔥 token check
  const vendorToken = localStorage.getItem("vendorToken");
  const adminToken = localStorage.getItem("adminToken");

  const ProtectedVendorRoute = ({ children }) => {
    const vendorrToken = localStorage.getItem("vendorToken");

    return vendorrToken ? children : <Navigate to="/vendor-login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- ADMIN AUTH REDIRECTS ---------- */}

        {/* /admin → Login या Dashboard */}
        <Route
          path="/admin"
          element={
            adminToken ? <Navigate to="/admin/dashboard" replace /> : <Admin />
          }
        />

        <Route
          path="/admin/dashboard"
          element={adminToken ? <Dashboard /> : <Navigate to="/admin" replace />}
        />

        {/* Other admin protected routes */}
        <Route
          path="/adminproducts"
          element={adminToken ? <Adminproduct /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/order"
          element={adminToken ? <Order /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/bannerlisting"
          element={adminToken ? <SubCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/edit"
          element={adminToken ? <Edit /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/analytics"
          element={adminToken ? <Analytics /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/settings"
          element={adminToken ? <Settings /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/customer"
          element={adminToken ? <Customer /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/specialproduct"
          element={
            adminToken ? <SpecialProduct /> : <Navigate to="/admin" replace />
          }
        />

        <Route
          path="/customer-orderlisting"
          element={adminToken ? <Orderlisting /> : <Navigate to="/admin" replace />}
        />

        <Route
          path="/productadd"
          element={adminToken ? <ProductAdd /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/addCategory"
          element={adminToken ? <AddCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/editcategory/:id"
          element={adminToken ? <EditCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/productedit/:id"
          element={adminToken ? <ProductEdit /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/specialedit/:id"
          element={
            adminToken ? <SpecialProductEdit /> : <Navigate to="/admin" replace />
          }
        />
        <Route
          path="/addbanner"
          element={adminToken ? <AddBanner /> : <Navigate to="/admin" replace />}
        />
          <Route
          path="/Updatepassword"
          element={adminToken ? <Updatepassword/>: <Navigate to="/admin" replace />}
        />
        <Route
          path="/orderdetails/:id"
          element={adminToken ? <OrderDetails /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/customerorderdetails/:id"
          element={adminToken ? <CustomerOrderDetails /> : <Navigate to="/admin" replace />}
        />

        <Route
          path="/addspecial"
          element={adminToken ? <AddSpecial /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/vendorlisting"
          element={adminToken ? <AdminVendor /> : <Navigate to="/admin" replace />}
        />
          <Route
          path="/vendorpayment"
          element={adminToken ? <VendorPayment /> : <Navigate to="/admin" replace />}
        />

        <Route
          path="/banneredit/:id"
          element={adminToken ? <BannerEdit /> : <Navigate to="/admin" replace />}
        />

        {/* Vendor page header---------------------------------------------- */}
        {/* <Route
          path="/addspecial"
          element={token ? <AddSpecial />/>}
        /> */}

        {/* ---------- WEBSITE ROUTES ---------- */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alldetail" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/page" element={<Page />} />
          <Route path="categorie/:slug" element={<Categorie />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/addcart" element={<Addcart />} />
          <Route path="/product/:id" element={<Alldetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-verify-otp" element={<VendorVerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shopdetails" element={<ShopDetails />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-list" element={<MyOrder />} />
          <Route path="/category-all/:slug" element={<CategoryshopAlls />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailed />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/testing" element={<Testing />} />

          {/* seller route */}
        </Route>
        <Route>
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedVendorRoute>
                <VendorDashboard />
              </ProtectedVendorRoute>
            }
          />

          {/* Other admin protected routes */}
          <Route
            path="/vendor/products"
            element={
              <ProtectedVendorRoute>
                <VendorAdminproduct />
              </ProtectedVendorRoute>
            }
          />


            <Route
            path="/vendor/vendor-earnings"
            element={
              <ProtectedVendorRoute>
                <EarningsVendor/>
              </ProtectedVendorRoute>
            }
          />
           {/* {
                id: "Profile",
                icon: <CiCircleList />,
                label: "Profile",
                path: "/vendor/vendor-profile",
              }, */}
            <Route
            path="/vendor/vendor-profile"
            element={
              <ProtectedVendorRoute>
                <VendorProfile/>
              </ProtectedVendorRoute>
            }
          />


          <Route
            path="/vendor/Category"
            element={
              // vendorToken ? <VendarOrder /> : <Navigate to="/vendor" replace />
              <ProtectedVendorRoute>
                <VendarOrder />
              </ProtectedVendorRoute>
            }
          />

          <Route
            path="/edit"
            element={
              // vendorToken ? <Edit /> : <Navigate to="/vendor" replace />
              <ProtectedVendorRoute>
                <Edit />
              </ProtectedVendorRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedVendorRoute>
                <Settings />
              </ProtectedVendorRoute>
              // vendorToken ? <Settings /> : <Navigate to="/vendor" replace />
            }
          />

          <Route
            path="/orderdetails/:id"
            element={
              <ProtectedVendorRoute>
                <OrderDetails />
              </ProtectedVendorRoute>
              // vendorToken ? <OrderDetails /> : <Navigate to="/vendor" replace />
            }
          />
          <Route
            path="/vendar-orderlisting"
            element={
              <ProtectedVendorRoute>
                <VendarOrderlisting />
              </ProtectedVendorRoute>
              // vendorToken ? (
              //   <VendarOrderlisting />
              // ) : (
              //   <Navigate to="/vendor" replace />
              // )
            }
          />

          <Route
            path="/vender-productadd"
            element={
              <ProtectedVendorRoute>
                <VenderProductAdd />
              </ProtectedVendorRoute>
              // vendorToken ? <ProductAdd /> : <Navigate to="/vendor" replace />
            }
          />
          <Route
            path="/vendor-orders-details/:id"
            element={
              <ProtectedVendorRoute>
                <VendorOrderDetails />
              </ProtectedVendorRoute>
              // vendorToken ? <ProductAdd /> : <Navigate to="/vendor" replace />
            }
          />
          

          <Route
            path="/vender-productedit/:id"
            element={
              <ProtectedVendorRoute>
                <VenderProductEdit />
              </ProtectedVendorRoute>
              // vendorToken ? <ProductEdit /> : <Navigate to="/vendor" replace />
            }
          />
          <Route
            path="/specialedit/:id"
            element={
              <ProtectedVendorRoute>
                <SpecialProductEdit />
              </ProtectedVendorRoute>
              // vendorToken ? (
              //   <SpecialProductEdit />
              // ) : (
              //   <Navigate to="/vendor" replace />
              // )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
