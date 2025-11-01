import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Header from '../src/component/Header.jsx';
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layout";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Page from "./pages/Page";
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Settings from "./Admin/Settings";
import Edit from "./Admin/Edit";
import ProductAdd from "./Admin/ProductAdd";
import AddCategory from "./Admin/AddCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/addCategory" element={<AddCategory/>} />
        <Route path="/testing" element={<Testing/>} />
         <Route path="/productadd" element={<ProductAdd/>} />
         <Route path="/order" element={<Order/>} />
           <Route path="/edit" element={<Edit/>} />
         <Route path="/analytics" element={<Analytics/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/customer" element={<Customer/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminproducts" element={<Adminproduct/>} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/alldetail" element={<Product/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/page" element={<Page/>} />
            <Route path="categorie/:slug" element={<Categorie/>} />
              <Route path="/filter" element={<Filter/>} />
                <Route path="/addcart" element={<Addcart/>} />
              <Route path="/product/:id" element={<Alldetail/>} />
               <Route path="/checkout" element={<Checkout/>} />
                <Route path="/login" element={<Login/>} />
                   <Route path="/contact" element={<Contact/>} />
                <Route path="/shopdetails" element={<ShopDetails/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
