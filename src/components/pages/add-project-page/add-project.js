import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import customStyle from "./add-project.module.css";

function AddProject() {
  const [name, setName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customer, setCustomerData] = useState("");
  let [err, setErr] = useState(null);
  const textInput = useRef(null);
  const navigate = useNavigate();

  const logedInEmployee = localStorage.getItem("employeeId");
  const cookies = new Cookies();
  let token = cookies.get("accessToken");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    textInput.current.focus();
  }, []);
  async function customerData() {
    try {
      let resp1 = await axios({
        method: "get",
        url: "https://backend.worklog.tech/getCustomer",
      });
      if (resp1.data.data) {
        setCustomerData(resp1.data.data);
      }
    } catch (error) {
      setErr(error.response.data);
    }
  }
  useEffect(() => {
    customerData();
  }, []);
  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !projectCode || !description || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newProject = {
      name,
      customerId,
      projectCode,
      companyName,
      description,
      date,
      logedInEmployee,
      token,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "https://backend.worklog.tech/addProject",
          data: {
            ...newProject,
          },
        });
        if (resp.data.status === true) {
          const reload = window.location.reload();
          setTimeout(reload, 2000);
        }
        console.log(resp);
      } catch (error) {
        setErr(error.response.data);
      }
    }
    saveDataInDb();

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `Project has been Added.`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return err ? (
    <div>
      <h1>{err.error.message} </h1>
      <Link to="/addProject">Go Back</Link>
    </div>
  ) : (
    <div className={customStyle.form}>
      <form onSubmit={handleAdd}>
        <u>
          <h3
            style={{
              // marginTop: "30px",
              // marginBottom: "18px",
              textAlign: "center",
            }}
          >
            Add Project
          </h3>
        </u>

        <label htmlFor="name">
          Project Name <sup style={{ color: "red" }}>*</sup>
        </label>
        <input
          id="name"
          type="text"
          ref={textInput}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <label htmlFor="name">
          Project Code<sup style={{ color: "red" }}>*</sup>
        </label>
        <input
          type="text"
          ref={textInput}
          name="projectCode"
          value={projectCode}
          onChange={(e) => setProjectCode(e.target.value)}
          placeholder="Project Code"
        />

        <label htmlFor="description">
          Description<sup style={{ color: "red" }}>*</sup>
        </label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label htmlFor="customerId">
          Customer Id<sup style={{ color: "red" }}>*</sup>
        </label>
        <select
          defaultValue="Select"
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="Select"> Select </option>
          {customer.length > 0 &&
            customer.map((option, index) => (
              <option key={index} value={option.customerId}>
                {option.customerId}({option.name})
              </option>
            ))}
        </select>

        <label htmlFor="companyName">
          Company Name<sup style={{ color: "red" }}>*</sup>
        </label>
        <input
          id="companyName"
          type="text"
          ref={textInput}
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => navigate("/addProject")}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProject;
