import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import Steps from "./Charts/Steps";
import Calories from "./Charts/Calories";

import googleFitService from "../services/googleFit";
import { logoutGoogleUser } from "../reducers/oauthReducer";
import { initCalories, initSteps } from "../reducers/googlefitReducer";

const FitDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const googleUser = useSelector((state) => state.googleUser);
  const [filter, setFilter] = useState(7);
  useEffect(() => {
    if (!googleUser.loggedin) history.push("/");
    else {
      googleFitService.setToken(googleUser.token);
      dispatch(initSteps());
      dispatch(initCalories());
    }
  }, [googleUser]);
  const googleLogout = () => {
    dispatch(logoutGoogleUser());
  };
  const fitData = useSelector((state) => state.googleFitData);
  if (!fitData || !fitData.calories || !fitData.steps)
    return (
      <div>
        No data available{" "}
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLECLIENTID}
          buttonText="Logout"
          onLogoutSuccess={googleLogout}
          className="mr-3 ml-3"
        ></GoogleLogout>
      </div>
    );
  else
    return (
      <>
        <div className="flex justify-end items-center w-full h-1/6">
          <div>
            <h1 className="text-2xl dark:text-gray-400 font-semibold font-inter ml-3">
              {googleUser.name}'s{" "}
              <span
                className="text-gray-500 dark:text-white cursor-pointer"
                onClick={() => (filter === 7 ? setFilter(30) : setFilter(7))}
              >
                {filter === 7 ? "weekly" : "monthly"}
              </span>{" "}
              Google Fit Stats
            </h1>
          </div>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLECLIENTID}
            buttonText="Logout"
            onLogoutSuccess={googleLogout}
            className="mr-3 ml-3"
          ></GoogleLogout>
        </div>
        <div className="flex flex-col lg:flex-row h-5/6 w-full">
          <div className="h-1/2 w-full lg:w-1/2">
            <Steps
              data={fitData.steps
                .sort((a, b) => {
                  return a.date - b.date;
                })
                .filter((activity) => {
                  let activitydate = new Date(activity.date);
                  let thresholddate = new Date();
                  thresholddate.setDate(thresholddate.getDate() - filter);
                  return (
                    activitydate.getTime() > thresholddate.getTime() &&
                    activitydate.getTime() < new Date().getTime()
                  );
                })}
            />
          </div>
          <div className="h-1/2 w-full lg:w-1/2">
            <Calories
              data={fitData.calories
                .sort((a, b) => {
                  return a.date - b.date;
                })
                .filter((activity) => {
                  let activitydate = new Date(activity.date);
                  let thresholddate = new Date();
                  thresholddate.setDate(thresholddate.getDate() - filter);
                  return (
                    activitydate.getTime() > thresholddate.getTime() &&
                    activitydate.getTime() < new Date().getTime()
                  );
                })}
            />
          </div>
        </div>
      </>
    );
};

export default FitDashboard;
