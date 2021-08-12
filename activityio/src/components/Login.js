import React, { useState, useEffect } from "react";
import authService from "../services/auth";
import { useFormik } from "formik";
import validator from "validator";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginUser(credentials));
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) errors.email = "Required";
      else {
        if (!validator.isEmail(values.email))
          errors.email = "Invalid email format!";
      }
      if (!values.password) errors.password = "Required";

      return errors;
    },
  });
  return (
    <div className="p-4">
      <form
        action=""
        onSubmit={loginForm.handleSubmit}
        className="flex flex-col"
      >
        <label htmlFor="email" className="self-start mt-2 font-bold ">
          E-mail
        </label>
        <input
          type="email"
          className="rounded-md max-h-24 p-1 w-full"
          id="email"
          name="email"
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.email}
        />
        {loginForm.errors.email && loginForm.touched.email ? (
          <div className="text-red-400 mt-1"> {loginForm.errors.email} </div>
        ) : null}
        <label htmlFor="Password" className="self-start mt-2 font-bold ">
          Password
        </label>
        <input
          type="password"
          className="rounded-md max-h-24 p-1 w-full"
          id="password"
          name="password"
          onBlur={loginForm.handleBlur}
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
        {loginForm.errors.password && loginForm.touched.password ? (
          <div className="text-red-400 mt-1"> {loginForm.errors.password} </div>
        ) : null}
        <button
          type="submit"
          className="bg-blue-500 self-center w-1/2 h-10 mt-3 font-bold rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
