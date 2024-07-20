/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import EmailLists from "./EmailLists";
import MessageOpen from "./MessageOpen";

const DashboardRight = ({ selectedLabel, selectedItem }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const receiveMessage = (data) => {
    setSelectedMessage(data);
  };
  const closeMessageOpen = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      {!selectedMessage && (
        <EmailLists
          selectedItem={selectedItem}
          selectedLabel={selectedLabel}
          sendDataToParent={receiveMessage}
        />
      )}
      {selectedMessage && (
        <MessageOpen
          sendDataToParent={closeMessageOpen}
          receivedDataFromList={selectedMessage}
        />
      )}
    </>
  );
};

export default DashboardRight;
