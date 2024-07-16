/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./EmailLists.css";
import emailListsContent from "./emailListsContent.json";

const EmailLists = ({ selectedLabel, sendDataToParent }) => {
  const [state, setState] = useState({
    emailLists: emailListsContent,
    searchQuery: "",
    searchResults: emailListsContent,
    showStarredOnly: false,
  });

  useEffect(() => {
    handleSearch();
  }, [state.searchQuery, state.showStarredOnly, selectedLabel]);

  const handleCheckboxChange = (index) => {
    const newData = state.searchResults.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setState((prevState) => ({
      ...prevState,
      searchResults: newData,
      emailLists: newData,
    }));
  };

  const handleStarChange = (index) => {
    const newData = state.searchResults.map((item, i) =>
      i === index ? { ...item, isFav: !item.isFav } : item
    );
    setState((prevState) => ({
      ...prevState,
      searchResults: newData,
      emailLists: newData,
    }));
  };

  const handleDelete = () => {
    const updatedEmailLists = state.searchResults.filter(
      (item) => !item.isChecked
    );
    setState((prevState) => ({
      ...prevState,
      emailLists: updatedEmailLists,
      searchResults: updatedEmailLists,
    }));
  };

  const handleSearch = () => {
    const query = state.searchQuery.toLowerCase().trim();

    if (!query) {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.showStarredOnly
          ? prevState.emailLists.filter((item) => item.isFav)
          : prevState.emailLists,
      }));
      return;
    }

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
      searchResults: prevState.showStarredOnly
        ? filteredEmails.filter((item) => item.isFav)
        : filteredEmails,
    }));
  };

  const handleStarredFilter = () => {
    setState((prevState) => ({
      ...prevState,
      showStarredOnly: !prevState.showStarredOnly,
    }));
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
              <span className="icon-archive"></span>
            </div>
            <div className="item">
              <span
                className="icon-star-clicked"
                onClick={handleStarredFilter}
              ></span>
            </div>
            <div className="item">
              <span className="icon-delete" onClick={handleDelete}></span>
            </div>
          </div>
        </div>
        <div className="email-container">
          {state.searchResults.length === 0 ? (
            <div className="no-results-found">No results found</div>
          ) : (
            <table>
              <tbody>
                {state.searchResults
                  .filter((item) =>
                    selectedLabel ? item.desc.label === selectedLabel : true
                  )
                  .map((item, index) => (
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
                          onChange={() => handleCheckboxChange(index)}
                          style={{
                            accentColor: item.isChecked
                              ? "black"
                              : "transparent",
                          }}
                        />
                      </td>
                      <td className="icon-star-container">
                        <span
                          className={
                            item.isFav ? "icon-star-clicked" : "icon-star"
                          }
                          onClick={() => handleStarChange(index)}
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
