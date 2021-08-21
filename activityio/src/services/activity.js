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
  const response = await axios.post(BASE_URL, activity_obj, config);
  console.log(response);
  return response.data;
};

const getActivity = async (credentials) => {
  const response = await axios.post(BASE_URL, credentials);
  return response.data;
};

export default { addActivity, getActivity, setToken };
