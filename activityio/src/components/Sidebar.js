import React from "react";
import FitLogo from "./FitLogo";
import { fitScopes } from "../services/googleFit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { loginGoogleUser } from "../reducers/oauthReducer";

const SidebarLink = ({ text, link }) => {
  return (
    <Link className="w-1/2 mb-5" to={`/${link}`}>
      <button className="bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-4 text-white font-bold rounded-md w-full">
        {text}
      </button>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const googleUser = useSelector((state) => state.googleUser);
  const responseGoogle = (response) => {
    console.log(response);
    if (response.tokenObj) {
      dispatch(
        loginGoogleUser({
          loggedin: true,
          token: response.tokenObj.access_token,
          name: response.Ws.Qe,
        })
      );
    }
  };

  return (
    <div className="col-span-2 col-start-1 row-start-1 row-span-2 bg-white hidden lg:block mt-12">
      <div className="flex flex-col items-center justify-center h-full">
        <SidebarLink text="Activities" link="addactivity" />
        <SidebarLink text="Projects" link="addproject" />
        <SidebarLink text="Statistics" link="" />
        {!googleUser.loggedin ? (
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
                className="bg-gray-600 flex items-center justify-between hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-3 text-white font-bold rounded-md w-1/2"
              >
                <FitLogo />
                <span className="">Fit Login</span>
              </button>
            )}
            scope={fitScopes}
          />
        ) : (
          <Link className="w-1/2 mb-5" to={`/googlefit`}>
            <button className="bg-gray-600 flex items-center justify-between hover:bg-gray-300 hover:text-gray-600 shadow-md hover:shadow-lg transition-all py-2 px-3 text-white font-bold rounded-md w-full">
              <FitLogo />
              <span className="">Fit Stats</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
