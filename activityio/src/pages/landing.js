import React, { useEffect } from "react";
import AuthCard from "../components/AuthCard";
const Landing = () => {
  return (
    <div className="bg-blue-200 h-screen bg-opacity-50">
      <div className="flex flex-col md:flex-row h-screen relative">
        <div className="w-screen  md:w-1/2 absolute md:relative flex justify-center items-center h-screen">
          <img
            src={"img/landingbg.svg"}
            alt=""
            className="h-1/3  bg-opacity-50 hidden md:block"
          />
        </div>
        <div className="w-screen md:w-1/2 flex flex-col justify-center items-center md:h-screen h-screen z-10">
          <h3 className="font-bold italic text-4xl font-sans">ActivityIO</h3>
          <AuthCard />
        </div>
      </div>
    </div>
  );
};

export default Landing;
