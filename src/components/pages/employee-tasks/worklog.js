import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WorkLog() {
  const [employeeTask, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // console.log(employeeTask);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  },[]);
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
