import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx"

const Main=()=> {
  return (
    <div className="flex flex-col content-between justify-between min-h-[100vh] bg-gradient-to-t bg-slate-200  ">
      <Navbar/>
      <Outlet className="mt-32"></Outlet>
      <Footer/>
    </div>
  );
};

export default Main
