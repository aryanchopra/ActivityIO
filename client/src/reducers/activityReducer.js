import activityService from "../services/activity";
import { initProjects } from "./projectReducer";
export const initActivities = () => {
  return async (dispatch) => {
    try {
      const activities = await activityService.getActivity();
      dispatch({
        type: "INIT_ACTIVITIES",
        data: activities,
      });
    } catch (err) {}
  };
};

export const newActivity = (Activity) => {
  return async (dispatch) => {
    // try {
    const returnedActivity = await activityService.addActivity(Activity);
    if (returnedActivity) {
      dispatch({
        type: "NEW_ACTIVITY",
        data: returnedActivity,
      });
      dispatch(initProjects());
    } else throw new Error(500);
  };
};

export const updateActivity = (updated_activity) => {
  return async (dispatch) => {
    const updatedActivity = await activityService.updateActivity(
      updated_activity
    );
    dispatch({
      type: "UPDATE_ACTIVITY",
      data: updatedActivity,
    });
    dispatch(initProjects());
  };
};

export const deleteActivity = (id) => {
  return async (dispatch) => {
    await activityService.deleteActivity(id);
    dispatch({
      type: "DELETE_ACTIVITY",
      data: id,
    });
    dispatch(initProjects());
  };
};

const activityReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ACTIVITIES":
      return action.data;

    case "NEW_ACTIVITY":
      return state.concat(action.data);

    case "DELETE_ACTIVITY":
      return state.filter((activity) => activity.id !== action.data);

    case "UPDATE_ACTIVITY":
      return state.map((activity) =>
        activity.id === action.data.id ? action.data : activity
      );

    default:
      return state;
  }
};
export default activityReducer;
