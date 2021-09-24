import React from "react";
import { Link } from "react-router-dom";
import FitLoginBtn from "./FitLoginBtn";
const SidebarLink = ({ text, link }) => {
  return (
    <Link className="w-7/12 mb-5" to={`/${link}`}>
      <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
        {text}
      </button>
    </Link>
  );
};

const Sidebar = () => {
  console.log("Sidebar rerendered");

  return (
    <div className="p-2 col-span-2 col-start-1 row-start-1 row-span-2 dark:bg-gray-800 dark:bg-opacity-80  hidden lg:block mt-12">
      <div className="bg-gray-100 dark:bg-gray-500 dark:bg-opacity-80 rounded-2xl h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <SidebarLink text="Activities" link="addactivity" />
          <SidebarLink text="Projects" link="addproject" />
          <SidebarLink text="Statistics" link="" />
          <FitLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
