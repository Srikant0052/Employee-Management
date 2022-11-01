import React, { Component, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/molecules/NavBar";
import "./App.css";
import { ROUTES, ADMIN_ROUTES } from "./const";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  let role = cookies.get("userRole");

  if (!cookies.get("accessToken")) {
    <Navigate replace to="/login" />;
  }
  {
    return (
      <>
        <Navbar />
        <div className="App">
          {role && role === "Admin" ? (
            <Routes>
              {ADMIN_ROUTES.map(({ path, page }, index) => {
                return <Route path={path} key={index} element={page} />;
              })}
            </Routes>
          ) : (
            <Routes>
              {ROUTES.map(({ path, page }, index) => {
                return <Route path={path} key={index} element={page} />;
              })}
            </Routes>
          )}
        </div>
      </>
    );
  }
}

export default App;
