import authService from "../services/auth";
import activityService from "../services/activity";
import projectService from "../services/project";
export const loginUser = (credentials) => {
  return async (dispatch) => {
    // try {
    const user = await authService.login(credentials);
    dispatch(setUser(user));
    activityService.setToken(user.token);
    projectService.setToken(user.token);
    console.log(`setting tokens inside userreducer`);
    window.localStorage.setItem("loggedinUser", JSON.stringify(user));
  };
};

export const setUser = (user) => {
  return {
    type: "SETUSER",
    data: user,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    if (window.localStorage.getItem("loggedinUser"))
      window.localStorage.removeItem("loggedinUser");
    console.log("Logoutcalled");
    dispatch({
      type: "LOGOUT",
    });
  };
};

const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SETUSER":
      return action.data;

    case "LOGOUT":
      return "";

    default:
      return state;
  }
};
export default userReducer;
