/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./Label.css";
// import labelMenuData from "./labelMenuData.json";
import axios from "axios";

const Label = ({ onLabelSelect }) => {
  const [labelState, setLabelState] = useState([]);

  useEffect(() => {
    // Fetch labels from the JSON server
    axios
      .get("http://localhost:3000/labels")
      .then((response) => {
        setLabelState(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the labels!", error);
      });
  }, []);

  const selectingLabel = (data) => {
    const newSelectedLabel = labelState.map((item) =>
      data.id == item.id ? { ...item, isSelected: !item.isSelected } : item
    );
    setLabelState(newSelectedLabel);
    onLabelSelect(newSelectedLabel);
  };

  return (
    <>
      <div className="label-list-container">
        <div className="label-heading">Label</div>
        {labelState.map((item, index) => {
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
