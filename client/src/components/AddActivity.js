import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newActivity } from "../reducers/activityReducer";
import { toast } from "react-toastify";
import NavBtn from "./NavBtn";
const ActivityForm = ({ projectnames }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disableBtn, setDisableBtn] = useState(false);
  const activitydates = useSelector((state) =>
    state.activities.map((activity) => new Date(activity.date))
  );
  const futureDate = (date) => {
    return new Date() > date;
  };
  const activityForm = useFormik({
    // enableReinitialize: true,
    initialValues: {
      date: new Date(),
      sleep: 6,
      qualityofsleep: 1,
      workout: 0,
      qualityofday: 1,
      productivehours: 0,
      meditate: "no",
      project: "no",
      projectid: "none",
      projecthours: 0,
    },
    onSubmit: async (values) => {
      setDisableBtn(true);

      const formValues = { ...values, date: values.date.toDateString() };

      dispatch(newActivity(formValues))
        .then((res) => {
          history.push("");
          toast.success("Added activity", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        })
        .catch((err) =>
          toast.error("Error!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          })
        );
    },
    validate: (values) => {
      let errors = {};

      if (values.project === "yes" && values.projectid === "none")
        errors.project = "Required";

      return errors;
    },
  });
  return (
    <form
      className="inline-flex flex-col lg:w-1/3 w-1/2 items-start p-1 dark:text-white"
      action=""
      onSubmit={activityForm.handleSubmit}
    >
      <label htmlFor="date" className="mt-1">
        Date
      </label>

      <div className="w-full mt-1 ">
        <DatePicker
          selected={activityForm.values.date}
          name="date"
          onChange={(selecteddate) => {
            activityForm.setFieldValue("date", selecteddate);
          }}
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false}
          excludeDates={activitydates}
          filterDate={futureDate}
          placeholderText="Activity Date"
          className="forminput"
          required
        />
      </div>
      <label htmlFor="sleep" className="mt-1">
        Sleep (hours)
      </label>
      <input
        type="number"
        className="forminput"
        min="0"
        max="24"
        name="sleep"
        onChange={activityForm.handleChange}
        value={activityForm.values.sleep}
        required
      />
      <label htmlFor="qualityofsleep" className="mt-1">
        Quality of Sleep (1-10)
      </label>
      <input
        className="forminput"
        type="number"
        min="1"
        max="10"
        name="qualityofsleep"
        onChange={activityForm.handleChange}
        value={activityForm.values.qualityofsleep}
        required
      />
      <label className="mt-1" htmlFor="workout">
        Workout (hours)
      </label>
      <input
        className="forminput"
        type="number"
        min="0"
        max="6"
        name="workout"
        onChange={activityForm.handleChange}
        value={activityForm.values.workout}
        required
      />
      <div className="inline mt-1">
        <span className=" mr-4">Did you meditate?</span>
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
        Quality of Day (1-10)
      </label>

      <input
        className="forminput"
        type="number"
        min="1"
        max="10"
        name="qualityofday"
        onChange={activityForm.handleChange}
        value={activityForm.values.qualityofday}
        required
      />
      <div className="inline mt-1 w-full">
        <span className=" mr-4">Did you work on a project?</span>
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
              className=" lg:w-1/2  bg-gray-200 dark:bg-gray-400 dark:border-gray-300 dark:focus:bg-gray-100 dark:focus:border-gray-800 dark:text-white dark:focus:text-black appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-700 mt-1 shadow focus:shadow-xl"
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
            <label htmlFor="html" className="mr-2 ml-3 mt-2 lg:mt-0">
              Hours
            </label>
            <input
              type="number"
              className="bg-gray-200 mt-2 lg:mt-0 appearance-none border-2 border-gray-200 rounded py-2 px-4  text-gray-700 leading-tight flex-grow focus:outline-none focus:bg-white  shadow focus:shadow-xl focus:border-purple-500 "
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
        className="forminput"
        onChange={activityForm.handleChange}
        value={activityForm.values.productivehours}
        required
      />

      <div className="flex justify-center w-full">
        <button
          className={
            activityForm.errors.project
              ? " bg-red-500 rounded-md px-4 py-2 mt-3 min-w-max"
              : "formbtn"
          }
          type="submit"
          disabled={activityForm.errors.project || disableBtn}
        >
          Record Activity
        </button>
      </div>
    </form>
  );
};

const AddActivity = () => {
  const projectnames = useSelector((state) =>
    state.projects
      .filter((project) => !project.completed)
      .map((project) => {
        return {
          name: project.name,
          id: project.id,
        };
      })
  );

  return (
    <>
      <div className="flex items-center justify-end h-1/6 px-3 pt-3">
        <NavBtn text="All Activities" link="activities" />
      </div>

      {/* <div>
        <span className="text-xl text-center font-bold mt-1">
          Hey Aryan, how was your day?
        </span>
      </div> */}
      <div className="flex h-5/6 justify-center">
        <ActivityForm projectnames={projectnames} />
      </div>
    </>
  );
};

export default AddActivity;
