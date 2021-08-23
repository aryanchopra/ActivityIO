import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import projectService from "../services/project";

const Dashboard = ({ user }) => {
  return (
    <div className="w-full h-screen grid grid-rows-dashboardlayout grid-cols-12">
      <Sidebar />
      <Navbar />
      <Content />
    </div>
  );
};

export default Dashboard;
