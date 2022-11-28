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
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfJoining, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  let [err, setErr] = useState(null);

  localStorage.setItem("employeeId", employeeId);
  const textInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  // console.log(gender);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  let options1 = [
    { value: "Select", label: "Select" },
    { value: "Admin", label: "Admin" },
    { value: "Employee", label: "Employee" },
  ];

  let options2 = [
    { value: "Select", label: "Select" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !firstName ||
      !userName ||
      !email ||
      !mobile ||
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
      gender,
      designation,
      email,
      mobile,
      dateOfJoining,
      address,
      userName,
      password,
      role,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "https://backend.worklog.tech/employee",
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
        setErr(error.response.data);
        // console.log(error);
      }
    }

    saveDataInDb();

    if (!err) {
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${firstName} ${lastName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  // console.log(err);

  return err ? (
    <div>
      <h1>{err.error.message} </h1>
      <Link to="/addEmployee">Go Back</Link>
    </div>
  ) : (
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
            <label htmlFor="employeeId">
              Employee ID<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="employeeId"
              type="text"
              ref={textInput}
              name="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Employee ID"
              required
            />
            <label htmlFor="firstName">
              First Name<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="firstName"
              type="text"
              ref={textInput}
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
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
            <label htmlFor="gender">
              Gender<sup style={{ color: "red" }}>*</sup>
            </label>
            <select onChange={(e) => setGender(e.target.value)}>
              {options2.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="Designation">
              Designation<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="designation"
              type="text"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Description"
              required
            />
            <label htmlFor="email">
              Email<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <label htmlFor="phone">
              Mobile<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="mobile"
              type="tel"
              name="phone"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile No."
              required
            />

            <label htmlFor="role">
              Role<sup style={{ color: "red" }}>*</sup>
            </label>
            <select onChange={(e) => setRole(e.target.value)}>
              {options1.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="dateOfJoining">
              Date Of Joining<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="dateOfJoining"
              type="date"
              name="dateOfJoining"
              value={dateOfJoining}
              onChange={(e) => setDate(e.target.value)}
              // placeholder="Date"
            />

            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Type your Address here"
            />

            <label htmlFor="username">
              UserName<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User Name"
            />

            <label htmlFor="password">
              Password<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span className="form-text small text-muted">
              The password must be 8-20 characters,1 UpperCase, 1 LowerCase and
              1 Special characters.
            </span>
            <div style={{ marginTop: "30px" }}>
              <input type="submit" value="Add" />
              <input
                style={{ marginLeft: "12px" }}
                // className={customStyle.footer}
                className="btn btn-primary"
                type="reset"
                value="Cancel"
                onClick={() => navigate("/addEmployee")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
