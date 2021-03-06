import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBtn from "./NavBtn";
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
        className="flex flex-col items-start dark:text-white"
        action=""
        onSubmit={projectForm.handleSubmit}
      >
        <label htmlFor="name" className="mt-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={projectForm.handleChange}
          value={projectForm.values.name}
          className="forminput"
          required
        />
        <label htmlFor="description" className="mt-1">
          Description
        </label>
        <textarea
          name="description"
          onChange={projectForm.handleChange}
          className="resize-none forminput"
          cols="40"
          rows="5"
          value={projectForm.values.description}
          required
        />
        <label htmlFor="started" className="mt-1">
          Started on:{" "}
        </label>

        <DatePicker
          selected={projectForm.values.started}
          name="started"
          onChange={(selecteddate) => {
            projectForm.setFieldValue("started", selecteddate);
          }}
          className="forminput"
          dateFormat="dd/MM/yyyy"
          required
        />
        <div className="inline mt-1">
          <span className="mr-4">Complete?</span>
          <label htmlFor="notcomplete" className="mr-2">
            No
          </label>
          <input
            type="radio"
            id="notcomplete"
            name="completed"
            value="no"
            onChange={projectForm.handleChange}
            checked={projectForm.values.completed === "no"}
          />

          <label htmlFor="complete" className="ml-3 mr-2">
            Yes
          </label>
          <input
            type="radio"
            id="complete"
            name="completed"
            value="yes"
            onChange={projectForm.handleChange}
            checked={projectForm.values.completed === "yes"}
          />
        </div>
        <div className="flex justify-center w-full mt-2">
          <button
            className={
              projectForm.errors.project
                ? " bg-red-500 rounded-md px-4 py-2 mt-3 min-w-max"
                : "formbtn"
            }
            type="submit"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

const EditProject = ({ project }) => {
  const history = useHistory();

  if (!project) history.push("");
  else
    return (
      <div className="">
        <div className="flex justify-end px-3 pt-3">
          <NavBtn link="projects" text="All Projects" />
        </div>
        <div className="flex justify-center">
          <ProjectForm project={project} />
        </div>
      </div>
    );
};

export default EditProject;
