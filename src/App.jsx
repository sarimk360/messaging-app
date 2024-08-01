import React, { useState } from "react";
import "./App.css";
import DashboardLeft from "./Components/DashboardLeft";
import DashboardRight from "./Components/DashboardRight";
import { AppProvider } from "./Components/Context";

function App() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleLabelSelect = (labelName) => {
    setSelectedLabel(labelName);
  };
  const handleItemSelect = (itemName) => {
    setSelectedItem(itemName);
  };
  

  return (
    <>
      <AppProvider>
      <div className="inbox">Inbox</div>
      <div className="main-container">
        <DashboardLeft
          onLabelSelect={handleLabelSelect}
          onItemSelect={handleItemSelect}
        />
        <DashboardRight
          selectedLabel={selectedLabel}
          selectedItem={selectedItem}
        />
      </div>
      </AppProvider>
    </>
  );
}

export default App;
