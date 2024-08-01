/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

const AppContext = createContext();
export default AppContext;

export const AppProvider = ({ children }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/emails")
      .then((response) => {
        setEmailData(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching emails", error);
      });
  }, []);

  const [emailData, setEmailData] = useState([]);

  const setUpdatedData = (incomingData) => {
    setEmailData(incomingData);
  };

  const [selectedMessage, setSelectedMessage] = useState(false);

  const selectMessage = (message) => {
    setSelectedMessage(message);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/folders")
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the folder data", error);
      });
  }, []);

  const [folders, setFolders] = useState([]);

  const setFoldersData = (incomingData) => {
    setFolders(incomingData);
  };

  const [label, setLabel] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/labels")
      .then((response) => {
        setLabelState(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the labels!", error);
      });
  }, []);

  const setLabelState = (incomingData) => {
    setLabel(incomingData);
  };

  const [selectedMenu, setSelectedMenu] = useState([]);

  const updateSelectMenu = (incomingData) => {
    setSelectedMenu(incomingData);
  };

  return (
    <AppContext.Provider
      value={{
        emailData,
        setUpdatedData,
        selectedMessage,
        selectMessage,
        folders,
        setFoldersData,
        label,
        setLabelState,
        selectedMenu,
        updateSelectMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
