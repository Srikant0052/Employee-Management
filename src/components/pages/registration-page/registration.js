import React, { useState, setState } from "react";
// import { Link } from "react-router-dom";
import customStyle from "./registration.module.css";

// import "./style.css";
function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className={customStyle.form}>
      <div className={customStyle.form_body}>
        <div>
          <h2>Register Here!</h2>
        </div>
        <div className="username">
          <label className={customStyle.form_label} htmlFor="firstName">
            First Name{" "}
          </label>
          <input
            className={customStyle.form_input}
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className={customStyle.form_label} htmlFor="lastName">
            Last Name{" "}
          </label>
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className={customStyle.form_input}
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>
        <div className="email">
          <label className={customStyle.form_label} htmlFor="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className={customStyle.form_input}
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className={customStyle.form_label} htmlFor="password">
            Password{" "}
          </label>
          <input
            className={customStyle.form_input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className={customStyle.form_label} htmlFor="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className={customStyle.form_input}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className={customStyle.footer}>
        <button onClick={() => handleSubmit()} type="submit" className="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
