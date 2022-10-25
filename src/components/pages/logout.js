import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function logout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      const reload = window.location.reload();
      setTimeout(reload, 2000);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        onClick={localStorage.clear()}
      >
        logout
      </button>
    </>
  );
}
