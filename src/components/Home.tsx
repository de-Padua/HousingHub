import React from "react";
import { Route, Routes } from "react-router-dom";
import Aluguel from "./Aluguel";
import Venda from "./Venda";
import Default from "./Default";
import Login from "./Login";

export default function Home() {




  
  return (
    <div>
      <div className="container-x">
        <div className="text-container">
            <Routes>
              <Route path={"/"} element={<Default/>} />
              <Route path={"/aluguel"} element={<Aluguel />} />
              <Route path={"/venda"} element={<Venda />} />
              <Route path="/login/*"  element={<Login />} />
            </Routes>    
        </div>
      </div>
    </div>
  );
}
