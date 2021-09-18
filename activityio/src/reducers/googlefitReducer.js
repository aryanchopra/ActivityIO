import googleFitService from "../services/googleFit";

export const initSteps = () => {
  return async (dispatch) => {
    const steps = await googleFitService.getSteps();
    console.log(steps);
    if (steps) {
      dispatch({
        type: "INIT_STEPS",
        data: steps,
      });
    }
  };
};
export const initCalories = () => {
  return async (dispatch) => {
    const calories = await googleFitService.getCalories();
    if (calories) {
      dispatch({
        type: "INIT_CALORIES",
        data: calories,
      });
    }
  };
};
const googlefitReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT_STEPS":
      return { ...state, steps: action.data };

    case "INIT_CALORIES":
      return { ...state, calories: action.data };

    default:
      return state;
  }
};
export default googlefitReducer;
