/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EmailLists from "./EmailLists";
import MessageOpen from "./MessageOpen";
import { AppProvider } from "./Context";

const DashboardRight = ({ selectedLabel, selectedItem }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [flag, setFlag] = useState(false);


  const receiveMessage = (data) => {
    setSelectedMessage(data);
    setFlag(true);
  };
  const closeMessageOpen = () => {
    setFlag(false);
    setSelectedMessage(null);
  };

  return (
    <>
      <AppProvider>
        {!flag && (
          <EmailLists
            selectedItem={selectedItem}
            selectedLabel={selectedLabel}
            sendDataToParent={receiveMessage}
            sendDeleteDataMessage={selectedMessage}
          />
        )}
        {flag && (
          <MessageOpen
            sendDataToParent={closeMessageOpen}
            receivedDataFromList={selectedMessage}
          />
        )}
      </AppProvider>
    </>
  );
};

export default DashboardRight;
