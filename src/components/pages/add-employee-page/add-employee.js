import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import customStyle from "./add-employee.module.css";
import { Link, useNavigate } from "react-router-dom";

function AddEmployee({}) {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfJoining, setDate] = useState("");
  const [role, setRole] = useState("");
  localStorage.setItem("employeeId", employeeId);
  const textInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  console.log(role);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  let options1 = [
    { value: "Select", label: "Select" },
    { value: "Admin", label: "Admin" },
    { value: "Employee", label: "Employee" },
  ];

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !firstName ||
      !userName ||
      !email ||
      !designation ||
      !password ||
      !role
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      employeeId,
      firstName,
      lastName,
      designation,
      email,
      dateOfJoining,
      userName,
      password,
      role,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "http://localhost:4000/employee",
          data: {
            ...newEmployee,
          },
        });

        if (resp.data.status == true) {
          const reload = window.location.reload();
          setTimeout(reload, 2000);
        }
        console.log(resp);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    saveDataInDb();

    // setEmployees(employees);
    // setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className={customStyle.parent}>
      <div className={customStyle.form}>
        <form onSubmit={handleAdd}>
          <div className={customStyle.form_body}>
            <div
              style={{
                // marginTop: "30px",
                // marginBottom: "18px",
                textAlign: "center",
              }}
            >
              <h3>
                <u> Add Employee </u>
              </h3>
            </div>
            <label htmlFor="employeeId">Employee ID<sup style={{color:"red"}}>*</sup></label>
            <input
              id="employeeId"
              type="text"
              ref={textInput}
              name="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Employee ID"
            />
            <label htmlFor="firstName">First Name<sup style={{color:"red"}}>*</sup></label>
            <input
              id="firstName"
              type="text"
              ref={textInput}
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <label htmlFor="Designation">Designation<sup style={{color:"red"}}>*</sup></label>
            <input
              id="designation"
              type="text"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Description"
            />
            <label htmlFor="email">Email<sup style={{color:"red"}}>*</sup></label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <label htmlFor="role">Role<sup style={{color:"red"}}>*</sup></label>
            <select onChange={(e) => setRole(e.target.value)}>
              {options1.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="dateOfJoining">Date Of Joining<sup style={{color:"red"}}>*</sup></label>
            <input
              id="dateOfJoining"
              type="date"
              name="dateOfJoining"
              value={dateOfJoining}
              onChange={(e) => setDate(e.target.value)}
              // placeholder="Date"
            />

            <label htmlFor="username">UserName<sup style={{color:"red"}}>*</sup></label>
            <input
              id="username"
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User Name"
            />

            <label htmlFor="password">Password<sup style={{color:"red"}}>*</sup></label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div style={{ marginTop: "30px" }}>
              <input type="submit" value="Add" />
              <input
                style={{ marginLeft: "12px" }}
                className={customStyle.footer}
                type="button"
                value="Cancel"
                // onClick={() => setIsAdding(false)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
