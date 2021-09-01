import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { updateProject } from "../reducers/projectReducer";

const ProjectForm = ({ project }) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const projectForm = useFormik({
    initialValues: {
      started: new Date(project.started),
      completed: project.completed ? "yes" : "no",
      description: project.description,
      name: project.name,
    },
    onSubmit: async (values) => {
      dispatch(updateProject({ id: project.id, ...values }));
      history.push("/projects");
    },
  });
  return (
    <div>
      <form
        className="flex flex-col items-start"
        action=""
        onSubmit={projectForm.handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={projectForm.handleChange}
          value={projectForm.values.name}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          onChange={projectForm.handleChange}
          className="resize-none"
          cols="40"
          rows="5"
          value={projectForm.values.description}
          required
        />
        <label htmlFor="started">Started on: </label>

        <DatePicker
          selected={projectForm.values.started}
          name="started"
          onChange={(selecteddate) => {
            projectForm.setFieldValue("started", selecteddate);
          }}
          dateFormat="dd/MM/yyyy"
          required
        />
        <div className="inline">
          <span className="font-bold mr-4">Complete?</span>
          <label htmlFor="notcomplete">No</label>
          <input
            type="radio"
            id="notcomplete"
            name="completed"
            value="no"
            onChange={projectForm.handleChange}
            checked={projectForm.values.completed === "no"}
          />

          <label htmlFor="complete">Yes</label>
          <input
            type="radio"
            id="complete"
            name="completed"
            value="yes"
            onChange={projectForm.handleChange}
            checked={projectForm.values.completed === "yes"}
          />
        </div>
        <button
          className="font-bold bg-blue-400 rounded-md px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const EditProject = ({ project }) => {
  const history = useHistory();

  if (!project) history.push("");
  else
    return (
      <div className="font-bold">
        <div>
          <Link to="/projects">
            <button className="font-bold bg-blue-200 py-2 px-4 rounded-md">
              Projects
            </button>
          </Link>
        </div>
        <ProjectForm project={project} />
      </div>
    );
};

export default EditProject;
