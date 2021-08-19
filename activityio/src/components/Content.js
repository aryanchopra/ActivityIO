import React from "react";
import { Switch, Route } from "react-router-dom";
import AddActivity from "./AddActivity";
const Content = () => {
  return (
    <div className="col-span-12 lg:col-span-10">
      <Switch>
        <Route path="/addactivity">
          <AddActivity />
        </Route>
        <Route path="/">
          <div>main</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
