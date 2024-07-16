/* eslint-disable react/prop-types */
import React from "react";
import "./DashboardLeft.css";
import MyEmail from "./MyEmail";
import Label from "./Label";

const DashboardLeft = ({ onLabelSelect }) => {
  
  return (
    <>
      <div className="dashboard-left">
        <button className="compose-btn">+ Compose</button>
        <MyEmail />
        <Label onLabelSelect={onLabelSelect}/>
      </div>
    </>
  );
};

export default DashboardLeft;
