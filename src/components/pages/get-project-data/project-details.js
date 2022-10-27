import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import customStyle from "./project-details.module.css";

function ProjectData() {
  const [projectData, setProjectData] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let projectCode = localStorage.getItem("projectCode");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");

  console.log(status);

  //get all tasks
  async function getProjectDetails() {
    try {
      let resp = await axios({
        method: "get",
        url: `http://localhost:4000/getProjectById/${projectCode}`,
      });

      if (resp.data.data) {
        setProjectData(resp.data.data);
      }
      // console.log(resp.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  //Update Project Status
  async function updateProjectStatus() {
    try {
      let resp2 = await axios({
        method: "put",
        url: `http://localhost:4000/${projectCode}`,
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

  useEffect(() => {
    getProjectDetails();
  }, []);
  let options1 = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="contain-table">
        <div className={customStyle.dateContainer}>
          <div>Date: {moment().format("LLL")} </div>
          <div>
            {userName}({userId})
          </div>
        </div>
        <hr></hr>
        <table className="striped-table">
          <thead>
            <tr>
              {/* <th>Att</th> */}
              <th>Project Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>CustomerId</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(projectData).length > 0 ? (
              <tr>
                <td>{projectData.projectCode}</td>
                <td>{projectData.name}</td>
                <td>{projectData.description}</td>
                <td>
                  <select onChange={(e) => setStatus(e.target.value)}>
                    {options1.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{projectData.customerId}</td>
                <td>{projectData.date}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7}>No Project</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn mb-2">Edit</button>&nbsp;
        <button className="btn mb-2">Delete</button>&nbsp;
        <button className="btn mb-2">Add Note</button>&nbsp;
        <button onClick={() => updateProjectStatus()} className="btn mb-2">
          Change Status
        </button>
      </div>
    </>
  );
}

export default ProjectData;
