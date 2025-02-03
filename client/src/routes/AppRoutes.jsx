import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { Toaster } from "react-hot-toast";
import Project from "../pages/Project";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default AppRoutes;
