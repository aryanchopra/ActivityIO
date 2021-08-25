import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newActivity, updateActivity } from "../reducers/activityReducer";

const ActivityForm = ({ projectnames, activity }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activityForm = useFormik({
    // enableReinitialize: true,
    initialValues: {
      date: new Date(activity.date),
      sleep: activity.sleep,
      qualityofsleep: activity.qualityofsleep,
      workout: activity.workout,
      qualityofday: activity.qualityofday,
      productivehours: activity.productivehours,
      meditate: activity.meditate ? "yes" : "no",
      project: activity.project ? "yes" : "no",
      projectid: activity.project ? activity.project.id : 0,
      projecthours: activity.project ? activity.project.hours : 0,
    },
    onSubmit: async (values) => {
      dispatch(updateActivity({ id: activity.id, ...values }));
      history.push("/activities");
    },
    validate: (values) => {
      let errors = {};

      if (activityForm.values.project === "yes" && values.projectid === "none")
        errors.project = "Required";

      return errors;
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
        <div className="inline">
          <span className="font-bold mr-4">Did you work on a project</span>
          <label htmlFor="html">No</label>
          <input
            type="radio"
            id="projectfalse"
            name="project"
            value="no"
            onChange={activityForm.handleChange}
            checked={activityForm.values.project === "no"}
          />

          <label htmlFor="css">Yes</label>
          <input
            type="radio"
            id="projecttrue"
            name="project"
            value="yes"
            onChange={activityForm.handleChange}
            checked={activityForm.values.project === "yes"}
            disabled={projectnames.length === 0}
          />
          {activityForm.values.project === "yes" && (
            <div className="block">
              <select
                name="projectid"
                onChange={activityForm.handleChange}
                id="project"
                value={activityForm.values.projectid}
              >
                <option value="none">Select a project</option>
                {projectnames.map((project, idx) => {
                  return (
                    <option key={idx} value={project.id}>
                      {project.name}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                className="ml-3"
                min="0"
                max="24"
                name="projecthours"
                value={activityForm.values.projecthours}
                onChange={activityForm.handleChange}
              />
            </div>
          )}
        </div>

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
          className={
            activityForm.errors.project
              ? "font-bold bg-red-400 rounded-md px-4 py-2 "
              : "font-bold bg-blue-400 rounded-md px-4 py-2"
          }
          type="submit"
          disabled={activityForm.errors.project}
        >
          Update
        </button>
      </form>
    </div>
  );
};

const EditActivity = ({ activity }) => {
  const projectnames = useSelector((state) =>
    state.projects.map((project) => {
      return {
        name: project.name,
        id: project.id,
      };
    })
  );
  const history = useHistory();
  if (!activity) history.push("");
  else
    return (
      <div className="font-bold">
        <div>
          <Link to="/activities">
            <button className="font-bold bg-blue-200 py-2 px-4 rounded-md">
              Activities
            </button>
          </Link>
        </div>
        <span className="text-xl text-center font-bold mt-2">
          Hey Aryan, how was your day?
        </span>
        <ActivityForm projectnames={projectnames} activity={activity} />
      </div>
    );
};

export default EditActivity;
