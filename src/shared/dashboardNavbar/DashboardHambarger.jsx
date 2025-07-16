import React, {  useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import DashboardResponsiveDrawer from "./DashboardResponsiveDrawer";

const DashboardHambarger = () => {

  const [active, setActive] = useState(false); // ✅ drawer state
  const dropdownRef = useRef(null);

  // toggle drawer
  const handleHambargar = () => setActive((prev) => !prev);
  const handleHambargarFalse = () => setActive(false);

  // close drawer when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
   <>
     {/* Dashboard Routes */}
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard/all-services"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              All Services
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard/booked-services"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              Booked Services
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard/add-service"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard/manage-service"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              Manage Services
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleHambargarFalse}
              to="/dashboard/service-to-do"
              className={({ isActive }) => (isActive ? "active font-bold" : "")}
            >
              Service To Do
            </NavLink>
          </li>
   </>
  );

  return (
    <div ref={dropdownRef}>
      <DashboardResponsiveDrawer
        active={active}
        handleHambargar={handleHambargar}
        links={links}
      />
    </div>
  );
};

export default DashboardHambarger;