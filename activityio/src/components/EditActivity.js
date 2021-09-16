import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateActivity } from "../reducers/activityReducer";

const ActivityForm = ({ projectnames, activity }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(new Date(activity.date));
  const activitydates = useSelector((state) =>
    state.activities.map((storedactivity) =>
      new Date(activity.date).getTime() !==
      new Date(storedactivity.date).getTime()
        ? new Date(storedactivity.date)
        : null
    )
  );
  console.log(activitydates);
  const futureDate = (date) => {
    return new Date() > date;
  };
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
      console.log("submitted");
      console.log(values);
      dispatch(updateActivity({ id: activity.id, ...values }));
      history.push("/activities");
    },
    validate: (values) => {
      const errors = {};
      if (
        values.project === "yes" &&
        (values.projectid === "none" || values.projectid === 0)
      )
        errors.project = "Required";

      return errors;
    },
  });
  return (
    <form
      className="inline-flex flex-col lg:w-1/3 w-1/2 items-start p-1"
      action=""
      onSubmit={activityForm.handleSubmit}
    >
      <label htmlFor="date" className="mt-1">
        Date
      </label>
      <div className="w-full mt-1">
        <DatePicker
          selected={activityForm.values.date}
          filterDate={futureDate}
          excludeDates={activitydates}
          name="date"
          onChange={(selecteddate) => {
            activityForm.setFieldValue("date", selecteddate);
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow focus:shadow-xl"
          dateFormat="dd/MM/yyyy"
          required
        />
      </div>
      <label htmlFor="sleep" className="mt-1">
        Sleep
      </label>
      <input
        type="number"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-1 shadow focus:shadow-xl"
        min="0"
        max="24"
        name="sleep"
        onChange={activityForm.handleChange}
        value={activityForm.values.sleep}
        required
      />
      <label htmlFor="qualityofsleep" className="mt-1">
        Quality of Sleep
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-1 shadow focus:shadow-xl"
        type="number"
        min="1"
        max="10"
        name="qualityofsleep"
        onChange={activityForm.handleChange}
        value={activityForm.values.qualityofsleep}
        required
      />
      <label className="mt-1" htmlFor="workout">
        Hours of Workout?
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-1 shadow focus:shadow-xl"
        type="number"
        min="0"
        max="6"
        name="workout"
        onChange={activityForm.handleChange}
        value={activityForm.values.workout}
        required
      />
      <div className="inline mt-1">
        <span className="mr-4">Did you meditate?</span>
        <label htmlFor="html" className="mr-1">
          No
        </label>
        <input
          type="radio"
          id="meditatefalse"
          name="meditate"
          value="no"
          onChange={activityForm.handleChange}
          checked={activityForm.values.meditate === "no"}
        />

        <label htmlFor="css" className="mr-1 ml-2">
          Yes
        </label>
        <input
          type="radio"
          id="meditatetrue"
          name="meditate"
          value="yes"
          onChange={activityForm.handleChange}
          checked={activityForm.values.meditate === "yes"}
        />
      </div>
      <label htmlFor="qualityofday" className="mt-1">
        Quality of Day
      </label>

      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-1 shadow focus:shadow-xl"
        type="number"
        min="1"
        max="10"
        name="qualityofday"
        onChange={activityForm.handleChange}
        value={activityForm.values.qualityofday}
        required
      />
      <div className="inline mt-1 w-full">
        <span className="mr-4">Did you work on a project</span>
        <label htmlFor="html" className="mr-1">
          No
        </label>
        <input
          type="radio"
          id="projectfalse"
          name="project"
          value="no"
          onChange={activityForm.handleChange}
          checked={activityForm.values.project === "no"}
        />

        <label htmlFor="css" className="mr-1 ml-2">
          Yes
        </label>
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
          <div className="mt-1 w-full lg:flex items-center">
            <select
              name="projectid"
              onChange={activityForm.handleChange}
              id="project"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded lg:w-1/2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow focus:shadow-xl"
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

            <label htmlFor="html" className="mr-2 ml-3 mt-2 lg:mt-0">
              Hours
            </label>
            <input
              type="number"
              className="bg-gray-200 mt-2 lg:mt-0 appearance-none border-2 border-gray-200 rounded py-2 px-4  text-gray-700 leading-tight flex-grow focus:outline-none focus:bg-white focus:border-purple-500 shadow focus:shadow-xl"
              min="0"
              max="24"
              name="projecthours"
              value={activityForm.values.projecthours}
              onChange={activityForm.handleChange}
            />
          </div>
        )}
      </div>

      <label className="mt-1" htmlFor="productivehours">
        Productive Hours
      </label>

      <input
        type="number"
        min="0"
        max="24"
        name="productivehours"
        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-1 shadow focus:shadow-xl"
        onChange={activityForm.handleChange}
        value={activityForm.values.productivehours}
        required
      />
      <div className="flex justify-center w-full">
        <button
          className={
            activityForm.errors.project
              ? "font-bold bg-red-400 rounded-md px-4 py-2 mt-3 min-w-max"
              : "font-bold bg-blue-400 rounded-md px-4 py-2 mt-3 min-w-max"
          }
          type="submit"
          disabled={activityForm.errors.project}
        >
          Update Activity
        </button>
      </div>
    </form>
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
      <>
        <div className="flex justify-end px-3 pt-3">
          <Link to="/activities">
            <button className="font-bold right-1 bg-blue-200 py-2 px-4 rounded-md">
              All Activities
            </button>
          </Link>
        </div>
        <div className="flex justify-center w-full">
          <ActivityForm projectnames={projectnames} activity={activity} />
        </div>
      </>
    );
};

export default EditActivity;
