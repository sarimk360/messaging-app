import React, { useState } from "react";
import "./MyEmail.css";
import emailMenuData from "./emailMenuData.json";

const MyEmail = () => {
  const [emailMenu, setEmailmenu] = useState(emailMenuData);

  const handleActive = (item) => {
    const newData = [...emailMenu];
    newData.forEach((element) => {
      if (element.name == item.name) {
        element.isActive = true;
      } else element.isActive = false;
    });
    setEmailmenu(newData);
  };

  return (
    <>
      <div className="email-menu-container">
        <div className="myEmail-heading">My Email</div>
        {emailMenuData.map((item, index) => {
          const isActiveStyle = {
            backgroundColor: item.isActive ? "rgb(231, 238, 255)" : "",
            color: item.isActive ? "rgb(11, 140, 232)" : "",
          };
          return (
            <div
              key={index}
              className="email-menu"
              onClick={() => handleActive(item)}
              style={{ backgroundColor: isActiveStyle.backgroundColor }}
            >
              <div className="left-cont">
                <span
                  className={item.icon}
                  style={{ color: isActiveStyle.color }}
                ></span>
                <div
                  className="menu-item"
                  style={{ color: isActiveStyle.color }}
                >
                  {item.name}
                </div>
              </div>
              <div
                className="item-count"
                style={{ color: isActiveStyle.color }}
              >
                {item.count}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyEmail;
