import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AddActivity from "./AddActivity";
import AddProject from "./AddProject";
import Activities from "./Activities";
import Projects from "./Projects";
import { useDispatch } from "react-redux";
import { initProjects } from "../reducers/projectReducer";
import { initActivities } from "../reducers/activityReducer";

const Content = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initProjects());
    dispatch(initActivities());
  }, []);
  return (
    <div className="col-span-12 lg:col-span-10 bg-blue-100">
      <Switch>
        <Route path="/addactivity">
          <AddActivity />
        </Route>
        <Route path="/activities">
          <Activities />
        </Route>
        <Route path="/projects">
          <Projects />
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
