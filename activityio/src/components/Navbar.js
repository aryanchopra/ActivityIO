import React, { useState, useEffect, useRef } from "react";

import { ArrowDropDown, ArrowDropUp, Menu } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { logoutGoogleUser } from "../reducers/oauthReducer";
import { setDarkMode } from "../reducers/themeReducer";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";

const DropDown = ({ DropdownOpen, setDropdownOpen, dropdownref }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const googleLogout = () => {
    dispatch(logoutGoogleUser());
  };
  const logoutFailure = () => {
    console.log("failure");
  };
  const googlesignOut = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLECLIENTID,
    onLogoutSuccess: googleLogout,
    onFailure: logoutFailure,
  });

  const logout = () => {
    googlesignOut.signOut();
    dispatch(logoutUser());
    history.push("/");
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        DropdownOpen &&
        dropdownref.current &&
        !dropdownref.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [DropdownOpen]);
  return (
    <AnimatePresence>
      {DropdownOpen && (
        <motion.div
          className="absolute right-2 text-black top-11 bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded-b-md h-24 shadow-md"
          style={{ width: "260px" }}
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
                  onClick={() => dispatch(setDarkMode(!darkMode))}
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

const DropDown2 = ({ Dropdown2Open, setDropdown2Open, dropdown2ref }) => {
  const history = useHistory();
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setDropdown2Open(false);
  }, [location]);
  const logout = () => {
    dispatch(logoutUser());
    dispatch(logoutGoogleUser());
    history.push("/");
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        Dropdown2Open &&
        dropdown2ref.current &&
        !dropdown2ref.current.contains(e.target)
      ) {
        console.log(dropdown2ref.current);
        console.log(e.target);
        setDropdown2Open(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [Dropdown2Open]);
  return (
    <AnimatePresence>
      {Dropdown2Open && (
        <motion.div
          className="absolute text-black top-10 left-0 bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded-md h-screen shadow-md z-50 w-screen"
          style={{ width: "98vw" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: `93vh`,
            opacity: 1,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex-col h-full">
            <div className="nav2item">
              <Link className="w-1/3 mb-5" to={`/addactivity`}>
                <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
                  Activities
                </button>
              </Link>
            </div>
            <div className="nav2item">
              <Link className="w-1/3 mb-5" to={`/addproject`}>
                <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
                  Projects
                </button>
              </Link>
            </div>
            <div className="nav2item">
              <Link className="w-1/3 mb-5" to={`/statistics`}>
                <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
                  Statistics
                </button>
              </Link>
            </div>
            <div className="nav2item">
              <Link className="w-1/3 mb-5" to={`/addactivity`}>
                <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
                  Activities
                </button>
              </Link>
            </div>
            <div className="nav2item">
              <span>Dark Mode</span>
              <div className="p-3 inline-block">
                <div
                  className="w-12 relative h-5 flex items-center"
                  onClick={() => dispatch(setDarkMode(!darkMode))}
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
            <div className="h-1/6 flex items-center justify-center border-b-2">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  console.log("Navbar rerendered");
  const user = useSelector((state) => state.user);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [Dropdown2Open, setDropdown2Open] = useState(false);
  const dropdownref = useRef();
  const dropdown2ref = useRef();
  return (
    <div
      className="w-full relative min-h-full col-start-1 col-span-12 row-start-1 row-span-1 dark:bg-gray-800 dark:bg-opacity-80"
      style={{ padding: "2.5px" }}
    >
      <div className=" rounded-lg   bg-gray-700 text-gray-300 shadow-md flex  h-full items-center justify-center w-full">
        <div
          className="absolute left-3 cursor-pointer lg:hidden"
          ref={dropdown2ref}
        >
          <Menu onClick={() => setDropdown2Open(!Dropdown2Open)} />
          <DropDown2
            Dropdown2Open={Dropdown2Open}
            setDropdown2Open={setDropdown2Open}
            dropdown2ref={dropdown2ref}
          />
        </div>
        <div className="">
          <span className="font-monoton text-lg lg:text-2xl">Activity IO</span>
        </div>

        <div
          className="absolute right-3  items-center lg:flex hidden"
          ref={dropdownref}
        >
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
          <DropDown
            DropdownOpen={DropdownOpen}
            setDropdownOpen={setDropdownOpen}
            dropdownref={dropdownref}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
