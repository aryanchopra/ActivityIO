import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { ArrowDropDown, ArrowDropUp, Menu } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";
const DropDown = ({ DropdownOpen, dropdownref, darkMode, setDarkMode }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
  };
  return (
    <AnimatePresence>
      {DropdownOpen && (
        <motion.div
          className="absolute right-2 text-black top-11 bg-gray-100 rounded-b-md h-24 shadow-md"
          style={{ width: dropdownref.current.offsetWidth }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "6rem", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex-col h-full">
            <div className="h-1/2 flex items-center justify-center">
              <button onClick={logout}>Logout</button>
            </div>
            <div className="h-1/2  flex items-center justify-center">
              <span>Dark Mode</span>
              <div className="p-3 inline-block">
                <div
                  className="w-12 relative h-5 flex items-center"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <div className="rounded-2xl w-16 h-5 bg-gray-700 dark:bg-gray-200"></div>
                  <div
                    className="h-6 absolute bg-white w-6 rounded-full transition-all duration-200"
                    style={{
                      transform: darkMode ? `translateX(${30}px)` : "none",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = (props) => {
  const user = useSelector((state) => state.user);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const dropdownref = useRef();
  return (
    <div
      className="w-full relative min-h-full col-start-1 col-span-12 row-start-1 row-span-1 dark:bg-blue-900 dark:bg-opacity-60"
      style={{ padding: "2.5px" }}
    >
      <div className=" rounded-lg   bg-gray-700 text-gray-300 shadow-md flex  h-full items-center justify-center w-full">
        <div className="absolute left-3 cursor-pointer lg:hidden">
          <Menu />
        </div>
        <div className="">
          <span className="">Activity IO</span>
        </div>

        <div className="absolute right-3 flex items-center " ref={dropdownref}>
          <span
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!DropdownOpen)}
          >
            {user.name}'s Dashboard
          </span>
          <span
            className="ml-3 cursor-pointer"
            onClick={() => setDropdownOpen(!DropdownOpen)}
          >
            {DropdownOpen ? (
              <ArrowDropUp fontSize="large" />
            ) : (
              <ArrowDropDown fontSize="large" />
            )}
          </span>
        </div>
        <DropDown
          DropdownOpen={DropdownOpen}
          dropdownref={dropdownref}
          darkMode={props.darkMode}
          setDarkMode={props.setDarkMode}
        />
      </div>
    </div>
  );
};

export default Navbar;
