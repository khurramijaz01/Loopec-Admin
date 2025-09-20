import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_URL_SINACO = import.meta.env.VITE_BASE_URL_SINACO;

export const LoginCall = async (body) => {
  const route = `${VITE_BASE_URL_SINACO}/api/auth/login`;
  console.log("route", route);

  return await axios.post(route, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const EmployeeData = async (employeeId) => {
  const route = `${VITE_BASE_URL}/sinaco/api/civ_employee/get-all?id=${employeeId}`;
  console.log(route, "route");

  return await axios.get(route, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
