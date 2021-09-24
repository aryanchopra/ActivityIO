import React from "react";
import Auth from "./Auth";
import { Switch, Route, Link } from "react-router-dom";

const Main = () => {
  return (
    <div
      className=" h-screen bg-opacity-50"
      style={{
        backgroundColor: "#FAACA8 ",
        backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
      }}
    >
      <div className=" h-screen relative">
        <div className="w-screen  flex flex-col justify-center items-center h-screen">
          <div className=" text-4xl text-gray-600 md:text-5xl font-monoton   ">
            {" "}
            Activity IO{" "}
            <img
              className="inline ml-2 mb-2"
              src="img/Activity IO.png"
              width="50px"
              height="50px"
              alt=""
            />
          </div>
          <div className="overflow-hidden mt-3 text-gray-800 text-xl md:text-4xl  changingtext h-11">
            <div className="line text-center ">Record daily activities</div>
            <div className="line text-center  mt-8 md:mt-5">
              Analyse patterns
            </div>
            <div className="line text-center mt-8 md:mt-5">
              Connect to Google Fit
            </div>
            <div className="line text-center mt-8 md:mt-5">Reduce burnouts</div>
            <div className="line text-center mt-8 md:mt-5">Live Healthier</div>
          </div>
          <div className="flex justify-center mt-3">
            <Link to="/login">
              <button className="bg-gray-600 hover:bg-gray-300 hover:border-gray-100  hover:text-gray-600 text-white rounded-md mr-4 py-2 px-4">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-600 focus:shadow-lg  hover:bg-gray-300 hover:border-gray-100  hover:text-gray-600 text-white rounded-md  py-2 px-4">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 text-center w-full">
        Made with ❤ by{" "}
        <a href="https://www.github.com/aryanchopra">Aryan Chopra</a>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <Switch>
      <Route path="/login">
        <Auth state="login" />
      </Route>
      <Route path="/signup">
        <Auth state="signup" />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  );
};

export default Landing;
