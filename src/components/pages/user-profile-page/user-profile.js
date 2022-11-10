import React, { useState, useEffect } from "react";
import axios from "axios";
import customStyle from "./user-profile.module.css";
import Swal from "sweetalert2";

function UserProfile() {
  const [user, setUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState(null);

  let employeeId = localStorage.getItem("employeeId");
  let userName = localStorage.getItem("userName");

  //get all tasks
  async function getEmployeeData() {
    try {
      let resp = await axios({
        method: "get",
        url: `https://bworklogtech.herokuapp.com/getEmployee/${employeeId}`,
      });

      // console.log(resp);

      if (resp.data.data) {
        setUser(resp.data.data);
      }
    } catch (error) {
      setErr(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getEmployeeData();
  }, []);

  //Update Password
  async function updatePassword() {
    try {
      let resp2 = await axios({
        method: "put",
        url: `https://bworklogtech.herokuapp.com/update`,
        data: {
          email: user.email,
          oldPassword,
          newPassword,
        },
      });
      if (resp2.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Updated Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
        Text: null;
      }
    } catch (error) {
      setErr(error.response.data);
    }
  }

  if (isLoading) {
    return null;
  }

  return err ? (
    <div>
      <h1>{err.error.message} </h1>
    </div>
  ) : (
    <div className={customStyle.containTable}>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row"></div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "130px" }}
                  />
                  <h5 className="my-3">{user.firstName}</h5>
                  <p className="text-muted mb-1">{user.designation}</p>
                  <p className="text-muted mb-4">{user.address}</p>
                  <div className=" justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Update Password
                    </button>
                    <div className="collapse" id="collapseExample">
                      <label htmlFor="password">
                        Current Password<sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        id="currentpassword"
                        type="password"
                        name="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="password">
                        New Password<sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        id="newpassword"
                        type="password"
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <span className="form-text small text-muted">
                        The password must be 8-20 characters,1 UpperCase, 1
                        LowerCase and 1 Special characters.
                      </span>
                      <label htmlFor="password">
                        Confirm Password<sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        id="confirmpassword"
                        type="text"
                        name="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{marginRight:"3px"}}
                        onClick={() => updatePassword()}
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-primary"
                        value="Reset"
                        onClick={() => history.back()}
                        style={{marginLeft:"3px"}}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Employee Id</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.employeeId}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.mobile}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">User Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.userName}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
