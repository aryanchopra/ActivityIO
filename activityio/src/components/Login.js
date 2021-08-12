import React from "react";
import { useFormik } from "formik";
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-4">
      <form action="" onSubmit={formik.handleSubmit} className="flex flex-col">
        <label htmlFor="email" className="self-start mt-2 font-bold ">
          E-mail
        </label>
        <input
          type="email"
          className="rounded-md max-h-24 p-1 w-full"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="Password" className="self-start mt-2 font-bold ">
          Password
        </label>
        <input
          type="password"
          className="rounded-md max-h-24 p-1 w-full"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
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
