import React from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Logout() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  cookies.remove("accessToken", { path: "/", domain: "worklog.tech" });
  cookies.remove("userRole", { path: "/", domain: "worklog.tech" });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      const reload = window.location.reload();
      setTimeout(reload, 2000);
    }
  }, []);

  return <div>{localStorage.clear()}</div>;
}
