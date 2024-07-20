/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./EmailLists.css";
// import emailListsContent from "./emailListsContent.json";
import axios from "axios";

const EmailLists = ({ selectedItem, selectedLabel, sendDataToParent }) => {
  const [state, setState] = useState({
    emailLists: [],
    searchQuery: "",
    searchResults: [],
    showStarredOnly: false,
    delete: [],
  });
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/emails").then((response) => {
      setState((prevState) => ({
        ...prevState,
        emailLists: response.data,
        searchResults: response.data,
        delete: response.data,
      }));
    });
  }, []);

  useEffect(() => {
    state.emailLists.forEach((item) => {
      item.id = new Date();
    });
    handleSearch();
  }, [state.searchQuery, state.showStarredOnly, state.emailLists]);

  const handleCheckboxChange = (data) => {
    const newData = state.emailLists.map((item) =>
      item.id == data.id ? { ...item, isChecked: !item.isChecked } : item
    );

    setState((prevState) => ({
      ...prevState,
      searchResults: newData,
      emailLists: newData,
    }));
  };

  const handleStarChange = (data) => {
    const newData = state.emailLists.map((item, i) =>
      item.id == data.id ? { ...item, isFav: !item.isFav } : item
    );
    if (selectedItem?.name == "Starred") {
      const newSearchData = newData.filter((item) => {
        return item.isFav == true;
      });
      setState((prevState) => ({
        ...prevState,
        searchResults: newSearchData,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        emailLists: newData,
      }));
    }
  };

  const handleDelete = () => {
    const updatedEmailLists = state.emailLists.map((item) => ({
      ...item,
      delete: item.isChecked,
    }));
    const newData = updatedEmailLists.filter((item) => !item.delete);

    setState((prevState) => ({
      ...prevState,
      emailLists: newData,
      searchResults: newData,
      delete: updatedEmailLists,
    }));
  };

  const handleSearch = () => {
    const query = state.searchQuery.toLowerCase().trim();

    if (!query) {
      setState((prevState) => ({
        ...prevState,
        searchResults: state.emailLists,
      }));
    } else {
      const filteredEmails = state.emailLists.filter((item) => {
        return (
          item.desc.label.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.desc.text.toLowerCase().includes(query) ||
          item.time.toLowerCase().includes(query)
        );
      });
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

  const selectMessage = (item) => {
    sendDataToParent(item);
  };
  const handleSelectAllChange = () => {
    const newSelectAllStatus = !selectAll;
    setSelectAll(newSelectAllStatus);
    const newResults = state.emailLists.map((item) => ({
      ...item,
      isChecked: newSelectAllStatus,
    }));
    setState({ ...state, emailLists: newResults });
  };

  useEffect(() => {
    if (selectedLabel && Array.isArray(selectedLabel)) {
      selectedLabelToggle(selectedLabel);
    }
  }, [selectedLabel]);

  const selectedLabelToggle = (selectedLabel) => {
    if (!selectedLabel) {
      return;
    }
    let newData = [];
    let flag = 0;
    selectedLabel.forEach((element) => {
      if (element.isSelected) {
        flag = 1;
      }
      state.emailLists.forEach((item) => {
        if (item.desc.label === element.name && element.isSelected) {
          newData.push(item);
        }
      });
    });
    if (flag) {
      setState((prevState) => ({
        ...prevState,
        searchResults: newData,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        searchResults: state.emailLists,
      }));
    }
  };

  useEffect(() => {
    if (selectedItem) {
      selectedItemToggle(selectedItem);
    }
  }, [selectedItem]);

  const selectedItemToggle = () => {
    if (selectedItem.name == "Inbox") {
      setState((prevState) => ({
        ...prevState,
        searchResults: state.emailLists,
      }));
    } else if (selectedItem.name == "Starred") {
      const newData = state.emailLists.filter((item) => {
        return item.isFav == true;
      });
      setState((prevState) => ({
        ...prevState,
        searchResults: newData,
      }));
    } else if (selectedItem.name === "Bin") {
      const updatedEmailLists = state.delete.map((item) => ({
        ...item,
        isChecked: false,
      }));
      const newData = updatedEmailLists.filter((item) => item.delete === true);

      setState((prevState) => ({
        ...prevState,
        searchResults: newData,
      }));
    }
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
                    <td className="name" onClick={() => selectMessage(item)}>
                      {item.name}
                    </td>
                    <td
                      className="label-text-container"
                      onClick={() => selectMessage(item)}
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

                    <td className="time" onClick={() => selectMessage(item)}>
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
