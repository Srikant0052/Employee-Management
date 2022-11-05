import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import customStyle from "./update-task.module.css";

function UpdateTask({ setIsAdding }) {
  const [projectCode, setProjectCode] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(true);
  let [err, setErr] = useState(null);

  // const textInput = useRef(null);
  // const { register, handleSubmit, reset } = useForm();
  const employeeId = localStorage.getItem("employeeId");
  // console.log(employeeId)
  // useEffect(() => {
  //   textInput.current.focus();
  // }, []);

  async function getTask() {
    try {
      let resp = await axios({
        method: "get",
        url: `https://bworklogtech.herokuapp.com/getAllProject`,
      });

      if (resp.data.data) {
        setProject(resp.data.data);
      }

      // let resp2 = await axios({
      //   method: "get",
      //   url: "https://bworklogtech.herokuapp.com/employeeList",
      // });

      // if (resp2.data.data) {
      //   setEmployeeData(resp2.data.data);
      // }
      // console.log(resp.data.data);
    } catch (error) {
      setErr(error.response.data);
      // console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTask();
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
      startingTime: date,
    };

    async function saveDataInDb() {
      try {
        let resp = await axios({
          method: "post",
          url: "https://bworklogtech.herokuapp.com/UpdateTask",
          data: {
            ...newTask,
          },
        });
        if (resp.data.status == true) {
          const reload = window.location.reload();
          setTimeout(reload, 2000);
        }

        // console.log(resp);
      } catch (error) {
        setErr(error.response.data);
        // console.log(error.response.data.message);
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

  return err ? (
    <div>
      <h1>{err.error.message} </h1>
    </div>
  ) : (
    <div className={customStyle.form}>
      <form onSubmit={handleAdd}>
        <h1>Add Task</h1>
        <label htmlFor="projectCode">ProjectCode</label>
        <select
          defaultValue="Select"
          onChange={(e) => setProjectCode(e.target.value)}
        >
          <option value="Select"> Select </option>
          {project.length > 0 &&
            project.map((option, index) => (
              <option key={index} value={option.projectCode}>
                {option.projectCode}
              </option>
            ))}
          {/* <input
            // id="projectCode"
            // type="text"
            // ref={textInput}
            // name="projectCode"
            // value={projectCode}
            // onChange={(e) => setprojectCode(e.target.value)}
            // placeholder="Project Code"
          /> */}
        </select>

        {/* <label htmlFor="employeeId">Employee Id</label>
        <input
          id="employeeId"
          type="text"
          ref={textInput}
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Employee ID"
        /> */}

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label htmlFor="dateOfJoining">Date</label>
        <input
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
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
