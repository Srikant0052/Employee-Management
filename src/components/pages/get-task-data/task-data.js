import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import customStyle from "./task-data.module.css";
import { Link } from "react-router-dom";

function TaskData() {
  const [taskData, setTaskData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(true);
  let [err, setErr] = useState(null);
  const [displayed, setDisplayed] = useState(false);
  let userName = localStorage.getItem("userName");
  let taskId = localStorage.getItem("taskId");
  //   console.log(taskId);

  //get all tasks
  async function getTaskDetails() {
    try {
      let resp = await axios({
        method: "get",
        url: `https://bworklogtech.herokuapp.com/getTask/${taskId}`,
      });

      if (resp.data.data) {
        setTaskData(resp.data.data);
      }
    } catch (error) {
      setErr(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  //Update Task Status
  async function updateTaskStatus() {
    try {
      let resp2 = await axios({
        method: "put",
        url: `https://bworklogtech.herokuapp.com/updateTask/${taskData.taskId}/${taskData.employeeId}`,
        data: { status },
      });

      if (resp2.data.status == true) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // const reload = window.location.reload();
        // setTimeout(reload, 2000);
      }
    } catch (error) {
      setErr(error.response.data);
    }
  }

  const handlleUpdate = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateTaskStatus();
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //Delete Task
  async function deleteTask() {
    try {
      let resp3 = await axios({
        method: "delete",
        url: `https://bworklogtech.herokuapp.com/task/${taskData.taskId}`,
      });
    } catch (error) {
      setErr(error.response.data);
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const reload = window.location.reload();
        setTimeout(reload, 2000);
      }
    });
  };

  useEffect(() => {
    getTaskDetails();
  }, []);
  let options1 = [
    { value: "Pend", label: "Pend.." },
    { value: "Comp", label: "Comp.." },
  ];

  if (isLoading) {
    return null;
  }
  return err ? (
    <div>
      <h1>{err.error.message} </h1>
      <Link to="/addTask">Go To Home</Link>
    </div>
  ) : (
    <>
      <div className={customStyle.form}>
        <div className={customStyle.dateContainer}>
          <div>Date: {moment().format("LLL")} </div>
          <Link
            to="/user"
            onMouseEnter={() => setDisplayed(true)}
            onMouseLeave={() => setDisplayed(false)}
          >
            {userName}
            {displayed && <div>Go to Profile</div>}
          </Link>
        </div>
        <u>
          <h5>Task Details</h5>
        </u>
        <table className="striped-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Project Code</th>
              <th>Description</th>
              <th>Status</th>
              <th>DM Also</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(taskData).length > 0 ? (
              <tr>
                <td>{taskData.taskId}</td>
                <td>{taskData.projectCode}</td>
                <td>{taskData.description}</td>
                <td>
                  <select onChange={(e) => setStatus(e.target.value)} required>
                    {options1.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{taskData.DM_To}</td>
                <td>{taskData.spendTime}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7}>No Task</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn mb-2">Edit</button>&nbsp;
        <button onClick={() => handleDelete()} className="btn mb-2">
          Delete
        </button>
        &nbsp;
        <button className="btn mb-2">Add Note</button>&nbsp;
        <button onClick={() => handlleUpdate()} className="btn mb-2">
          Change Status
        </button>
      </div>
    </>
  );
}

export default TaskData;