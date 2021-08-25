import activityService from "../services/activity";

export const initActivities = () => {
  return async (dispatch) => {
    const activities = await activityService.getActivity();
    console.log(activities);
    dispatch({
      type: "INIT_ACTIVITIES",
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

export const updateActivity = (updated_activity) => {
  return async (dispatch) => {
    const updatedActivity = await activityService.updateActivity(
      updated_activity
    );
    console.log("updated activity", updatedActivity);
    dispatch({
      type: "UPDATE_ACTIVITY",
      data: updatedActivity,
    });
  };
};

export const deleteActivity = (id) => {
  return async (dispatch) => {
    await activityService.deleteActivity(id);
    dispatch({
      type: "DELETE_ACTIVITY",
      data: id,
    });
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
