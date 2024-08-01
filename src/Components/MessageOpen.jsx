/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useContext } from "react";
import "./MessageOpen.css";
import AppContext from "./Context";

const MessageOpen = ({ sendDataToParent, receivedDataFromList }) => {
  const { emailData, selectedMessage, selectMessage, setUpdatedData } =
    useContext(AppContext);
  const [currentMessage, setCurrentMessage] = useState(selectedMessage);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false); // <-- New state for edit mode
  const [editMessageIndex, setEditMessageIndex] = useState(null); // <-- New state for the index of the message being edited
  const [notification, setNotification] = useState("");

  const backToEmailList = () => {
    selectMessage(false);
    const newEmailData = emailData.map((item) => {
      if (item.id === selectedMessage.id) {
        return {
          ...item,
          isFav: currentMessage.isFav,
        };
      }
      return item;
    });
    setUpdatedData(newEmailData);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessage.messages, receivedDataFromList]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    if (editMode) {
      // Check if in edit mode
      // Update the existing message
      setCurrentMessage((prevState) => {
        const updatedMessages = prevState.messages.map((msg, index) =>
          index === editMessageIndex
            ? {
                ...msg,
                time: new Date()
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(":", ".")
                  .toLowerCase(),
                text: inputMessage,
                edited: true,
              } // Set the edited flag to true
            : msg
        );
        return { ...prevState, messages: updatedMessages };
      });
      setEditMode(false); // Exit edit mode
      setEditMessageIndex(null); // Reset the edit message index
    } else {
      // Add a new message
      const newMessage = {
        type: "receiver",
        text: inputMessage,
        time: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(":", ".")
          .toLowerCase(),
        edited: false, // New messages are not edited
      };
      setCurrentMessage((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }));
    }

    setInputMessage("");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action of the Enter key (such as form submission)
      sendMessage();
    }
  };
  const handleStarChange = (currentMessage) => {
    const updatedEmailData = emailData.map((item) =>
      item.id === currentMessage.id
        ? { ...item, isFav: !item.isFav }
        : item
    );
  
    // Update the state with the new emailData
    setUpdatedData(updatedEmailData);
    setCurrentMessage((prevState) => ({
      ...prevState,
      isFav: !prevState.isFav, // Toggle the star status
    }));
  };

  const handleOptions = (index) => {
    setSelectedIndex(index);
  };

  const handleEditMessage = (index) => {
    setInputMessage(currentMessage.messages[index].text); // Set the message text to the input
    setEditMode(true); // Enter edit mode
    setEditMessageIndex(index); // Set the index of the message being edited
    setSelectedIndex(null); // Close options
  };

  const closeOptions = () => {
    setSelectedIndex(null);
    setEditMode(false); // Exit edit mode when options are closed
    setEditMessageIndex(null); // Reset the edit message index
  };

  const handleDeleteMessage = (index) => {
    setCurrentMessage((prevState) => ({
      ...prevState,
      messages: prevState.messages.filter((_, i) => i !== index),
    }));
    setSelectedIndex(null); // Close options
    setNotification("Message has been successfully deleted."); // Set the notification message
    setTimeout(() => {
      setNotification(""); // Clear the notification message after 3 seconds
    }, 2000);
  };

  return (
    <div className="new-message-container">
      <div className="back-rightMenu">
        <div className="back-name-label-container">
          <span
            className="icon-back-button"
            onClick={() => backToEmailList()}
          ></span>
          <div className="name">{currentMessage.name}</div>
          <div
            className={`${currentMessage.desc.label ? "label" : ""} ${
              currentMessage.desc.label ? currentMessage.desc.label : ""
            }`}
          >
            {currentMessage.desc.label}
          </div>

          <div className="item">
            <span
              onClick={() => handleStarChange(currentMessage)}
              className={
                currentMessage.isFav ? "icon-star-clicked" : "icon-star"
              }
            ></span>
          </div>
          {notification && (
            <div className="notification-container">
              <div className="notification">{notification}</div>
            </div>
          )}
        </div>
        <div className="rightMenu-icons">
          <div className="item" title="delete">
            <span className="icon-delete"></span>
          </div>
        </div>
      </div>
      <div className="master-container">
        {currentMessage.messages.map((item, index) => {
          return (
            <div className="text-message-container" key={index}>
              {item.type == "sender" && (
                <div className="image-text-container">
                  <div className="img"></div>
                  <div className="sender-text-container">
                    <div className="text">{item.text}</div>

                    {selectedIndex === index ? (
                      <div className="moreOptions-dots-container">
                        <div
                          className="delete"
                          onClick={() => handleDeleteMessage(index)}
                        >
                          Delete For Me
                        </div>
                        <div className="close-btn" onClick={closeOptions}>
                          X
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="time-more-container">
                          <div className="time">{item.time}</div>

                          <div
                            className="more-container"
                            onClick={() => handleOptions(index)}
                            title="options"
                          >
                            <div className="more"></div>
                            <div className="more"></div>
                            <div className="more"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {item.type == "receiver" && (
                <div className="receiver-alignment-div">
                  <div className="receiver-text-container">
                    <div className="text">{item.text}</div>

                    {selectedIndex === index ? (
                      <div className="moreOptions-dots-container">
                        <div
                          className="edit"
                          onClick={() => handleEditMessage(index)}
                        >
                          Edit
                        </div>
                        <div
                          className="delete"
                          onClick={() => handleDeleteMessage(index)}
                        >
                          Delete
                        </div>
                        <div className="close-btn" onClick={closeOptions}>
                          X
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="time-more-container">
                          {item.edited && (
                            <div className="edited">Text Message Edited</div>
                          )}
                          <div className="time">{item.time}</div>

                          <div
                            className="more-container"
                            onClick={() => handleOptions(index)}
                            title="options"
                          >
                            <div className="more"></div>
                            <div className="more"></div>
                            <div className="more"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send-message-main-container">
        <span className="icon-audio"></span>
        <input
          type="text"
          placeholder="Write Message"
          className="input-message"
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
          onKeyDown={handleKeyDown}
        ></input>
        <span className="icon-clip"></span>
        <span className="icon-add-image"></span>
        <button className="send-button-container" onClick={sendMessage}>
          <div
            className="send-button-text"
            onClick={() => handleEventEdited(e)}
          >
            {editMode ? "Update" : "Send"}
          </div>
          <span className="icon-send"></span>
        </button>
      </div>
    </div>
  );
};

export default MessageOpen;
