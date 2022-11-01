import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import customStyle from "./add-task.module.css";
import Cookies from "universal-cookie";

function AddTask() {
  const [employeeTask, setTask] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("0");
  const [projectCode, setProjectCode] = useState("");
  const [status, setStatus] = useState("Pending");
  const [user, setUserName] = useState("n/a");
  const [isLoading, setIsLoading] = useState(true);
  let employeeId = localStorage.getItem("employeeId");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  const cookies = new Cookies();
  const navigate = useNavigate();

  // console.log(employeeData);
  // console.log(userName);
  // console.log(cookies.get("accessToken"))
  // if (!cookies.get("accessToken")) {
  //   <Navigate replace to="/login" />;
  // }
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
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

      let resp3 = await axios({
        method: "get",
        url: "http://localhost:4000/getAllProject",
      });

      if (resp3.data.data) {
        setProjectData(resp3.data.data);
      }
      // console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  // console.log(projectData)
  useEffect(() => {
    getTask();
  }, []);

  //Add a Task
  async function addTask() {
    if (!projectCode || !description) {
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
      spendTime: duration,
      status,
      DM_To: user,
    };

    try {
      let resp3 = await axios({
        method: "post",
        url: `http://localhost:4000/addTask`,
        data: {
          ...newTask,
        },
      });

      if (resp3.data.status == true) {
        // setTask(resp3.data.data);
        Swal.fire({
          icon: "success",
          title: "Added Successfully!",
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

  // console.log(status);
  // console.log(projectCode);

  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="col-2"></div>
      <div className="col-10" style={{ width: "80%", marginLeft: "10%" }}>
        <div className="contain-table" style={{ fontSize: "x-small" }}>
          <div className={customStyle.dateContainer}>
            <div className={customStyle}>Date: {moment().format("LLL")} </div>
            <Link>
              {userName}({userId})
            </Link>
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
                {/* <th colSpan={2} className="text-center">
                Actions
              </th> */}
              </tr>
            </thead>
            <tbody>
              {projectData.length > 0 ? (
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
                    <select
                      className={customStyle.projectCode}
                      defaultValue="n/a"
                      onChange={(e) => setProjectCode(e.target.value)}
                    >
                      <option value="n/a"> n/a </option>
                      {projectData.map((option, index) => (
                        <option key={index} value={option.projectCode}>
                          {option.projectCode}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <textarea
                      // id="description"
                      type="text"
                      name="description"
                      className={customStyle.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Project Description"
                      rows={1}
                    ></textarea>
                  </td>

                  <td>
                    <select
                      className={customStyle.status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {options1.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className={customStyle.duration}>
                      <input
                        type="text"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Time"
                        inputMode="NumberFormat"
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
                      onClick={() => addTask()}
                      className="btn btn-primary"
                    >
                      Submit
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
      </div>
      <div className="col-2"></div>

      <div>
        <hr></hr>
      </div>
      <div className="Row">
        <div className="col-2"></div>
        <div className="col-10" style={{ width: "80%", marginLeft: "10%" }}>
          <div className="contain-table" style={{ fontSize: "x-small" }}>
            <table className="striped-table">
              <tbody>
                {employeeTask.length > 0 ? (
                  employeeTask.map((task, index) => (
                    <tr key={index}>
                      <td className={customStyle.sl}>
                        {
                          <Link
                            to="/task"
                            onClick={() =>
                              localStorage.setItem("taskId", task.taskId)
                            }
                          >
                            {task.taskId}
                          </Link>
                        }
                      </td>
                      <td className={customStyle.projectCode}>
                        {task.projectCode}
                      </td>
                      <td className={customStyle.desc}>{task.description}</td>
                      <td className={customStyle.status}>{task.status} </td>
                      <td className={customStyle.duration}>
                        {task.spendTime}{" "}
                      </td>
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
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export default AddTask;
