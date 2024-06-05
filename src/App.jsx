import React from 'react';
import Home from "./Home";
import Login from "./Login";
import {Routes, Route} from "react-router-dom";

import Navbar from './Navbar';
import "./index.css";
import Signup from './Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './MyOrder';




const App = () => {
  return (
    <CartProvider>
      <Navbar/>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/signup" Component={Signup} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/myorder" Component={MyOrder} />
      </Routes>
      </CartProvider>
  );
}

export default App;
