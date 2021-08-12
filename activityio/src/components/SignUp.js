import React from "react";
import useField from "../hooks/useField";
const SignUp = () => {
  const fullname = useField("text");
  const email = useField("text");
  const password = useField("password");

  return (
    <div className="p-4">
      <form action="" className="flex flex-col">
        <label htmlFor="fullname" className="self-start mt-2 font-bold ">
          Full Name
        </label>
        <input
          {...fullname}
          className="rounded-md max-h-24 p-1 w-full"
          id="fullname"
        />

        <label htmlFor="email" className="self-start mt-2 font-bold ">
          E-mail
        </label>
        <input
          {...email}
          type="text"
          className="rounded-md max-h-24 p-1 w-full"
          id="email"
        />

        <label htmlFor="Password" className="self-start mt-2 font-bold ">
          Password
        </label>
        <input
          {...password}
          type="text"
          className="rounded-md max-h-24 p-1 w-full"
          id="password"
        />
        <button className="bg-blue-500 self-center w-1/2 h-10 mt-3 font-bold rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
