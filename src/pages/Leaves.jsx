import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Leaves.css";
import {
  employeeLeavesGetEmpLeavesCall,
  updateLeaveStatus,
} from "../Apis/AttendanceLeaves";
import { useAuth } from "../contexts/AuthContext";
import LeaveSkeleton from "../components/SkeletonLoading/Skeleton";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Leaves = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  const status = ["pending", "approved", "rejected", "all"];
  const leave_status = {
    accept: 6,
    reject: 2,
  };

  const getMyTeamLeaves = async () => {
    try {
      setIsLoading(true);
      const { data } = await employeeLeavesGetEmpLeavesCall(
        userData?.EmployeeId
      );
      if (data?.status === 200) {
        setLeaveRequests(data?.result?.team_attendance);
      }
    } catch (err) {
      console.error("Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.EmployeeId) {
      getMyTeamLeaves();
    }
  }, [userData]);

  const getNormalizedStatus = (status) => {
    if (status === 6) return "approved";
    if (status === 2) return "rejected";
    if (status === 0) return "pending";
    if (typeof status === "string") return status.toLowerCase();
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#10b981";
      case "rejected":
        return "#ef4444";
      case "pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "approved":
        return "rgba(16, 185, 129, 0.1)";
      case "rejected":
        return "rgba(239, 68, 68, 0.1)";
      case "pending":
        return "rgba(245, 158, 11, 0.1)";
      default:
        return "rgba(107, 114, 128, 0.1)";
    }
  };

  const onHandleAcceptReject = async (status_id, request) => {
    let object = {
      EmpLeaveIDFK: request?.Id,
      StartDate: request?.StartDate,
      EndDate: request?.EndDate,
      Days: request.days,
      StatusIDFK: status_id,
      FirstApprovedBy: userData.UserId,
      ApprovalName: request.Name,
      Comments: "",
    };

    try {
      setIsProcess(true);
      const response = await updateLeaveStatus(object);
      if (response?.data?.error_code === 0) {
        getMyTeamLeaves();
        toast.success("Login Successful!");
      } else {
        alert("Loopec", response?.data?.message || "Error updating status");
      }
    } catch (error) {
      console.log("err", error);
    } finally {
      setIsProcess(false);
    }
  };

  return (
    <div className="leaves-container">
      <div className="leaves-header">
        <h1>Attendance Leave Management</h1>
      </div>

      {/* Tabs */}
      <div className="leaves-tabs">
        {status.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "approved" && <CheckCircle size={16} />}
            {tab === "rejected" && <XCircle size={16} />}
            {tab === "pending" && <Clock size={16} />}
            {tab === "all" && <CheckCircle size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="leaves-content">
        <div className="requests-section">
          <h2>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Leave
            Requests
          </h2>

          <div className="requests-grid">
            {isLoading ? (
              <LeaveSkeleton count={3} />
            ) : (
              leaveRequests
                .filter((req) =>
                  activeTab === "all"
                    ? true
                    : getNormalizedStatus(req.leaveStatus) === activeTab
                )
                .map((request) => {
                  const normalized = getNormalizedStatus(request.leaveStatus);
                  return (
                    <div key={request.Id} className="request-card">
                      <div className="request-header">
                        <div className="employee-info">
                          <h3>{request.Name || "Unknown Employee"}</h3>
                        </div>
                        <span
                          className="status-badge"
                          style={{
                            color: getStatusColor(normalized),
                            backgroundColor: getStatusBg(normalized),
                          }}
                        >
                          {normalized.charAt(0).toUpperCase() +
                            normalized.slice(1)}
                        </span>
                      </div>

                      <div className="request-details">
                        <div className="detail-item">
                          <span className="detail-label">Duration:</span>
                          <span className="detail-value">
                            {request.days} days
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">From:</span>
                          <span className="detail-value">
                            {new Date(request.StartDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">To:</span>
                          <span className="detail-value">
                            {new Date(request.EndDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reason:</span>
                          <span className="detail-value">
                            {request.LeaveDescription || "N/A"}
                          </span>
                        </div>
                      </div>

                      {normalized === "pending" && (
                        <div className="request-actions">
                          <button
                            className="action-btn approve"
                            onClick={() =>
                              onHandleAcceptReject(leave_status.accept, request)
                            }
                          >
                            {isProcess ? (
                              <ClipLoader size={18} color="#fff" />
                            ) : (
                              "Approve"
                            )}
                          </button>
                          <button
                            className="action-btn reject"
                            onClick={() =>
                              onHandleAcceptReject(leave_status.reject, request)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
