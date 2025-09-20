import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_URL_SINACO = import.meta.env.VITE_BASE_URL_SINACO;

export const employeeLeavesGetEmpLeavesCall = async (ReportTo) => {
  const route = `${VITE_BASE_URL}/sinaco/api/employee_leaves/get-team-leaves?ReportTo=${ReportTo}`;
  console.log(route, "route");

  return await axios.get(route, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // params: {
    //   ReportTo,
    // },
  });
};

export const updateLeaveStatus = async (body) => {
  const route = `${VITE_BASE_URL}/sinaco/api/employee_leaves/update-leave`;
  console.log("route", route);
  return await axios.post(route, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
