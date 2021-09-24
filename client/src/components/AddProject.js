import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import NavBtn from "./NavBtn";
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
    <form
      className=" inline-flex flex-col lg:w-1/3 w-1/2 items-start p-1 dark:text-white"
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
        className="forminput"
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
        dateFormat="dd/MM/yyyy"
        className="forminput"
        required
      />

      <div className="flex justify-center w-full mt-2">
        <button
          className={
            projectForm.errors.project
              ? " bg-red-500 rounded-md px-4 py-2 mt-3 min-w-max"
              : " formbtn"
          }
          type="submit"
        >
          Add Project
        </button>
      </div>
    </form>
  );
};

const AddProject = () => {
  return (
    <>
      <div className="flex h-1/6 justify-end px-3 pt-3">
        <NavBtn link="projects" text="All Projects" />
      </div>
      <div className="flex h-5/6 justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default AddProject;
