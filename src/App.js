import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import MealDetails from "./components/Details/MealDetails";
import SearchDetails from "./components/SearchDetails/SearchDetails";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/Checkout/Checkout";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal-details/:id" element={<MealDetails />} />
        <Route path="/search/:term" element={<SearchDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default App;
