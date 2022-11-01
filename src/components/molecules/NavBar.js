import { Link, useMatch, useResolvedPath, Navigate } from "react-router-dom";
import { NAV_DATA, ADMIN_NAV_DATA } from "../../const";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookies = new Cookies();
  let role = cookies.get("userRole");

  if (!cookies.get("accessToken")) {
    <Navigate replace to="/login" />;
  }

  return (
    <div style={{ fontWeight: "600", fontSize: "medium" }}>
      {role && role === "Admin" ? (
        <nav className="nav">
          <Link to="/" className="site-title" style={{ fontWeight: "600" }}>
            Home
          </Link>
          <ul>
            {ADMIN_NAV_DATA.map(({ path, heading }, index) => {
              return (
                <CustomLink to={path} key={index}>
                  {heading}
                </CustomLink>
              );
            })}
          </ul>
        </nav>
      ) : (
        <nav className="nav">
          <Link to="/addTask" className="site-title"style={{ fontWeight: "600" }}>
            Home
          </Link>
          <ul>
            {NAV_DATA.map(({ path, heading }, index) => {
              return (
                <CustomLink to={path} key={index}>
                  {heading}
                </CustomLink>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
