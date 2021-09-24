import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../reducers/projectReducer";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import EditProject from "./EditProject";
import { Edit, Delete } from "@material-ui/icons";

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
        {matchedproject && <EditProject project={matchedproject} />}
      </Route>
      <Route path="">
        {Projects.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-5xl">No projects added yet.</span>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center md:justify-start  mt-6">
            <div className="overflow-auto lg:overflow-visible ">
              <table
                className="table text-black text-sm border-separate "
                style={{ borderSpacing: "0px 2px" }}
              >
                <thead className="bg-gray-800 text-gray-500">
                  <tr className=" border-2" style={{ borderRadius: "20px" }}>
                    <th className="p-2 rounded-l-md">Name</th>
                    <th className="p-2 hidden md:table-cell">Description</th>
                    <th className="p-2 ">Started</th>
                    <th className="p-2 hidden md:table-cell">Complete</th>
                    <th className="p-2 rounded-r-md">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-6 ">
                  {Projects.map((project) => {
                    return (
                      <tr key={project.id} className="bg-gray-800 text-white">
                        <td className="p-3 rounded-l-md">{project.name}</td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {project.description.slice(0, 50)}...
                        </td>
                        <td className="p-3  text-center">
                          {new Date(project.started).toLocaleDateString()}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {project.completed ? "Yes" : "No"}
                        </td>
                        <td className="p-2 rounded-r-md">
                          <Delete
                            className="cursor-pointer mr-2 hover:text-gray-500"
                            onClick={() => projectDelete(project.id)}
                          />

                          <Link to={`projects/${project.id}`}>
                            <Edit className="cursor-pointer mr-2 hover:text-gray-500" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Route>
    </Switch>
  );
};

export default Projects;
