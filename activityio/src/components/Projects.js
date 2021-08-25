import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../reducers/projectReducer";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import EditActivity from "./EditActivity";

const Projects = () => {
  const dispatch = useDispatch();
  const Projects = useSelector((state) => state.projects);

  const match = useRouteMatch("/projects/:id");
  const id = match ? match.params.id : null;
  const matchedproject = Projects.find((project) => project.id === id);
  const projectDelete = (id) => {
    dispatch(deleteProject(id));
  };
  return (
    <Switch>
      <Route path="/projects/:id">
        {matchedproject && <EditActivity project={matchedproject} />}
      </Route>
      <Route path="">
        <div className="font-bold">
          {Projects.length === 0 && <span>No Projects available</span>}
          {Projects.map((project) => {
            return (
              <div key={project.id}>
                {project.name}
                <button
                  className="bg-red-300 mx-2 py-2 px-4 font-bold rounded-md"
                  onClick={() => projectDelete(project.id)}
                >
                  Delete
                </button>
                <Link to={`projects/${project.id}`}>
                  <button className="bg-yellow-300 py-2 px-4 font-bold rounded-md">
                    Edit
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </Route>
    </Switch>
  );
};

export default Projects;
