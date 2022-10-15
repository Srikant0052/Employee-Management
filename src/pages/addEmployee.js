import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Add({ employees, setEmployees, setIsAdding }) {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfJoining, setDate] = useState("");
  localStorage.setItem("employeeId", employeeId);
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !firstName ||
      !userName ||
      !email ||
      !designation ||
      !password
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

        console.log(resp);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    saveDataInDb();
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container">
      
      <form onSubmit={handleAdd}>
      <div className="=row">
      <div className="col-xl-4 col-md-3"></div>
      <div className="col-xl-4 col-md-6">
        <div
          style={{
            marginTop: "30px",
            marginBottom: "18px",
            textAlign: "center",
          }}
        >
          <h1>Add Employee </h1>
        </div>
        <label htmlFor="employeeId">Employee ID</label>
        <input
          id="employeeId"
          type="text"
          ref={textInput}
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Employee ID"
        />
        <label htmlFor="firstName">First Name</label>
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
        <label htmlFor="Designation">Designation</label>
        <input
          id="designation"
          type="text"
          name="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Description"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <label htmlFor="dateOfJoining">Date Of Joining</label>
        <input
          id="dateOfJoining"
          type="date"
          name="dateOfJoining"
          value={dateOfJoining}
          onChange={(e) => setDate(e.target.value)}
          // placeholder="Date"
        />

        <label htmlFor="username">UserName</label>
        <input
          id="username"
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
        />

        <label htmlFor="password">Password</label>
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
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
        </div>
        <div className="col-xl-4 col-md-3"></div>
      </div>
      </form>
      
    </div>
  );
}

export default Add;
