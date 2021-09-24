export const setDarkMode = (darkMode) => {
  return {
    type: "SET_DARKMODE",
    data: darkMode,
  };
};

const themeReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_DARKMODE":
      return action.data;

    default:
      return state;
  }
};
export default themeReducer;
