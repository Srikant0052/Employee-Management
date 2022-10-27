import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import customStyle from './employee-dashboard.module.css'

function EmployeeDashboard({ employees, handleEdit, handleDelete }) {
  const [employeeData, setEmployeeData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const formatter = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: null
  // });
  // console.log(employeeData);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  },[]);

  async function getEmployeeData() {
    try {
      let resp = await axios({
        method: "get",
        url: "http://localhost:4000/employeeList",
      });

      if (resp.data.data) {
        setEmployeeData(resp.data.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getEmployeeData();
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
            <th>First Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>DOJ</th>
            <th>User Name</th>
            
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeData.length > 0 ? (
            employeeData.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.designation}</td>
                <td>{employee.email}</td>
                <td>{employee.dateOfJoining} </td>
                <td>{employee.userName} </td>
                
                <td className="text-right">
                  <button
                    onClick={() =>
                      handleEdit(employeeData, employee.employeeId)
                    }
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                {/* <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td> */}
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

export default EmployeeDashboard;
