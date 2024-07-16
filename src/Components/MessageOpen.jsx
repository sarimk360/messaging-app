/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./MessageOpen.css";
import emailListsContent from "./emailListsContent.json";

const MessageOpen = ({ sendDataToParent, receivedDataFromList }) => {
  const [emailLists, setEmailLists] = useState(emailListsContent);
  const backToEmailList = () => {
    sendDataToParent();
  };
  useEffect(() => {
    console.log(receivedDataFromList);
  }, [receivedDataFromList]);

  return (
    <div className="new-message-container">
      <div className="back-rightMenu">
        <div className="back-name-label-container">
          <span className="icon-back-button" onClick={backToEmailList}></span>
          <div className="name">{receivedDataFromList.name}</div>
          <div
            className={`${receivedDataFromList.desc.label ? "label" : ""} ${
              receivedDataFromList.desc.label
                ? receivedDataFromList.desc.label
                : ""
            }`}
          >
            {receivedDataFromList.desc.label}
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
      {receivedDataFromList.messages.map((item, index) => {
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
      <div className="send-message-main-container">
        <span className="icon-audio"></span>
        <input
          type="text"
          placeholder="Write Message"
          className="input-message"
        ></input>
        <span className="icon-clip"></span>
        <span className="icon-add-image"></span>
        <button className="send-button-container">
          <div className="send-button-text">Send</div>
          <span className="icon-send"></span>
        </button>
      </div>
    </div>
  );
};

export default MessageOpen;
