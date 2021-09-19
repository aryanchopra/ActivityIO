import React, { useState } from "react";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full h-screen grid grid-rows-dashboardlayout grid-cols-12 transition-colors duration-500">
        <Sidebar />
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
