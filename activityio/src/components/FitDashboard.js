import { useEffect } from "react";
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
  if (!fitData.calories || !fitData.steps || !fitData)
    return <div>No data available</div>;
  else
    return (
      <>
        <div className="flex justify-between items-center w-full h-1/6">
          <div>
            <h1 className="text-xl ml-3">
              {googleUser.name}'s Google Fit Stats
            </h1>
          </div>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLECLIENTID}
            buttonText="Logout"
            onLogoutSuccess={googleLogout}
            className="mr-3 ml-3"
          ></GoogleLogout>
        </div>
        <div className="w-full h-5/6 flex">
          <div className="h-1/2 w-1/2">
            <Steps data={fitData.steps} />
          </div>
          <div className="h-1/2 w-1/2">
            <Calories data={fitData.calories} />
          </div>
        </div>
      </>
    );
};

export default FitDashboard;
