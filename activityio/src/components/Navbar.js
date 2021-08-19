import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";
const DropDown = ({ DropdownOpen, dropdownref }) => {
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
          className="absolute right-0 top-12 bg-blue-700 h-24"
          style={{ width: dropdownref.current.offsetWidth }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "6rem", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <button onClick={logout}>Logout</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const dropdownref = useRef();
  return (
    <div className="w-full relative h-12 bg-yellow-200 col-start-1 col-span-12 row-start-1 row-span-1 shadow-md">
      <div className="flex h-full items-center justify-end w-full">
        <span className="">Activity IO</span>

        <div className="ml-2 flex items-center" ref={dropdownref}>
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
        <DropDown DropdownOpen={DropdownOpen} dropdownref={dropdownref} />
      </div>
    </div>
  );
};

export default Navbar;
