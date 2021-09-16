import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { newProject } from "../reducers/projectReducer";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projectForm = useFormik({
    initialValues: {
      started: new Date(),
      completed: false,
      description: "",
      name: "",
    },
    onSubmit: async (values) => {
      dispatch(newProject(values));
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
        <label htmlFor="name" className="mt-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={projectForm.handleChange}
          value={projectForm.values.name}
          required
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow focus:shadow-xl w-full mt-1"
        />
        <label htmlFor="description" className="mt-1">
          Description
        </label>
        <textarea
          name="description"
          onChange={projectForm.handleChange}
          className="resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow focus:shadow-xl w-full mt-1"
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
          dateFormat="dd/MM/yyyy"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full shadow focus:shadow-xl mt-1"
          required
        />

        <div className="flex justify-center w-full mt-2">
          <button
            className="font-bold bg-blue-400 rounded-md px-4 py-2  min-w-max"
            type="submit"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

const AddProject = () => {
  return (
    <div>
      <div className="flex justify-end px-3 pt-3">
        <Link to="/projects">
          <button className="font-bold bg-blue-200 py-2 px-4 rounded-md">
            All Projects
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <ProjectForm />
      </div>
    </div>
  );
};

export default AddProject;
