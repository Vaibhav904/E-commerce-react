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

function App() {
  const { token } = useContext(AuthContext); // 🔥 token check

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- ADMIN AUTH REDIRECTS ---------- */}

        {/* /admin → Login या Dashboard */}
        <Route
          path="/admin"
          element={
            token ? <Navigate to="/admin/dashboard" replace /> : <Admin />
          }
        />

        {/* Dashboard Protected Route */}
        <Route
          path="/admin/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/admin" replace />}
        />

        {/* Other admin protected routes */}
        <Route
          path="/adminproducts"
          element={token ? <Adminproduct /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/order"
          element={token ? <Order /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/bannerlisting"
          element={token ? <SubCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/edit"
          element={token ? <Edit /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/analytics"
          element={token ? <Analytics /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/settings"
          element={token ? <Settings /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/customer"
          element={token ? <Customer /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/specialproduct"
          element={
            token ? <SpecialProduct /> : <Navigate to="/admin" replace />
          }
        />

  <Route
          path="/customer-orderlisting"
          element={
            token ? <Orderlisting /> : <Navigate to="/admin" replace />
          }
        />

        <Route
          path="/productadd"
          element={token ? <ProductAdd /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/addCategory"
          element={token ? <AddCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/editcategory/:id"
          element={token ? <EditCategory /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/productedit/:id"
          element={token ? <ProductEdit /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/specialedit/:id"
          element={
            token ? <SpecialProductEdit /> : <Navigate to="/admin" replace />
          }
        />
        <Route
          path="/addbanner"
          element={token ? <AddBanner /> : <Navigate to="/admin" replace />}
        />
 <Route
          path="/orderdetails/:id"
          element={token ? <OrderDetails /> : <Navigate to="/admin" replace />}
        />

        <Route
          path="/addspecial"
          element={token ? <AddSpecial /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/banneredit/:id"
          element={token ? <BannerEdit /> : <Navigate to="/admin" replace />}
        />

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
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shopdetails" element={<ShopDetails />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category-all/:slug" element={<CategoryshopAlls />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailed />} />
          <Route path="/testing" element={<Testing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
