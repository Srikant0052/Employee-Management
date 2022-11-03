import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
// import { Link } from "react-router-dom";
import customStyle from "./task-data.module.css";

function TaskData() {
  const [taskData, setTaskData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(true);
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  let taskId = localStorage.getItem("taskId");
  //   console.log(status);
  //   console.log(taskId);

  //get all tasks
  async function getTaskDetails() {
    try {
      let resp = await axios({
        method: "get",
        url: `http://localhost:4000/getTask/${taskId}`,
      });

      if (resp.data.data) {
        setTaskData(resp.data.data);
      }
      //   console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  //Update Task Status
  async function updateTaskStatus() {
    try {
      let resp2 = await axios({
        method: "put",
        url: `http://localhost:4000/updateTask/${taskData.taskId}/${taskData.employeeId}`,
        data: { status },
      });
      console.log(resp2.data.data);

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
      console.log(error.response.data.message);
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        updateTaskStatus();
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
        url: `http://localhost:4000/task/${taskId}`,
      });
    } catch (error) {
      console.log(error.response.data.message);
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteTask();
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
  return (
    <>
      <div className={customStyle.form}>
        <div className={customStyle.dateContainer}>
          <div>Date: {moment().format("LLL")} </div>
          <div>
            {userName}({userId})
          </div>
        </div>
        <u>
          <h5>Task Details</h5>
        </u>
        <table className="striped-table">
          <thead>
            <tr>
              {/* <th>Att</th> */}
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
                  <select onChange={(e) => setStatus(e.target.value)}>
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
