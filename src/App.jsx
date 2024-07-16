import React, { useState } from "react";
import "./App.css";
import DashboardLeft from "./Components/DashboardLeft";
import DashboardRight from "./Components/DashboardRight";

function App() {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleLabelSelect = (labelName) => {
    setSelectedLabel(labelName);
  };
  return (
    <>
      <div className="inbox">Inbox</div>
      <div className="main-container">
        <DashboardLeft onLabelSelect={handleLabelSelect} />
        <DashboardRight selectedLabel={selectedLabel} />
      </div>
    </>
  );
}

export default App;
