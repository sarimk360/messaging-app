import React, { useState, useEffect } from "react";
import "./EmailLists.css";
import emailListsContent from "./emailListsContent.json";

const EmailLists = () => {
  const [emailLists, setEmailLists] = useState(emailListsContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(emailListsContent);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, showStarredOnly]);

  const handleCheckboxChange = (index) => {
    const newData = searchResults.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setSearchResults(newData);
    setEmailLists(newData);
  };

  const handleStarChange = (index) => {
    const newData = searchResults.map((item, i) =>
      i === index ? { ...item, isFav: !item.isFav } : item
    );
    setSearchResults(newData);
    setEmailLists(newData);
  };

  const handleDelete = () => {
    const updatedEmailLists = searchResults.filter((item) => !item.isChecked);
    setEmailLists(updatedEmailLists);
    setSearchResults(updatedEmailLists);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      // If no search query, show all emails or only starred if filtered
      if (showStarredOnly) {
        setSearchResults(emailLists.filter((item) => item.isFav));
      } else {
        setSearchResults(emailLists);
      }
      return;
    }

    const filteredEmails = emailLists.filter((item) => {
      return (
        item.desc.label.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.desc.text.toLowerCase().includes(query) ||
        item.time.toLowerCase().includes(query)
      );
    });

    if (showStarredOnly) {
      // Filter starred items from the search results
      setSearchResults(filteredEmails.filter((item) => item.isFav));
    } else {
      setSearchResults(filteredEmails);
    }
  };

  const handleStarredFilter = () => {
    setShowStarredOnly(!showStarredOnly); // Toggle filter state
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
              onChange={handleSearchInputChange}
              value={searchQuery}
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
          {searchResults.length === 0 ? (
            <div className="no-results-found">No results found</div>
          ) : (
            <table>
              <tbody>
                {searchResults.map((item, index) => (
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
                          accentColor: item.isChecked ? "black" : "transparent",
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
          )}
        </div>
      </div>
    </>
  );
};

export default EmailLists;
