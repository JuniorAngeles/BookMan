import React from "react";
import ReactDOM from "react-dom/client";
import Libres from "./router/Libres";
import Login from "./router/loginView";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CreateBook } from "./router/CreateBook";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import Documentacion from "./router/Documentation";
import Admin from "./user/admin";
import User from "./user/user";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div id="claroTema">
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={"/Libres/login"} />} />
        <Route path="/Libres" element={<Libres />} />
        <Route path="/Libres/login" element={<Login />} />
        <Route path="/Libres/createBook" element={<CreateBook />} />
        <Route path="/Libres/Documentation" element={<Documentacion />} />
        <Route path="/Libres/Admin" element={<Admin />} />
        <Route path="/Libres/User" element={<User />} />
      </Routes>
    </HashRouter>
  </div>
);
