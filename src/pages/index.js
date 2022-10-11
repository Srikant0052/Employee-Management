import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "./header";
import Dashboard from "./dashboard";
import Add from "./addEmployee";
import Edit from "./updateEmployee";
import AddTask from "./addTask";
import WorkLog from "./workLog";

function Nav() {
  const [employees, setEmployees] = useState(null);
  const [tasks, setTasks] = useState(null);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (employeeData, employeeId) => {
    let id = employeeId;
    console.log(employeeData);
    console.log(id);

    let employee = employeeData.filter(
      (employee) => employee["employeeId"] === id
    );
    console.log(employee);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  // const handleDelete = (id) => {
  //     Swal.fire({
  //         icon: 'warning',
  //         title: 'Are you sure?',
  //         text: "You won't be able to revert this!",
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, delete it!',
  //         cancelButtonText: 'No, cancel!',
  //     }).then(result => {
  //         if (result.value) {
  //             const [employee] = employees.filter(employee => employee.id === id);

  //             Swal.fire({
  //                 icon: 'success',
  //                 title: 'Deleted!',
  //                 text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //             });

  //             setEmployees(employees.filter(employee => employee.id !== id));
  //         }
  //     });
  // }

  return (
    <>
      <div className="container">
        {/* Dashboard */}

        {!isAdding && !isEditing && (
          <div>
            <Header setIsAdding={setIsAdding} />
            <Dashboard
              employees={employees}
              handleEdit={handleEdit}
              // handleDelete={handleDelete}
            />
          </div>
        )}

        {!isAdding && !isEditing && (
          <div>
            <WorkLog
              // employees={employees}
              handleEdit={handleEdit}
              // handleDelete={handleDelete}
            />
          </div>
        )}

        {/* Add */}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
          />
        )}
        {/* AddTask
        {isAdding && (
          <AddTask
            tasks={tasks}
            setTasks={setTasks}
            setIsAdding={setIsAdding}
          />
        )} */}
        {/* Edit */}
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </>
  );
}

export default Nav;
