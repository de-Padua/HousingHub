import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Item from "./components/Item";
import CreateNewSalesAd from "./components/CreateNewSalesAd";
import Perfil from "./components/Perfil";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/profile/*" element={<Perfil />} />
        <Route path="/login/user/*" element={<Login />} />
        <Route path="/item/*" element={<Item />} />
        <Route path="/criar/anuncio" element={<CreateNewSalesAd />} />
      </Routes>
    </>
  );
}
2;
