import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwiggatoApp from "./project/home";
import Cart from "./project/cart";
import PaymentForm from "./project/payment";
import Loginsignup from "./project/LoginSignup";
import Index from "./project";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginsignup />}/>
        <Route path='/home' element={<SwiggatoApp />} />
        <Route path='/project/cart' element={<Cart />} />
        <Route path='/project/payment' element={<PaymentForm />} />
        <Route path='/index' element={<Index />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App