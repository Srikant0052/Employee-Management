import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import customStyle from './add-task.module.css'

function AddTask({ tasks, setTasks, setIsAdding }) {
  const [projectCode, setprojectCode] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [description, setDescription] = useState("");
  const textInput = useRef(null);
  // const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!description) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newTask = {
      employeeId,
      projectCode,
      description,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "http://localhost:4000/addTask",
          data: {
            ...newTask,
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
    // setTasks(tasks);
    // setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `Task has been Added.`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className={customStyle.form}>
      <form onSubmit={handleAdd}>
        <h1>Add Task</h1>
        <label htmlFor="projectCode">ProjectCode</label>
        <input
          id="projectCode"
          type="text"
          ref={textInput}
          name="projectCode"
          value={projectCode}
          onChange={(e) => setprojectCode(e.target.value)}
          placeholder="Project Code"
        />

        <label htmlFor="employeeId">Employee Id</label>
        <input
          id="employeeId"
          type="text"
          ref={textInput}
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Employee ID"
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

        {/* <label htmlFor="dateOfJoining">Date Of Joining</label>
        <input
          id="dateOfJoining"
          type="date"
          name="dateOfJoining"
          value={dateOfJoining}
          onChange={(e) => setDate(e.target.value)}
        /> */}

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

export default AddTask;
