import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AddActivity from "./AddActivity";
import AddProject from "./AddProject";
import Activities from "./Activities";
import Projects from "./Projects";
import Statistics from "./Statistics";
import FitDashboard from "./FitDashboard";
import { useDispatch } from "react-redux";
import { initProjects } from "../reducers/projectReducer";
import { initActivities } from "../reducers/activityReducer";

const Content = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(initProjects());
    dispatch(initActivities());
    setLoading(false);
  }, []);
  return (
    <div className="col-span-12 lg:col-span-10 bg-rose-200 overflow-y-scroll bg-white dark:bg-gray-800 dark:bg-opacity-80">
      {loading ? (
        <div>Loading...</div>
      ) : (
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
          <Route path="/googlefit">
            <FitDashboard />
          </Route>
          <Route path="/">
            <Statistics />
          </Route>
        </Switch>
      )}
    </div>
  );
};
export default React.memo(Content);
