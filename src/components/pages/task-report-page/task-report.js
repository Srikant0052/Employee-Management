import React, { useState, useEffect } from "react";
import customStyle from "./task-report.module.css";
import axios from "axios";
import exportFromJSON from "export-from-json";
import { Link } from "react-router-dom";

export default function TaskReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [dmTo, setDmTo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let [err, setErr] = useState(null);

  let data = [filteredTask];
  const fileName = "task-data";

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  //Get filtered tasks
  async function getFilteredTask() {
    try {
      let resp = await axios({
        method: "get",
        url: `https://backend.worklog.tech/getFilteredTask?startingTime=${fromDate}&toDate=${toDate}&projectCode=${projectCode}&employeeId=${employeeId}&description=${description}&status=${status}&DM_To=${dmTo}&spendTime=${duration}`,
      });

      if (resp.data.data) {
        setFilteredTask(resp.data.data);
      }
    } catch (error) {
      setErr(error.response.data);
    }
  }

  async function getFilterData() {
    try {
      let resp2 = await axios({
        method: "get",
        url: "https://backend.worklog.tech/employeeList",
      });

      if (resp2.data.data) {
        setEmployeeData(resp2.data.data);
      }

      let resp3 = await axios({
        method: "get",
        url: "https://backend.worklog.tech/getAllProject",
      });

      if (resp3.data.data) {
        setProjectData(resp3.data.data);
      }
    } catch (error) {
      setErr(error.response.data);
      // console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getFilterData();
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
      <Link to="/"> Go Back</Link>
    </div>
  ) : (
    <React.Fragment>
      <div className={customStyle.search}>
        {filteredTask && filteredTask.length > 0 ? (
          <div className={customStyle.stripedTable}>
            <div>
              <u>Task Report</u>
            </div>
            <div style={{ textAlign: "end" }}>
              Export{" "}
              <button
                className="btn btn-secondary buttons-excel buttons-html5"
                type="button"
                onClick={() => exportExcel()}
              >
                <span>Excel</span>
              </button>
              {/* <button
              className="btn btn-secondary buttons-excel buttons-html5"
              type="button"
              onClick={() => exportCSV()}
            >
              <span>CSV</span>
            </button> */}
            </div>
            <table className={customStyle.stripedTable}>
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
                </tr>
              </thead>
              <tbody>
                {filteredTask.length > 0 ? (
                  filteredTask.map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task.employeeId}</td>
                      <td>{task.projectCode}</td>
                      <td>{task.taskId}</td>
                      <td>{task.description}</td>
                      <td>{task.startingTime}</td>
                      <td>{task.status} </td>
                      <td>{task.spendTime} </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No Task</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Link to="/">Go Back</Link>
          </div>
        ) : (
          <div>
            <div>
              <u>Task Report</u>
            </div>
            <div className={customStyle.filter}>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8" style={{ display: "flex" }}>
                  <label htmlFor="fromDate">Date:</label>
                  <input
                    id="fromDate"
                    type="date"
                    name="fromDate"
                    className={customStyle.date}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />

                  <label htmlFor="toDate">To:</label>
                  <input
                    id="toDate"
                    type="date"
                    name="toDate"
                    className={customStyle.date}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div className="col-2"></div>
              </div>
            </div>
            <hr></hr>
            <div className={customStyle.input1}>
              <label htmlFor="projectCode">Project Code:</label>
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
              <label htmlFor="employeeId">User ID:</label>
              <select
                className={customStyle.employeeId}
                defaultValue="n/a"
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="n/a"> n/a </option>
                {employeeData.map((option, index) => (
                  <option key={index} value={option.employeeId}>
                    {option.userName}
                  </option>
                ))}
              </select>
              <label htmlFor="duration">Duration:</label>
              <input
                id="duration"
                type="text"
                // ref={textInput}
                name="duration"
                className={customStyle.duration}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration"
              />
            </div>
            <div className={customStyle.input2}>
              <label htmlFor="status">Status:</label>
              <select
                className={customStyle.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Select"> Select..</option>
                {options1.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label htmlFor="dmTo">DM Also:</label>
              <select
                className={customStyle.dmAlso}
                defaultValue="n/a"
                onChange={(e) => setDmTo(e.target.value)}
              >
                <option value="n/a"> n/a </option>
                {employeeData.map((option, index) => (
                  <option key={index} value={option.userName}>
                    {option.userName}
                  </option>
                ))}
              </select>

              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                // ref={textInput}
                name="description"
                className={customStyle.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => getFilteredTask()}
            >
              Search
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
