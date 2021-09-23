import React from "react";
import { useFormik } from "formik";
import validator from "validator";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("submitted");
      const credentials = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginUser(credentials))
        .then((res) => {
          toast.success("Logged in!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });

          history.push("/");
        })
        .catch((err) => {
          toast.error("Invalid username or password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        });
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
        <label htmlFor="email" className="self-start mt-2 font- ">
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
          <div className="text-red-600 text-xs mt-1">
            {" "}
            {loginForm.errors.email}{" "}
          </div>
        ) : null}
        <label htmlFor="Password" className="self-start mt-2 font- ">
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
          <div className="text-red-600 text-xs mt-1">
            {" "}
            {loginForm.errors.password}{" "}
          </div>
        ) : null}
        <button
          type="submit"
          className=" self-center w-1/3 h-10 mt-3 bg-gray-600 hover:bg-gray-300 hover:border-gray-100  hover:text-gray-600 text-white rounded-md mr-4 py-2 px-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
