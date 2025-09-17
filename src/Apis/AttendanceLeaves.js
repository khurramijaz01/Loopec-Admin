import axios from "axios";

export const employeeLeavesGetEmpLeavesCall = async (ReportTo) => {
    const route = `/sinaco/api/employee_leaves/get-emp-leaves`;
    console.log(route, "route");
  
    return await axios.get(route, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        ReportTo,
      },
    });
};


export const updateLeaveStatus = async (body) => {
  const route = `/sinaco/api/employee_leaves/update-leave`;
  console.log('route', route);
  return await axios.post(route, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};


