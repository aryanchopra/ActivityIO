import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import activityService from "../services/activity";
import projectService from "../services/project";
const ActivityForm = () => {
  useEffect(() => {
    console.log("component  rendered");
    const getProjects = async () => {
      const projects = await projectService.getProjects();
      setUserProjects(projects);
    };
    getProjects();
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [userProjects, setUserProjects] = useState([]);
  const activityForm = useFormik({
    initialValues: {
      date: new Date(),
      sleep: 6,
      qualityofsleep: 1,
      workout: 0,
      qualityofday: 1,
      productivehours: 0,
      meditate: "no",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await activityService.addActivity(values);
      } catch (err) {
        console.log("error occured", err);
      }
    },
  });
  return (
    <div>
      <form
        className="flex flex-col items-start"
        action=""
        onSubmit={activityForm.handleSubmit}
      >
        <label htmlFor="date">Date</label>

        <DatePicker
          selected={activityForm.values.date}
          name="date"
          onChange={(selecteddate) => {
            activityForm.setFieldValue("date", selecteddate);
          }}
          dateFormat="dd/MM/yyyy"
          required
        />
        <label htmlFor="sleep">Sleep</label>
        <input
          type="number"
          min="0"
          max="24"
          name="sleep"
          onChange={activityForm.handleChange}
          value={activityForm.values.sleep}
          required
        />
        <label htmlFor="qualityofsleep">Quality of Sleep</label>
        <input
          type="number"
          min="1"
          max="10"
          name="qualityofsleep"
          onChange={activityForm.handleChange}
          value={activityForm.values.qualityofsleep}
          required
        />
        <label htmlFor="workout">Hours of Workout?</label>
        <input
          type="number"
          min="0"
          max="6"
          name="workout"
          onChange={activityForm.handleChange}
          value={activityForm.values.workout}
          required
        />
        <div className="inline">
          <span className="font-bold mr-4">Did you meditate?</span>
          <label htmlFor="html">No</label>
          <input
            type="radio"
            id="meditatefalse"
            name="meditate"
            value="no"
            onChange={activityForm.handleChange}
            checked={activityForm.values.meditate === "no"}
          />

          <label htmlFor="css">Yes</label>
          <input
            type="radio"
            id="meditatetrue"
            name="meditate"
            value="yes"
            onChange={activityForm.handleChange}
            checked={activityForm.values.meditate === "yes"}
          />
        </div>
        <label htmlFor="qualityofday">Quality of Day</label>

        <input
          type="number"
          min="1"
          max="10"
          name="qualityofday"
          onChange={activityForm.handleChange}
          value={activityForm.values.qualityofday}
          required
        />

        <label htmlFor="productivehours">Productive Hours</label>

        <input
          type="number"
          min="0"
          max="24"
          name="productivehours"
          onChange={activityForm.handleChange}
          value={activityForm.values.productivehours}
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

const AddActivity = () => {
  return (
    <div className="font-bold">
      <span className="text-xl text-center font-bold mt-2">
        Hey Aryan, how was your day?
      </span>
      <ActivityForm />
    </div>
  );
};

export default AddActivity;
