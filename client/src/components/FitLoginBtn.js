import FitLogo from "./FitLogo";
import { fitScopes } from "../services/googleFit";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { loginGoogleUser } from "../reducers/oauthReducer";
import { Link } from "react-router-dom";

const FitLoginBtn = ({ width }) => {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    if (response.tokenObj) {
      dispatch(
        loginGoogleUser({
          loggedin: true,
          token: response.tokenObj.access_token,
          name: response.profileObj.name,
        })
      );
    }
  };

  const googleUser = useSelector((state) => state.googleUser);
  return !googleUser.loggedin ? (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLECLIENTID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={`bg-gray-600 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white flex items-center ${
            width ? "justify-center" : "justify-between"
          } hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-3 text-white font-bold rounded-md ${
            width ? width : "w-7/12"
          }`}
        >
          <FitLogo />
          <span className="ml-2">Fit Login</span>
        </button>
      )}
      scope={fitScopes}
    />
  ) : (
    <Link className={`mb-5 ${width ? width : "w-7/12"}`} to={`/googlefit`}>
      <button
        className={`bg-gray-600 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white flex items-center ${
          width ? "justify-center" : "justify-between"
        } hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-3 text-white font-bold rounded-md w-full`}
      >
        <FitLogo />
        <span className="ml-2">Fit Stats</span>
      </button>
    </Link>
  );
};

export default FitLoginBtn;
