import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/molecules/NavBar";
import "./App.css";
import { ROUTES } from "./const";

function App() {
  {
    return (
      <>
        <Navbar />
        <div className="App">
          <Routes>
            {ROUTES.map(({ path, page }, index) => {
              return <Route path={path} key={index} element={page} />;
            })}
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
