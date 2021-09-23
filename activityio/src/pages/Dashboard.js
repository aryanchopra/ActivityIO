import React from "react";
import { useSelector } from "react-redux";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  const darkMode = useSelector((state) => state.darkMode);
  console.log("Dashboard Rerendered");
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full h-screen grid grid-rows-dashboardlayout grid-cols-12 transition-colors duration-500">
        <Sidebar />
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
