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

  return (
    <AppContext.Provider value={{ emailData, setUpdatedData, selectedMessage, selectMessage }}>
      {children}
    </AppContext.Provider>
  );
};
