import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  console.log(selectedEmployee);
  const [status, setStatus] = useState(selectedEmployee.status);
  const [message, setMessage] = useState(selectedEmployee.message);
  const [employeeId, setEmployeeId] = useState(selectedEmployee.employeeId);

  useEffect(() => {
    selectedEmployee.map((e) => {
      setEmployeeId(e.employeeId);
    });
  }, []);
  console.log(employeeId);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!status || !message) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    async function updateData() {
      try {
        let resp = await axios({
          method: "put",
          url: "https://backend.worklog.tech/update",
          data: {
            // ...employee,
            employeeId,
            status,
            message,
          },
        });

        console.log(resp);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    updateData();

    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="status">Status</label>
        <input
          id="status"
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="message">Message</label>
        <input
          id="message"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
