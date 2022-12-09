import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import customStyle from "./add-task.module.css";
import moment from "moment";
import Cookies from "universal-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask() {
  const [employeeTask, setTask] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("0");
  const [projectCode, setProjectCode] = useState("");
  const [status, setStatus] = useState("Pend");
  const [email, setEmail] = useState("n/a");
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  let [err, setErr] = useState(null);
  const [date, setDate] = useState(new Date());
  const cookies = new Cookies();

  let token = cookies.get('accessToken');
  // console.log(token)

  let employeeId = localStorage.getItem("employeeId");
  let userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  let limit = 10;
  let dateTime = moment().format("L, LT");
  // let dateT = moment().format("L");
  // console.log(dateT)

  let emp = employeeData.filter((employee) => employee.email === email);

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
        url: `https://backend.worklog.tech/getTaskById/${employeeId}?limit=${limit}`,
      });

      if (resp.data.data) {
        setTask(resp.data.data);
      }
      const total = resp.data.count;
      setpageCount(Math.ceil(total / limit));

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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  const fetchTask = async (currentPage) => {
    try {
      const res = await axios({
        method: "get",
        url: `https://backend.worklog.tech/getTaskById/${employeeId}?pageSize=${currentPage}&limit=${limit}`,
      });
      const data = res.data.data;

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

  //Add a Task
  async function addTask() {
    if (!projectCode || !description) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newTask = {
      employeeId,
      projectCode,
      description,
      spendTime: duration,
      token,
      status,
      date: dateTime ? dateTime : date,
      DM_To: emp && emp.length == 1 ? emp[0]["userName"] : "n/a",
      toMail: email,
    };

    try {
      let resp3 = await axios({
        method: "post",
        url: `https://backend.worklog.tech/addTask`,
        data: {
          ...newTask,
        },
      });

      if (resp3.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        const reload = window.location.reload();
        setTimeout(reload, 2000);
      }
      console.log(resp3);
    } catch (error) {
      setErr(error.response.data);
    }
  }

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
      {/* <Link to="/addTask">Go Back</Link> */}
      Please Refresh the Page!
    </div>
  ) : (
    <>
      <div className={customStyle.containTable}>
        <div className={customStyle.dateContainer}>
          <div className={customStyle.date}>
            Date:
            {<DatePicker selected={date} onChange={(date) => setDate(date)} />}
          </div>
          <Link
            to="/user"
            onMouseEnter={() => setDisplayed(true)}
            onMouseLeave={() => setDisplayed(false)}
          >
            {userName}
            {displayed && <div>Go to Profile</div>}
          </Link>
        </div>
        <table className="striped-table">
          <thead>
            <tr>
              <th>Att</th>
              <th>Project Code</th>
              <th>Description</th>
              <th>Status</th>
              <th>Duration(hr)</th>
              <th>DM Also</th>
            </tr>
          </thead>
          <tbody>
            {projectData.length > 0 ? (
              <tr>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    ></label>
                  </div>{" "}
                </td>
                <td>
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
                </td>
                <td>
                  <textarea
                    type="text"
                    name="description"
                    className={customStyle.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                    rows={1}
                  ></textarea>
                </td>

                <td>
                  <select
                    className={customStyle.status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {options1.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className={customStyle.duration}>
                    <input
                      type="text"
                      name="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Time"
                      inputMode="NumberFormat"
                    />{" "}
                  </div>
                </td>

                <td>
                  <select
                    className={customStyle.dmTo}
                    defaultValue="n/a"
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <option value="n/a"> n/a </option>
                    {employeeData.map((option, index) => (
                      <option key={index} value={option.email}>
                        {option.userName}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-right">
                  <button onClick={() => addTask()} className="btn btn-primary">
                    Submit
                  </button>
                </td>
              </tr>
            ) : (
              // ))
              <tr>
                <td colSpan={7}>No Project</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <hr></hr>
      </div>
      <div className="Row">
        <div className={customStyle.containTable}>
          <table className="striped-table">
            <tbody>
              {employeeTask.length > 0 ? (
                employeeTask.map((task, index) => (
                  <tr key={index}>
                    <td className={customStyle.sl}>
                      {
                        <Link
                          to="/task"
                          onClick={() =>
                            localStorage.setItem("taskId", task.taskId)
                          }
                          // placeholder={"fgdgyfvghguhg"}
                          // onMouseEnter={() => setDisplayed(true)}
                          // onMouseLeave={() => setDisplayed(false)}
                        >
                          {task.taskId}
                        </Link>
                      }
                    </td>
                    {/* {displayed && <div>See Task.</div>} */}
                    <td className={customStyle.projectCode}>
                      {task.projectCode}
                    </td>
                    <td className={customStyle.desc}>{task.description}</td>
                    <td className={customStyle.status}>{task.status} </td>
                    <td className={customStyle.duration}>{task.spendTime} </td>
                    <td className={customStyle.dmTo}>{task.DM_To}</td>
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
    </>
  );
}

export default AddTask;
