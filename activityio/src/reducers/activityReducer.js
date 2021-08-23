import activityService from "../services/project";

export const initActivities = () => {
  return async (dispatch) => {
    const activities = await activityService.getActivity();
    dispatch({
      type: "INIT_ACTIVITYS",
      data: activities,
    });
  };
};

export const newActivity = (Activity) => {
  return async (dispatch) => {
    const returnedActivity = await activityService.addActivity(Activity);

    dispatch({
      type: "NEW_ACTIVITY",
      data: returnedActivity,
    });
  };
};

const activityReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ACTIVITIES":
      return action.data;

    case "NEW_ACTIVITY":
      return state.concat(action.data);

    default:
      return state;
  }
};
export default activityReducer;
