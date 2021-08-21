import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import projectService from "../services/project";

const ProjectForm = () => {
  const projectForm = useFormik({
    initialValues: {
      started: new Date(),
      completed: false,
      description: "",
      name: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await projectService.addProject(values);
      } catch (err) {
        console.log("error occ", err);
      }
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

const AddProject = () => {
  return (
    <div className="font-bold">
      <ProjectForm />
    </div>
  );
};

export default AddProject;
