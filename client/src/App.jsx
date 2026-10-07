import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Cart from "./pages/Cart";
import BrokenComponent from "./components/BrokenComponent";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/carts" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/broken" element={<BrokenComponent />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
