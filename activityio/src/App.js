import React, { useEffect } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";
import activityService from "./services/activity";
import projectService from "./services/project";
function App() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  useEffect(() => {
    const saveduser = JSON.parse(window.localStorage.getItem("loggedinUser"));
    if (saveduser) {
      dispatch(setUser(saveduser));
    }
  }, []);
  if (!user) return <Landing />;
  else {
    activityService.setToken(user.token);
    projectService.setToken(user.token);
    return <Dashboard user={user} />;
  }
}

export default App;
