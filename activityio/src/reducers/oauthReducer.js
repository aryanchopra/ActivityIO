export const loginGoogleUser = (user) => {
  return async (dispatch) => {
    console.log(
      document.cookie.split("; ").reduce((prev, current) => {
        const [name, ...value] = current.split("=");
        prev[name] = value.join("=");
        return prev;
      }, {})
    );
    dispatch(setGoogleUser(user));
  };
};

export const setGoogleUser = (user) => {
  return {
    type: "SETGOOGLEUSER",
    data: user,
  };
};

export const logoutGoogleUser = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUTGOOGLEUSER",
      data: {
        loggedin: false,
        token: null,
      },
    });
  };
};

const userReducer = (
  state = {
    loggedin: false,
    token: null,
  },
  action
) => {
  switch (action.type) {
    case "SETGOOGLEUSER":
      return action.data;

    case "LOGOUTGOOGLEUSER":
      return action.data;

    default:
      return state;
  }
};
export default userReducer;
