import axios from "axios";
const BASE_URL = "http://localhost:3003/api/project";

let token = null;
const setToken = (newToken) => {
  console.log("Setting project Service token ");
  token = `bearer ${newToken}`;
};

const addProject = async (project_obj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(BASE_URL, project_obj, config);
  console.log(response);
  return response.data;
};

const getProjects = async () => {
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

export default { addProject, getProjects, setToken };