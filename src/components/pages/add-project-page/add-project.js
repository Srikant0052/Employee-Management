import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import customStyle from './add-project.module.css'

function AddProject({ tasks, setTasks, setIsAdding }) {
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  //   let employeeId = localStorage.getItem("employeeId");
  const textInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !description || !date) {
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
      description,
      date,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "http://localhost:4000/addProject",
          data: {
            ...newProject,
          },
        });
        if (resp.data.status == true) {
          const reload = window.location.reload();
          setTimeout(reload, 2000);
        }
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
      text: `Project has been Added.`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className={customStyle.form}>
      <form onSubmit={handleAdd}>
        <h1>Add Project</h1>
        <label htmlFor="name">Project Name</label>
        <input
          id="name"
          type="text"
          ref={textInput}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label htmlFor="customerId">Customer Id</label>
        <input
          id="customerId"
          type="text"
          ref={textInput}
          name="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Customer Id"
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
            onClick={() => navigate("/updatetask")}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProject;
