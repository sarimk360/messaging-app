import React from "react";
import "./DashboardLeft.css";
import MyEmail from "./MyEmail";
import Label from "./Label";

const DashboardLeft = () => {
  return (
    <>
      <div className="dashboard-left">
        <button className="compose-btn">+ Compose</button>
        <MyEmail />
        <Label />
      </div>
    </>
  );
};

export default DashboardLeft;
