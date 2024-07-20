import React, { useState } from "react";
import "./App.css";
import DashboardLeft from "./Components/DashboardLeft";
import DashboardRight from "./Components/DashboardRight";

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
    </>
  );
}

export default App;
