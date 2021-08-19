import authService from "../services/auth";
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(credentials);
      const user = await authService.login(credentials);
      dispatch(setUser(user));
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
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
