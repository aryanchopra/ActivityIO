import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";
const AuthCard = ({ state }) => {
  return (
    <div className="w-3/4 sm:w-1/2 lg:w-1/3 rounded-md bg-gray-500 bg-opacity-20 mt-3 ">
      <div className="w-full rounded-t-md flex border-b-2 border-white shadow-md">
        <div
          className={
            state === "login"
              ? " h-12 w-1/2 cursor-pointer border-white border-b-2"
              : " h-12 w-1/2 cursor-pointer "
          }
        >
          <Link to="/login">
            <button className="w-full h-full rounded-tl-md borw">Login</button>
          </Link>
        </div>
        <div
          className={
            state === "signup"
              ? " h-12 w-1/2 cursor-pointer border-white border-b-2"
              : " h-12 w-1/2 cursor-pointer "
          }
        >
          <Link to="/signup">
            <button className="w-full h-full rounded-tr-md">Sign Up</button>
          </Link>
        </div>
      </div>
      {state === "signup" && <SignUp />}
      {state === "login" && <Login />}
    </div>
  );
};

export default AuthCard;
