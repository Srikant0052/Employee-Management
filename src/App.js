import React, { Component } from "react";
import { Route, Routes } from "react-router-dom"
import Navbar from "./NavBar";
// import logo from './logo.svg';
import AddEmployee from "./pages/addEmployee";
import Home from "./pages/dashboard";
import WorkLog from "./pages/workLog";
import Task from "./pages/addTask";
import Register from "./pages/registration";
import Login from "./pages/login"
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
      <Navbar />
        <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workLog" element={<WorkLog />} />
          <Route path="/addTask" element={<Task />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* <Pages /> */}
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
