import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import customStyle from "./add-customer.module.css";
import { useNavigate } from "react-router-dom";

function AddCustomer({ setIsAdding }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //   const [customerId, setCustomerId] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [date, setDate] = useState("");
  //   let employeeId = localStorage.getItem("employeeId");
  const textInput = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    // const newCustomer = {
    //   name,
    //   //   customerId,
    //   //   description,
    //   //   date,
    // };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "http://localhost:4000/addCustomer",
          data: {
            name,
            address,
          },
        });

        // console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
    saveDataInDb();
    // setTasks(tasks);
    // setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `Customer has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className={customStyle.form}>
      <form onSubmit={handleAdd}>
        <div className={customStyle.form_body}>
          <u>
            <h3
              style={{
                // marginTop: "30px",
                // marginBottom: "18px",
                textAlign: "center",
              }}
            >
              Add Customer
            </h3>
          </u>
          <label htmlFor="name">
            Customer Name<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            id="name"
            type="text"
            ref={textInput}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer Name"
          />

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            ref={textInput}
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
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
      </form>
    </div>
  );
}

export default AddCustomer;
