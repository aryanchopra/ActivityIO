import { useEffect } from "react";
import googleFitService from "../services/googleFit";
import { logoutGoogleUser } from "../reducers/oauthReducer";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
const FitDashboard = () => {
  const history = useHistory();
  const googleUser = useSelector((state) => state.googleUser);
  useEffect(() => {
    const fetchSteps = async () => {
      const data = await googleFitService.getSteps();
      console.log(data);
    };
    const fetchCalories = async () => {
      const data = await googleFitService.getCalories();
      console.log(data);
    };

    if (!googleUser.loggedin) history.push("/");
    else {
      googleFitService.setToken(googleUser.token);
      fetchSteps();
      fetchCalories();
    }
  }, [googleUser]);
  const dispatch = useDispatch();
  const googleLogout = () => {
    dispatch(logoutGoogleUser());
  };
  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLECLIENTID}
        buttonText="Logout"
        onLogoutSuccess={googleLogout}
      ></GoogleLogout>
    </div>
  );
};

export default FitDashboard;
