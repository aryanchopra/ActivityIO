import projectService from "../services/project";

export const initProjects = () => {
  return async (dispatch) => {
    const projects = await projectService.getProjects();
    dispatch({
      type: "INIT_PROJECTS",
      data: projects,
    });
  };
};

export const newProject = (project) => {
  return async (dispatch) => {
    const returnedproject = await projectService.addProject(project);

    dispatch({
      type: "NEW_PROJECT",
      data: returnedproject,
    });
  };
};
export const deleteProject = (id) => {
  return async (dispatch) => {
    await projectService.deleteProject(id);
    dispatch({
      type: "DELETE_PROJECT",
      data: id,
    });
  };
};
const projectReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_PROJECTS":
      return action.data;

    case "NEW_PROJECT":
      return state.concat(action.data);

    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.data);

    default:
      return state;
  }
};
export default projectReducer;
