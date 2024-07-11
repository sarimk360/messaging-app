import { useState } from "react";
import "./App.css";
import DashboardLeft from "./Components/DashboardLeft";
import DashboardRight from "./Components/DashboardRight";

function App() {
  return (
    <>
      <div className="inbox">Inbox</div>
      <div className="main-container">
        <DashboardLeft />
        <DashboardRight />
      </div>
    </>
  );
}

export default App;
