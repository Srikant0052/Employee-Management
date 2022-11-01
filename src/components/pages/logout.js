import React from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Logout() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      const reload = window.location.reload();
      setTimeout(reload, 2000);
    }
  }, []);
  // if (!cookies.get("accessToken")) {
  //   <Navigate replace to="/login" />;
  // }

  return <div>{localStorage.clear()}</div>;
}
