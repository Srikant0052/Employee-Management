import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import customStyle from "./login.module.css";
import Cookies from "universal-cookie";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const cookies = new Cookies();

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
        url: "https://bworklogtech.herokuapp.com/login",
        data: {
          email: user,
          password,
        },
      });
      setAccessToken(response?.data?.token);
      cookies.set("accessToken", response.data.token, { path: "/" });
      cookies.set("userRole", response.data.data.role, { path: "/" });
      localStorage.setItem("userName", response.data.data.firstName);
      localStorage.setItem("employeeId", response.data.data.employeeId);
      localStorage.setItem("accessToken", response?.data?.token);

      setRole(response.data.data.role);
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
    }
  };

  if (success == true) {
    Swal.fire({
      icon: "success",
      title: "Login!",
      text: `Login Successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    // const reload = window.location.reload();
    // setTimeout(reload, 1500);
  }
  return (
    <>
      <div className={customStyle.form}>
        {success ? (
          <section>
            {role && role === "Admin" ? (
              <Navigate replace to="/" />
            ) : (
              <Navigate replace to="/addTask" />
            )}
            {/* <h1>You are logged in!</h1> */}
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
            <u>
              <h2
                style={{
                  // marginTop: "30px",
                  // marginBottom: "18px",
                  textAlign: "center",
                }}
              >
                Sign In
              </h2>
            </u>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email:</label>
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
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
