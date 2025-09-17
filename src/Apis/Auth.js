import axios from "axios";

export const LoginCall = async (body) => {
  const route = `api/auth/login`;
  console.log("route", route);

  return await axios.post(route, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const EmployeeData = async (employeeId) => {
  const route = `sinaco/api/civ_employee/get-all`;
  console.log(route, "route");

  return await axios.get(route, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {
      employeeId,
    },
  });
};
