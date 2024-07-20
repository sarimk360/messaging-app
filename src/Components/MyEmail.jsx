/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./MyEmail.css";
// import emailMenuData from "./emailMenuData.json";
import axios from "axios";

const MyEmail = ({ onItemSelect }) => {
  const [emailMenu, setEmailMenu] = useState([]);
  const [folders, setFolders] = useState([]);
  const [emails, setEmails] = useState([]);

  // Fetch folder data
  useEffect(() => {
    axios
      .get("http://localhost:3000/folders")
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the folder data", error);
      });
  }, []);

  // Fetch email data
  useEffect(() => {
    axios
      .get("http://localhost:3000/emails")
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching email data", error);
      });
  }, []); // Only fetch emails once

  // Update folder counts when emails or folders change
  useEffect(() => {
    if (folders.length > 0 && emails.length > 0) {
      const counts = {
        Inbox: emails.filter((email) => !email.delete).length,
        Starred: emails.filter((email) => email.isFav).length,
        Bin: emails.filter((email) => email.delete).length,
      };

      const updatedFolders = folders.map((folder) => ({
        ...folder,
        count: counts[folder.name] || 0,
      }));

      setEmailMenu(updatedFolders);
    }
  }, [folders, emails]); // Add both `folders` and `emails` as dependencies

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
