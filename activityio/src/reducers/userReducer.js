import loginService from "../services/login";
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch({
        type: "SETUSER",
        data: user,
      });

      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
    } catch (exception) {
      dispatch({
        type: "NEW_NOTIFICATION",
        message: exception.response.data.error,
      });
      setTimeout(() => {
        dispatch({
          type: "NEW_NOTIFICATION",
          message: "",
        });
      }, 5000);
    }
  };
};

export const setUser = (user) => {
  return {
    type: "SETUSER",
    data: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SETUSER":
      return action.data;

    case "LOGIN":
      return action.data;

    case "LOGOUT":
      return "";
    default:
      return state;
  }
};
export default userReducer;
