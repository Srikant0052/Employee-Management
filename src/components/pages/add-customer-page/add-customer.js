import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import customStyle from './add-customer.module.css'

function AddCustomer({ tasks, setTasks, setIsAdding }) {
  const [name, setName] = useState("");
  //   const [customerId, setCustomerId] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [date, setDate] = useState("");
  //   let employeeId = localStorage.getItem("employeeId");
  const textInput = useRef(null);

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
          },
        });

        console.log(resp);
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
        <h1>Add Customer</h1>
        <label htmlFor="name">Customer Name</label>
        <input
          id="name"
          type="text"
          ref={textInput}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
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
      </form>
    </div>
  );
}

export default AddCustomer;
