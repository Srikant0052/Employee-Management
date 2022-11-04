import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import customStyle from "./worklog.module.css";
import moment from "moment";

function WorkLog() {
  const [employeeTask, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(false);
  let [err, setErr] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  let userName = localStorage.getItem("userName");
  // let userId = localStorage.getItem("userId")

  //get all tasks
  async function getTask() {
    try {
      let resp = await axios({
        method: "get",
        url: "https://backend.worklog.tech/getTask",
      });

      if (resp.data.data) {
        setTask(resp.data.data);
      }
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

  if (isLoading) {
    return null;
  }

  return err ? (
    <div>
      <h1>{err.error.message} </h1>
    </div>
  ) : (
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
        <h4>Task</h4>
      </u>
      <table className="striped-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Employee ID</th>
            <th>Project Code</th>
            <th>Task ID</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>Status</th>
            <th>Duration(hr)</th>
            {/* <th colSpan={2} className="text-center">
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody>
          {employeeTask.length > 0 ? (
            employeeTask.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.employeeId}</td>
                <td>{task.projectCode}</td>
                <td>{task.taskId}</td>
                <td>{task.description}</td>
                <td>{task.startingTime}</td>
                <td>{task.status} </td>
                <td>{task.spendTime} </td>
                {/* <td className="text-right">
                  <button
                    onClick={() => navigate("/updateTask")}
                    className="button muted-button"
                  >
                    Update Task
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => navigate("/addProject")}
                    className="button muted-button"
                  >
                    Add Project
                  </button>
                </td> */}
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

export default WorkLog;
