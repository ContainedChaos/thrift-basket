import React, { useState} from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import axios from "axios";
import Login from './components/login/login';
import Register from './components/register/register';
import DataProvider from './context/DataProvider';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import UserProfile from './components/UserProfile/UserProfile';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Navbar from './common/header/Navbar';
import FlashCard from './components/flashDeals/FlashCard';
import AnnounceDrop from './components/AnnounceDrop/AnnounceDrop';
import SeeAnnouncements from './components/SeeAnnouncements/SeeAnnouncements';
import CategoryPage from './components/CategoryPage/CategoryPage';
import OthersProfile from './components/Othersprofile/Othersprofile';
// import Auctionpage from './components/Auctionpage/Auctionpage';
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Verify from './components/verify/verify';
import Uploadproducts from './components/uploadproducts/uploadproducts';
import AnnounceAuction from './components/AnnounceAuction/AnnounceAuction';
import AllProducts from "./components/AllProducts/AllProducts";
import Proceed from "./components/Proceed/Proceed";
import Sell from "./components/Sell/Sell";
import LoggedOutCart from "./common/LoggedOutCart/LoggedOutCart";
import Purchases from "./components/Purchase/Purchases";
import Sales from "./components/Sales/Sales";
import Buy from "./components/Buy/Buy";
import About from "./components/About/About";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";

function App() {
  
  const { productItems } = Data
  const [userCart, setUserCart] = useState([]);
  
  console.log(userCart)

  const addToCart = (product) => {
    
    const productExistIndex = userCart.findIndex((item) => item.productId.toString() === product._id.toString());
    console.log(productExistIndex)
    if (productExistIndex !== -1) {
      const updatedUserCart = [...userCart];
      updatedUserCart[productExistIndex].quantity += 1;
      setUserCart(updatedUserCart);
      console.log(updatedUserCart[productExistIndex])
      const updatedProduct = { ...product, quantity: updatedUserCart[productExistIndex].quantity };
      addToCartAPI(updatedProduct);
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      setUserCart([...userCart, updatedProduct]);
      addToCartAPI(updatedProduct);
    }
  };
  
  
  const addToCartFromCart = (product) => {
    
    const productExistIndex = userCart.findIndex((item) => item.productId.toString() === product.productId.toString());
    
    console.log(productExistIndex)
    
    if (productExistIndex !== -1) {
      const updatedUserCart = [...userCart];
      updatedUserCart[productExistIndex].quantity += 1;
      setUserCart(updatedUserCart);
      
      const updatedProduct = { ...product, quantity: updatedUserCart[productExistIndex].quantity };
      addToCartFromCartAPI(updatedProduct);
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      setUserCart([...userCart, updatedProduct]);
      addToCartFromCartAPI(updatedProduct);
    }

    
  };
  
  const addToCartFromCartAPI = async (product) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { productId, name, price, quantity } = product;
      const data = { productId, name, price, quantity };

      const response = await axios.post("http://localhost:9002/cart/addfromcart", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCart(response.data);
      localStorage.setItem('userCart', JSON.stringify(response.data));
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const addToCartAPI = async (product) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { _id, name, price, quantity } = product;
      const data = { _id, name, price, quantity };

      const response = await axios.post("http://localhost:9002/cart/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCart(response.data);
      localStorage.setItem('userCart', JSON.stringify(response.data));
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (product) => {
    const updatedUserCart = userCart.filter((item) => item.productId !== product.productId);
    setUserCart(updatedUserCart);
    console.log(updatedUserCart)
    removeFromCartAPI(product);
  };

  const removeFromCartAPI = async (product) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { productId } = product;
      const data = { productId };
      console.log(data)
      const response = await axios.post("http://localhost:9002/cart/remove", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCart(response.data);
      localStorage.setItem('userCart', JSON.stringify(response.data));
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQty = (product) => {
    const productExist = userCart.find((item) => item.productId === product.productId);
    if (productExist.quantity === 1) {
      removeFromCart(product);
    } else {
      const updatedUserCart = userCart.map((item) =>
        item.productId === product.productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setUserCart(updatedUserCart);
      console.log(updatedUserCart)
      decreaseQtyAPI(product);
    }
  };

  const decreaseQtyAPI = async (product) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { productId } = product;
      const data = { productId };
      const response = await axios.post("http://localhost:9002/cart/decreaseqty", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCart(response.data);
      localStorage.setItem('userCart', JSON.stringify(response.data));
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  
  

  const [ user, setLoginUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ( {isAuthenticated, ...props}) => {

    return isAuthenticated ?
    <>
      <Outlet />
    </>
    : <Navigate replace to = '/' />
  }

  return (
    <>
    <DataProvider>
      <Router>
        <Navbar userCart={userCart}/>
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} userCart={userCart} />}/>
          <Route path="/sell" element={<Sell userCart={userCart}/>}/>
          <Route path="/buy" element={<Buy userCart={userCart}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} userCart={userCart}/>}/>
          <Route path="/register" element={<Register userCart={userCart}/>}/>
          <Route path="/verify" element={<Verify userCart={userCart}/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword userCart={userCart}/>}/>
          <Route path="/passwordreset" element={<PasswordReset userCart={userCart}/>}/>
          <Route path="/userprofile" element={<UserProfile userCart={userCart}/>}/>
          <Route path="/proceed/:totalPrice" element={<Proceed userCart={userCart}/>}/>
          <Route path="/profile/:username" element={<OthersProfile addToCart={addToCart} userCart={userCart}/>}/>
          <Route path="/uploadproducts" element={<Uploadproducts setIsAuthenticated={setIsAuthenticated} userCart={userCart}/>}/>
          <Route path="/announceauction" element={<AnnounceAuction setIsAuthenticated={setIsAuthenticated} userCart={userCart}/>}/>
          <Route path="/announcedrop" element={<AnnounceDrop setIsAuthenticated={setIsAuthenticated} userCart={userCart}/>}/>
          <Route path="/announcements" element={<SeeAnnouncements userCart={userCart}/>}/>
          <Route path='/productdetails/:productId' element={<ProductDetails addToCart={addToCart} userCart={userCart} />}/>
          {/* <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} > */}
            <Route path='/category/:type' element={<CategoryPage  addToCart={addToCart} userCart={userCart} />}/>
          {/* </Route> */}
          <Route path='/loggedoutcart' element={<LoggedOutCart userCart={userCart}/>}/>
          <Route path='/cart' element={<Cart userCart={userCart} setUserCart={setUserCart} addToCartFromCart={addToCartFromCart} decreaseQty={decreaseQty} removeFromCart={removeFromCart} />}/>
          <Route path='/flashproducts' element={<FlashCard addToCart={addToCart} />}/>
          <Route path='/allproducts' element={<AllProducts addToCart={addToCart} userCart={userCart}/>}/>
          <Route path='/purchases' element={< Purchases />}/>
          <Route path='/sales' element={< Sales />}/>
          {/* <Route path='/auctionpage' element={<Auctionpage />}/> */}
        </Routes>
      <Footer />
      </Router>
    </DataProvider>
    </>
  )
}

export default App
