/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import EmailLists from "./EmailLists";
import MessageOpen from "./MessageOpen";
import AppContext, { AppProvider } from "./Context";

const DashboardRight = ({ selectedLabel, selectedItem }) => {
  const { selectedMessage } = useContext(AppContext);

  return (
    <>
      {!selectedMessage && (
        <EmailLists selectedItem={selectedItem} selectedLabel={selectedLabel} />
      )}
      {selectedMessage && <MessageOpen />}
    </>
  );
};

export default DashboardRight;
