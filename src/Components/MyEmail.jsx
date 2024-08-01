/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import "./MyEmail.css";
// import emailMenuData from "./emailMenuData.json";
import AppContext from "./Context";

const MyEmail = ({ onItemSelect }) => {
  const { emailData, folders } = useContext(AppContext);

  const [emailMenu, setEmailMenu] = useState([]);

  useEffect(() => {
    if (folders.length > 0) {
      const inboxCount = emailData.filter((email) => !email.delete).length;
      const starredCount = emailData.filter((email) => email.isFav).length;
      const binCount = emailData.filter((email) => email.delete).length;

      const updatedFolders = folders.map((folder) => {
        let count = 0;
        if (folder.name === "Inbox") count = inboxCount;
        else if (folder.name === "Starred") count = starredCount;
        else if (folder.name === "Bin") count = binCount;
        return { ...folder, count };
      });

      setEmailMenu(updatedFolders);
    }
  }, [folders, emailData]);

  const handleActive = (item) => {
    const newData = emailMenu.map((element) =>
      element.name === item.name
        ? { ...element, isActive: true }
        : { ...element, isActive: false }
    );
    setEmailMenu(newData);
  };

  const handleListUpdate = (item) => {
    onItemSelect(item);
  };

  const handleClick = (item) => {
    handleActive(item);
    handleListUpdate(item);
  };

  return (
    <>
      <div className="email-menu-container">
        <div className="myEmail-heading">My Email</div>
        {emailMenu.map((item, index) => {
          const isActiveStyle = {
            backgroundColor: item.isActive ? "rgb(231, 238, 255)" : "",
            color: item.isActive ? "rgb(11, 140, 232)" : "",
          };
          return (
            <div
              key={index}
              className="email-menu"
              onClick={() => handleClick(item)}
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
