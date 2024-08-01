/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import "./Label.css";
// import labelMenuData from "./labelMenuData.json";
import axios from "axios";
import AppContext from "./Context";
// import AppContext from "./Context";

const Label = () => {
  const { label, setLabelState, setUpdatedData } = useContext(AppContext);

  const selectingLabel = (data) => {
    const newSelectedLabel = label.map((item) =>
      data.id == item.id ? { ...item, isSelected: !item.isSelected } : item
    );
    setLabelState(newSelectedLabel);
  };

  return (
    <>
      <div className="label-list-container">
        <div className="label-heading">Label</div>
        {label.map((item, index) => {
          return (
            <div key={index} className="label-menu">
              <input
                type="checkbox"
                className="label-icon"
                style={{
                  backgroundColor: item.icon,
                  borderColor: item.icon,
                }}
                onChange={() => selectingLabel(item)}
              />
              <div className="label-title">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Label;
