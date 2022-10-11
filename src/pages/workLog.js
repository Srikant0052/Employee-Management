import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-dropdown-select";

function WorkLog({ handleEdit }) {
  const [employeeTask, setTask] = useState("");
  const [value, setValues] = useState("");
  // console.log(employeeTask);
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

  let options1 = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

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
            <th>End Time</th>
            <th>
              Status
              {/* <Select
                options={options}
                onChange={(value) => this.setValues(value)}
              /> */}
            </th>
            <th>Time Taken</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeTask.length > 0 ? (
            employeeTask.map((task, i) => (
              <tr key={task.employeeId}>
                <td>{i + 1}</td>
                <td>{task.employeeId}</td>

                {/* <td>{task.projectCode}</td> */}
                <td>
                <Select
                    options={task.projectCode}
                    
                  />
                </td>
                <td>{task.description}</td>
                <td>{task.startingTime}</td>
                <td>{task.endingTime} </td>
                <td>
                  <Select
                    options={options1}
                    onChange={(value) => (value)}
                  />
                </td>
                {/* <td>{task.status} </td> */}
                <td>{task.spendTime} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employeeTask, task.employeeId)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkLog;
