import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ text, link }) => {
  return (
    <button className="bg-blue-400 py-2 px-4 text-white font-bold rounded-md w-1/2">
      <Link to={link}>{text}</Link>
    </button>
  );
};

const Sidebar = () => {
  return (
    <div className="col-span-2 col-start-1 row-start-1 row-span-2 bg-blue-200 hidden lg:block pt-12">
      <div className="flex flex-col items-center justify-center h-full">
        <SidebarLink text="Add Activity" link="addactivity" />
      </div>
    </div>
  );
};

export default Sidebar;
