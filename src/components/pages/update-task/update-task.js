import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import customStyle from "./update-task.module.css";

function UpdateTask() {
  const [employeeTask, setTask] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let employeeId = localStorage.getItem("employeeId");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");

  console.log(employeeData);
  console.log(userName);

  //get all tasks
  async function getTask() {
    try {
      let resp = await axios({
        method: "get",
        url: `http://localhost:4000/getTaskById/${employeeId}`,
      });

      if (resp.data.data) {
        setTask(resp.data.data);
      }

      let resp2 = await axios({
        method: "get",
        url: "http://localhost:4000/employeeList",
      });

      if (resp2.data.data) {
        setEmployeeData(resp2.data.data);
      }
      // console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  //Update a Task by projectCode
  async function updateTask() {
    try {
      let resp3 = await axios({
        method: "put",
        url: `http://localhost:4000/updateTask/${projectCode}/${employeeId}`,
        data: {
          status,
          description,
          spendTime: duration,
          DM_To: user,
        },
      });

      if (resp3.data.status == true) {
        // setTask(resp3.data.data);
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        const reload = window.location.reload();
        setTimeout(reload, 2000);
      }
      console.log(resp3);
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

  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="contain-table">
        <div className={customStyle.dateContainer}>
          <div className={customStyle}>Date: {moment().format("LLL")} </div>
          <div>
            {userName}({userId})
          </div>
        </div>
        {/* <hr></hr> */}
        <table className="striped-table">
          <thead>
            <tr>
              <th>Att</th>
              <th>Project Code</th>
              <th>Description</th>
              <th>Status</th>
              <th>Duration(hr)</th>
              <th>DM Also</th>
              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeTask.length > 0 ? (
              // employeeTask.map((task, index) => (
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      // checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    ></label>
                  </div>{" "}
                </td>
                {/* <td>{task.employeeId}</td> */}
                <td>
                  <select className={customStyle.projectCode}
                    defaultValue="n/a"
                    onChange={(e) => setProjectCode(e.target.value)}
                  >
                    <option value="n/a"> n/a </option>
                    {employeeTask.map((option, index) => (
                      <option key={index} value={option.projectCode}>
                        {option.projectCode}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    // id="description"
                    type="text"
                    name="description"
                    className={customStyle.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                  />
                </td>

                <td>
                  <select  
                    className={customStyle.status}
                    onChange={(e) => setStatus(e.target.value)}>
                    {options1.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td >
                  <div className={customStyle.duration}>
                    <input
                      type="text"
                      
                      name="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Time"
                    />{" "}
                  </div>
                </td>

                <td>
                  <select 
                    className={customStyle.dmTo}

                    defaultValue="n/a"
                    onChange={(e) => setUserName(e.target.value)}
                  >
                    <option value="n/a"> n/a </option>
                    {employeeData.map((option, index) => (
                      <option key={index} value={option.firstName}>
                        {option.firstName}
                      </option>
                    ))}
                  </select>
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
            ) : (
              // ))
              <tr>
                <td colSpan={7}>No Project</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <hr></hr>
      </div>
      <div className="contain-table">
        <table className="striped-table">
          <tbody>
            {employeeTask.length > 0 ? (
              employeeTask.map((task, index) => (
                <tr key={index}>
                  <td className={customStyle.sl}>{index + 1}</td>
                  <td className={customStyle.projectCode}>
                    {
                      <Link
                        to="/project"
                        onClick={() =>
                          localStorage.setItem("projectCode", task.projectCode)
                        }
                      >
                        {task.projectCode}
                      </Link>
                    }
                  </td>
                  <td className={customStyle.desc}>{task.description}</td>
                  <td className={customStyle.status}>{task.status} </td>
                  <td className={customStyle.duration}>{task.spendTime} </td>
                  <td className={customStyle.dmTo}>{task.DM_To}</td>
                  {/* <td></td> */}
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
    </>
  );
}

export default UpdateTask;
