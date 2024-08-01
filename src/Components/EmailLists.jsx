/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./EmailLists.css";
import { useContext } from "react";
import AppContext from "./Context";

const EmailLists = ({ selectedItem }) => {
  const { emailData, setUpdatedData, selectMessage, label } =
    useContext(AppContext);

  const [state, setState] = useState({
    emailLists: [],
    searchResults: [],
    delete: [],
    searchQuery: "",
    selectedLabels: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState("");

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailLists: emailData,
      searchResults: emailData,
      delete: emailData,
    }));
  }, [emailData]);

  useEffect(() => {
    handleSearch();
  }, [state.searchQuery, state.emailLists]);

  useEffect(() => {
    if (selectedItem) {
      selectedItemToggle();
    }
  }, [selectedItem, emailData]);

  useEffect(() => {
    if (label) {
      selectedLabelToggle(label);
    }
  }, [label]);

  const handleCheckboxChange = (data) => {
    // General checkbox update

    const newData = state.searchResults.map((item) =>
      item.id === data.id ? { ...item, isChecked: !item.isChecked } : item
    );

    // Update the state
    setState((prevState) => ({
      ...prevState,
      emailLists: newData,
      searchResults: newData,
    }));
  };
  const handleStarChange = (data) => {
    const newData = state.emailLists.map((item) =>
      item.id === data.id ? { ...item, isFav: !item.isFav } : item
    );
    setUpdatedData(newData);
    if (selectedItem?.name === "Starred") {
      setState((prevState) => ({
        ...prevState,
        searchResults: newData.filter((item) => item.isFav),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        emailLists: newData,
      }));
    }
    selectedItemToggle();
  };

  const handleDelete = () => {
    let updatedEmailLists = state.emailLists.map((item) => ({
      ...item,
      delete: item.isChecked,
    }));
    // setUpdatedData(updatedEmailLists);

    const deletedCount = updatedEmailLists.filter((item) => item.delete).length;
    const newData = updatedEmailLists.filter((item) => !item.delete);
    setState((prevState) => ({
      ...prevState,
      emailLists: newData,
      searchResults: newData,
      delete: updatedEmailLists,
    }));

    selectedItemToggle();
    setSelectAll(false);
    if (deletedCount > 0) {
      setDeleteNotification(
        deletedCount === 1
          ? "1 Item successfully sent to Bin"
          : `${deletedCount} Items successfully sent to Bin`
      );
      setTimeout(() => {
        setDeleteNotification("");
      }, 3000);
    }
  };

  const handleSearch = () => {
    const query = state.searchQuery.toLowerCase().trim();
    if (!query) {
      setState((prevState) => ({
        ...prevState,
        searchResults: state.emailLists,
      }));
    } else {
      const filteredEmails = state.emailLists.filter((item) =>
        [item.desc.label, item.name, item.desc.text, item.time].some((field) =>
          field.toLowerCase().includes(query)
        )
      );
      setState((prevState) => ({
        ...prevState,
        searchResults: filteredEmails,
      }));
    }
  };

  const handleSearchInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      searchQuery: event.target.value,
    }));
  };

  const handleSelectAllChange = (labels) => {
    const newSelectAllStatus = !selectAll;
    setSelectAll(newSelectAllStatus);

    const selectedLabels = labels
      .filter((label) => label.isSelected)
      .map((label) => label.name);

    //filtering the elements that are already selected in the list and deleted

    let newResults = selectedLabels
      .filter((item) => !item.isChecked)
      .map((item) => ({
        ...item,
        isChecked: newSelectAllStatus,
      }));
    setState((prevState) => ({
      ...prevState,
      emailLists: newResults,
      searchResults: newResults,
    }));
  };

  const selectedLabelToggle = (labels) => {
    // Get the names of selected labels
    const selectedLabels = labels
      .filter((label) => label.isSelected)
      .map((label) => label.name);

    // If no labels are selected, return the full email list
    if (selectedLabels.length === 0) {
      setState((prevState) => ({
        ...prevState,
        searchResults: state.emailLists,
      }));
      return;
    }

    // Filter the email list based on selected labels
    const newData = state.emailLists.filter((item) =>
      selectedLabels.includes(item.desc.label)
    );

    setState((prevState) => ({
      ...prevState,
      searchResults: newData,
    }));
  };

  const selectedItemToggle = () => {
    if (!selectedItem) return;
    const { name } = selectedItem;
    if (name === "Inbox") {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.emailLists,
      }));
    } else if (name === "Starred") {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.emailLists.filter((item) => item.isFav),
      }));
    } else if (name === "Bin") {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.delete
          .map((item) => ({ ...item, isChecked: false }))
          .filter((item) => item.delete),
      }));
    }
  };

  const handleSelectMessage = (item) => {
    selectMessage(item);
  };

  return (
    <>
      <div className="dashboard-right-container">
        <div className="search-rightMenu">
          <div className="search-mail-container">
            <div className="search-icon-div">
              <span className="icon-search"></span>
            </div>
            <input
              type="text"
              placeholder="Search mail"
              className="search-input"
              onChange={handleSearchInputChange}
              value={state.searchQuery}
            />
          </div>
          {deleteNotification && (
            <div className="delete-notification">{deleteNotification}</div>
          )}
          <div className="rightMenu">
            <div className="item">
              <input
                type="checkbox"
                className="select-all-checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                title="Select All"
              />
            </div>
            <div className="item">
              <span className="icon-delete" onClick={handleDelete}></span>
            </div>
          </div>
        </div>
        <div className="email-container">
          {state.searchResults.length === 0 ? (
            <div className="no-result-container">
              <div className="no-results-found">No results found</div>
            </div>
          ) : (
            <table>
              <tbody>
                {state.searchResults.map((item, index) => (
                  <tr
                    key={index}
                    className={item.isChecked ? "checked" : ""}
                    style={{
                      backgroundColor: item.isChecked
                        ? "#f3f7ff"
                        : "transparent",
                    }}
                  >
                    <td className="check-box">
                      <input
                        className="email-checkbox"
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(item, index)}
                        style={{
                          accentColor: item.isChecked ? "black" : "transparent",
                        }}
                      />
                    </td>
                    <td className="icon-star-container">
                      <span
                        className={
                          item.isFav ? "icon-star-clicked" : "icon-star"
                        }
                        onClick={() => handleStarChange(item)}
                      ></span>
                    </td>
                    <td
                      className="name"
                      onClick={() => handleSelectMessage(item)}
                    >
                      {item.name}
                    </td>
                    <td
                      className="label-text-container"
                      onClick={() => handleSelectMessage(item)}
                    >
                      <div
                        className={`${item.desc.label ? "label" : ""} ${
                          item.desc.label ? item.desc.label : ""
                        }`}
                      >
                        {item.desc.label}
                      </div>
                      <div className="text">{item.desc.text}</div>
                    </td>

                    <td
                      className="time"
                      onClick={() => handleSelectMessage(item)}
                    >
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailLists;
