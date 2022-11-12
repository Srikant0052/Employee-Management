import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import customStyle from "./worklog.module.css";
import moment from "moment";
import ReactPaginate from "react-paginate";

function WorkLog() {
  const [employeeTask, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(false);
  let [err, setErr] = useState(null);
  const [pageCount, setpageCount] = useState(0);

  const navigate = useNavigate();
  let userName = localStorage.getItem("userName");
  let limit = 13;

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
        url: `https://bworklogtech.herokuapp.com/getTask?limit=${limit}`,
      });

      if (resp.data.data) {
        setTask(resp.data.data);
      }
      const total = resp.data.totalTask;
      setpageCount(Math.ceil(total / limit));
    } catch (error) {
      setErr(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTask();
  }, [limit]);

  const fetchTask = async (currentPage) => {
    try {
      const res = await axios({
        method: "get",
        url: `https://bworklogtech.herokuapp.com/getTask?pageSize=${currentPage}&limit=${limit}`,
      });
      const data = res.data.data;
      // console.log(data);

      return data;
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handlePageClick = async (data) => {
    try {
      let currentPage = data.selected;
      const task = await fetchTask(currentPage);

      setTask(task);
    } catch (error) {
      setErr(error.response.data);
    }
  };

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
        <Link to="/report">Task Report</Link>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Project</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default WorkLog;
