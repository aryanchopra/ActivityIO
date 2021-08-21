import React from "react";
import { Switch, Route } from "react-router-dom";
import AddActivity from "./AddActivity";
import AddProject from "./AddProject";
const Content = () => {
  return (
    <div className="col-span-12 lg:col-span-10 bg-blue-100">
      <Switch>
        <Route path="/addactivity">
          <AddActivity />
        </Route>
        <Route path="/addproject">
          <AddProject />
        </Route>
        <Route path="/">
          <div>main</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
