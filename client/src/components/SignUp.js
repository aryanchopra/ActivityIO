import React, { useState } from "react";
import { useFormik } from "formik";
import validator from "validator";
import { toast } from "react-toastify";
import SignupService from "../services/auth";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [disableBtn, setDisableBtn] = useState(false);
  const loginForm = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setDisableBtn(true);
      const credentials = {
        name: values.fullname,
        email: values.email,
        password: values.password,
      };
      try {
        const res = await SignupService.register(credentials);
        toast.success("Signed up!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        history.push("/login");
      } catch (err) {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        setDisableBtn(false);
      }
    },
    validate: (values) => {
      let errors = {};

      if (
        !validator.isStrongPassword(values.password, [
          {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minSymbols: 1,
          },
        ])
      )
        errors.password =
          "Password must be above 8 alphanumeric chracters and have a special character";

      if (!values.fullname.trim()) errors.fullname = "Required";

      if (!values.email) errors.email = "Required";
      else {
        if (!validator.isEmail(values.email))
          errors.email = "Invalid email format!";
      }
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
        <label htmlFor="fullname" className="self-start mt-2  ">
          Full Name
        </label>
        <input
          type="text"
          className="rounded-md max-h-24 p-1 w-full"
          id="fullname"
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.fullname}
        />
        {loginForm.errors.fullname && loginForm.touched.fullname ? (
          <div className="text-red-600 text-xs mt-1">
            {" "}
            {loginForm.errors.fullname}{" "}
          </div>
        ) : null}
        <label htmlFor="email" className="self-start mt-2  ">
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
        <label htmlFor="Password" className="self-start mt-2  ">
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
          className="self-center w-1/2 md:w-1/3 h-10 mt-3 bg-gray-600 hover:bg-gray-300 hover:border-gray-100  hover:text-gray-600 text-white rounded-md  py-2 px-4"
          disabled={disableBtn}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default Signup;

// import React from "react";
// import useField from "../hooks/useField";
// const SignUp = () => {
//   const fullname = useField("text");
//   const email = useField("text");
//   const password = useField("password");

//   return (
//     <div className="p-4">
//       <form action="" className="flex flex-col">
//         <label htmlFor="fullname" className="self-start mt-2  ">
//           Full Name
//         </label>
//         <input
//           {...fullname}
//           className="rounded-md max-h-24 p-1 w-full"
//           id="fullname"
//         />

//         <label htmlFor="email" className="self-start mt-2  ">
//           E-mail
//         </label>
//         <input
//           {...email}
//           type="text"
//           className="rounded-md max-h-24 p-1 w-full"
//           id="email"
//         />

//         <label htmlFor="Password" className="self-start mt-2  ">
//           Password
//         </label>
//         <input
//           {...password}
//           type="text"
//           className="rounded-md max-h-24 p-1 w-full"
//           id="password"
//         />
//         <button className="bg-blue-500 self-center w-1/2 h-10 mt-3  rounded-md">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };
// export default SignUp;
