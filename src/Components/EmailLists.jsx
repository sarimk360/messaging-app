import React, { useState } from "react";
import "./EmailLists.css";
import emailListsContent from "./emailListsContent.json";

const EmailLists = () => {
  const [emailLists, setEmailLists] = useState(emailListsContent);
  const [showArchived, setShowArchived] = useState(true);

  const handleCheckboxChange = (index) => {
    const newData = emailLists.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setEmailLists(newData);
  };
  const handleStarChange = (index) => {
    const newData = emailLists.map((item, i) =>
      i === index ? { ...item, isFav: !item.isFav } : item
    );
    setEmailLists(newData);
  };
  const handleDelete = () => {
    const updatedEmailLists = emailLists.filter((item) => !item.isChecked);
    setEmailLists(updatedEmailLists);
  };
  const handleArchive = () => {
    if (!showArchived) {
      // When showing the archived items, reset the isChecked property
      const newData = emailLists.map((item) => ({ ...item, isChecked: false }));
      setEmailLists(newData);
    }
    setShowArchived(!showArchived);
  };

  const filteredEmailLists = emailLists.filter(
    (item) => showArchived || !item.isChecked
  );
  return (
    <>
      <div className="dashboard-right-container">
        <div className="search-rightMenu">
          <div className="search-mail-container">
            <div className="search--icon-div">
              <span className="icon-search"></span>
            </div>
            <input
              type="text"
              placeholder="Search mail"
              className="search-input"
            />
          </div>
          <div className="rightMenu">
            <div className="item">
              <span className="icon-archive" onClick={handleArchive}></span>
            </div>
            <div className="item">
              <span className="icon-information"></span>
            </div>
            <div className="item">
              <span className="icon-delete" onClick={handleDelete}></span>
            </div>
          </div>
        </div>

        <div className="email-container">
          <table>
            <tbody>
              {filteredEmailLists.map((item, index) => (
                <tr
                  key={index}
                  className={item.isChecked ? "checked" : ""}
                  style={{
                    backgroundColor: item.isChecked ? "#f3f7ff" : "transparent",
                  }}
                >
                  <td className="check-box">
                    <input
                      className="email-checkbox"
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                      style={{
                        accentColor: item.isChecked ? "black" : "transparent",
                      }}
                    />
                  </td>
                  <td className="icon-star-container">
                    <span
                      className={item.isFav ? "icon-star-clicked" : "icon-star"}
                      onClick={() => handleStarChange(index)}
                    ></span>
                  </td>
                  <td className="name">{item.name}</td>
                  <td className="label-text-container">
                    <div
                      className={`${item.desc.label ? "label" : ""} ${
                        item.desc.label ? item.desc.label : ""
                      }`}
                    >
                      {item.desc.label}
                    </div>
                    <div className="text">{item.desc.text}</div>
                  </td>

                  <td className="time">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmailLists;
