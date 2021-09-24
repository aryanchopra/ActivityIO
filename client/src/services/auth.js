import axios from "axios";
// const BASE_URL = "http://localhost:3003/api/";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:3003/api/";

const login = async (credentials) => {
  console.log("login service called");
  const response = await axios.post(`${BASE_URL}login`, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${BASE_URL}user`, credentials);
  return response.data;
};

export default { login, register };
