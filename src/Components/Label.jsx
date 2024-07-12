import React from "react";
import "./Label.css";
import labelMenuData from "./labelMenuData.json";

const Label = () => {
  return (
    <>
      <div className="label-list-container">
        <div className="label-heading">Label</div>
        {labelMenuData.map((item, index) => {
          return (
            <div
              key={index}
              className="label-menu"
              onClick={() => handleLabelClick(item.name)}
            >
              <input
                type="checkbox"
                className="label-icon"
                style={{
                  backgroundColor: item.icon,
                  borderColor: item.icon,
                }}
              />
              <div className="label-title">{item.name}</div>
            </div>
          );
        })}
        <div className="create-label">
          <div className="add-icon">+</div>
          <div className="create-label-text">Create New Label</div>
        </div>
      </div>
    </>
  );
};

export default Label;
