/* eslint-disable react/prop-types */
import React from "react";
import "./DashboardLeft.css";
import MyEmail from "./MyEmail";
import Label from "./Label";

const DashboardLeft = ({ onLabelSelect,onItemSelect }) => {
  return (
    <>
      <div className="dashboard-left-container">
        <div className="dashboard-left">
          <button className="compose-btn">+ Compose</button>
          <div className="myEmail-label-container">
            <MyEmail onItemSelect={onItemSelect}/>
            <Label onLabelSelect={onLabelSelect} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLeft;
