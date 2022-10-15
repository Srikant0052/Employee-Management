import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function updateTask() {
  const [employeeTask, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [status, setStatus] = useState("");
  // const [employeeId, setEmployeeId] = useState("");
  // console.log(employeeTask);

  //   if ( !description ) {
  //     return Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "All fields are required.",
  //       showConfirmButton: true,
  //     });
  //   }

  //get all tasks
  async function getTask() {
    try {
      let resp = await axios({
        method: "get",
        url: "http://localhost:4000/getTask",
      });

      if (resp.data.data) {
        setTask(resp.data.data);
      }
      // console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  //Update a Task by projectCode
  async function updateTask() {
    try {
      let resp = await axios({
        method: "put",
        url: `http://localhost:4000/updateTask/${projectCode}`,
        data: {
          status,
          description,
          spendTime: duration,
        },
      });

      // if (resp.data.data) {
      //   setTask(resp.data.data);
      // }
      console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  let options1 = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  console.log(status);
  console.log(projectCode);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Employee ID</th>
            <th>Project Code</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>Status</th>
            <th>Duration(hr)</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeTask.length > 0 ? (
            employeeTask.map((task, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{task.employeeId}</td>

                <select
                  defaultValue="n/a"
                  onChange={(e) => setProjectCode(e.target.value)}
                >
                  <option value="n/a"> n/a </option>
                  {employeeTask.map((option) => (
                    <option value={option.projectCode}>
                      {option.projectCode}
                    </option>
                  ))}
                </select>
                <td>
                  {/* <label htmlFor="description"></label> */}
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                  />
                </td>
                <td>{task.startingTime}</td>
                <select onChange={(e) => setStatus(e.target.value)}>
                  {options1.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <td>
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Time"
                  />{" "}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => updateTask()}
                    className="button muted-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Project</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default updateTask;
