import React from "react";

import Login from "./Login";
import { Switch, Route } from "react-router-dom";
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
        <div className="w-screen  flex justify-center items-center h-screen">
          <span className="text-5xl">Activity IO</span>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <Switch>
      <Route path="">
        <Main />
      </Route>
      <Route path="login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Landing;
