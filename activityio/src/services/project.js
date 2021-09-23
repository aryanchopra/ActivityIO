import axios from "axios";
const BASE_URL = "http://localhost:3003/api/project";

let token = null;
const setToken = (newToken) => {
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
const deleteProject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    await axios.delete(BASE_URL + `/${id}`, config);
  } catch (err) {
    console.log("Inside services catch");
    console.log(err);
  }
};

const updateProject = async (updated_project) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    BASE_URL + `/${updated_project.id}`,
    updated_project,
    config
  );
  console.log("response project: ", response);
  return response.data;
};

export default {
  addProject,
  getProjects,
  setToken,
  deleteProject,
  updateProject,
};
