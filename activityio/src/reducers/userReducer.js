import authService from "../services/auth";
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(credentials);
      const user = await authService.login(credentials);
      console.log(user);
      // dispatch({
      //   type: "SETUSER",
      //   data: user,
      // });

      // window.localStorage.setItem("loggedinUser", JSON.stringify(user));
    } catch (exception) {
      // dispatch({
      //   type: "NEW_NOTIFICATION",
      //   message: exception.response.data.error,
      // });
      // setTimeout(() => {
      //   dispatch({
      //     type: "NEW_NOTIFICATION",
      //     message: "",
      //   });
      // }, 5000);
      console.log("inside reducer", exception.response.status);
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
