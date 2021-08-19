import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
const AuthCard = () => {
  const [CardState, setCardState] = useState(1);
  return (
    <div className="w-1/2 rounded-md bg-blue-300 mt-3 ">
      <div className="w-full bg-blue-500 rounded-t-md flex">
        <div
          className="flex justify-center items-center h-12 w-1/2 cursor-pointer border-r-2 border-indigo-300"
          onClick={() => setCardState(1)}
        >
          Login
        </div>
        <div
          className="flex justify-center items-center h-12 w-1/2 cursor-pointer border-indigo-300"
          onClick={() => setCardState(0)}
        >
          Sign Up
        </div>
      </div>
      {CardState === 0 && <SignUp />}
      {CardState === 1 && <Login />}
    </div>
  );
};

export default AuthCard;
