import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const SidebarLink = ({ text, link }) => {
  return (
    <Link className="w-1/2 mb-5" to={`/${link}`}>
      <button className="bg-blue-400  py-2 px-4 text-white font-bold rounded-md w-full">
        {text}
      </button>
    </Link>
  );
};
const Sidebar = () => {
  const [googleUser, setGoogleUser] = useState({
    loggedin: false,
    token: null,
  });
  useEffect(() => {
    if (googleUser.loggedin) {
      const config = {
        headers: {
          Authorization: `Bearer ${googleUser.token}`,
          Accept: "application/json",
        },
      };
      const body = {
        aggregateBy: [
          {
            dataTypeName: "com.google.calories.expended",
          },
        ],
        bucketByTime: {
          durationMillis: 86400000,
        },
        endTimeMillis: new Date().getTime(),
        startTimeMillis: new Date().getTime() - 7 * 86400000,
      };
      axios
        .post(
          "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
          body,
          config
        )
        .then((res) => console.log(res));
    }
  }, [googleUser]);
  const responseGoogle = (response) => {
    if (response.tokenObj) {
      setGoogleUser({ loggedin: true, token: response.tokenObj.access_token });
    }
  };
  return (
    <div className="col-span-2 col-start-1 row-start-1 row-span-2 bg-blue-200 hidden lg:block pt-12">
      <div className="flex flex-col items-center justify-center h-full">
        <SidebarLink text="Add Activity" link="addactivity" />
        <SidebarLink text="Add Project" link="addproject" />
        {!googleUser.loggedin && (
          <GoogleLogin
            clientId=""
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={true}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
