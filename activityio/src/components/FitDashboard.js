import { useEffect } from "react";
import { logoutGoogleUser } from "../reducers/oauthReducer";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
const FitDashboard = () => {
  const history = useHistory();
  const googleUser = useSelector((state) => state.googleUser);
  useEffect(() => {
    console.log("uef ran ");
    console.log(googleUser);
    if (!googleUser.loggedin) history.push("/");
  }, [googleUser]);
  const dispatch = useDispatch();
  const googleLogout = () => {
    dispatch(logoutGoogleUser());
  };
  return (
    <div>
      <GoogleLogout
        clientId="957658607708-6gkdulbgpb86o1dcrr91ktiffjluu8hm.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={googleLogout}
      ></GoogleLogout>
    </div>
  );
};

export default FitDashboard;
