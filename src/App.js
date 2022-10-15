import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
// import logo from './logo.svg';
import Home from "./pages/workLog";
import Register from "./pages/registration";
import Login from "./pages/login";
import AddEmployee from "./pages/addEmployee";
import EmployeeDashboard from "./pages/dashboard";
import Task from "./pages/addTask";
import UpdateTask from "./pages/updateTask";
import AddProject from "./pages/addProject";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employees" element={<EmployeeDashboard />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/addTask" element={<Task />} />
            <Route path="/updatetask" element={<UpdateTask />} />
            <Route path="/addProject" element={<AddProject />} />

            {/* <Pages /> */}
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
