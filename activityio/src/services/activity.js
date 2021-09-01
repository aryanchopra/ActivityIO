import axios from "axios";
const BASE_URL = "http://localhost:3003/api/activity";

let token = null;
const setToken = (newToken) => {
  console.log("Setting activity service token ");
  token = `bearer ${newToken}`;
};

const addActivity = async (activity_obj) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("services received: ", activity_obj);
  try {
    const response = await axios.post(BASE_URL, activity_obj, config);
    return response.data;
  } catch (err) {
    console.log(err);
    console.log("insided services err");
  }
};

const getActivity = async () => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(BASE_URL, config);
    return response.data;
  } catch (err) {
    console.log("error", err);
  }
};

const deleteActivity = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    await axios.delete(BASE_URL + `/${id}`, config);
  } catch (err) {
    console.log(err);
  }
};

const updateActivity = async (updated_activity) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    BASE_URL + `/${updated_activity.id}`,
    updated_activity,
    config
  );
  console.log("response: ", response);
  return response.data;
};

export default {
  addActivity,
  getActivity,
  setToken,
  deleteActivity,
  updateActivity,
};
