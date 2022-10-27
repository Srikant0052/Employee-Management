import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import customStyle from './login.module.css'

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: {
          email: user,
          password,
        },

        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
      });
      // console.log(response.data.data);
      const accessToken = response?.data?.token;
      // console.log(accessToken);
      localStorage.setItem("userName", response.data.data.firstName);
      localStorage.setItem("userId", response.data.data.userName);
      localStorage.setItem("employeeId", response.data.data.employeeId);
      localStorage.setItem("accessToken", response?.data?.token);
      // const roles = response?.data?.roles;
      // setAuth({ user, password,  accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      // console.log(err)
    }
  };

  if (success == true) {
    Swal.fire({
      icon: "success",
      title: "Login Successfully!",
      showConfirmButton: true,
      timer: 2000,
    });
    const reload = window.location.reload();
    setTimeout(reload, 2000);
    return nav("/updatetask");
  }
  return (
    <>
    <div className={customStyle.form}>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          {/* <p>
            <Link to="/user">Go to Profile</Link>
          </p> */}
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
      </div>
    </>
  );
};

export default Login;
