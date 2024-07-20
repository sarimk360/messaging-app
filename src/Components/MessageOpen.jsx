/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import "./MessageOpen.css";

const MessageOpen = ({ sendDataToParent, receivedDataFromList }) => {
  const [currentMessage, setCurrentMessage] = useState(receivedDataFromList);
  const [inputMessage, setInputMessage] = useState("");

  const backToEmailList = () => {
    sendDataToParent();
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessage.messages, receivedDataFromList]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

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
    };
    setCurrentMessage((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessage],
    }));
    setInputMessage("");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action of the Enter key (such as form submission)
      sendMessage();
    }
  };

  return (
    <div className="new-message-container">
      <div className="back-rightMenu">
        <div className="back-name-label-container">
          <span className="icon-back-button" onClick={backToEmailList}></span>
          <div className="name">{currentMessage.name}</div>
          <div
            className={`${currentMessage.desc.label ? "label" : ""} ${
              currentMessage.desc.label ? currentMessage.desc.label : ""
            }`}
          >
            {currentMessage.desc.label}
          </div>
        </div>
        <div className="rightMenu-icons">
          <div className="item">
            <span className="icon-print"></span>
          </div>
          <div className="item">
            <span className="icon-star-clicked"></span>
          </div>
          <div className="item">
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
                    <div className="time-more-container">
                      <div className="time">{item.time}</div>
                      <div className="more-container">
                        <div className="more"></div>
                        <div className="more"></div>
                        <div className="more"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {item.type == "receiver" && (
                <div className="receiver-alignment-div">
                  <div className="receiver-text-container">
                    <div className="text">{item.text}</div>
                    <div className="time-more-container">
                      <div className="time">{item.time}</div>
                      <div className="more-container">
                        <div className="more"></div>
                        <div className="more"></div>
                        <div className="more"></div>
                      </div>
                    </div>
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
          <div className="send-button-text">Send</div>
          <span className="icon-send"></span>
        </button>
      </div>
    </div>
  );
};

export default MessageOpen;
