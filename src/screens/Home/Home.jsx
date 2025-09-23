import React, { useEffect, useState } from "react";
import { Calendar, ShoppingCart, Clock, User } from "lucide-react";
import "./Home.css";
import { useAuth } from "../../contexts/AuthContext";
import { employeeLeavesGetEmpLeavesCall } from "../../Apis/AttendanceLeaves";
import LeaveSkeleton from "../../components/SkeletonLoading/Skeleton";

const Home = () => {
  const { userData, empData } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(empData, "Employee Data");
  const getMyTeamLeaves = async () => {
    try {
      setIsLoading(true);
      const { data } = await employeeLeavesGetEmpLeavesCall(
        userData?.EmployeeId
      );
      if (data?.status === 200) {
        setLeaveRequests(data?.result?.team_attendance?.rows);
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
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-left">
          <div className="header-title-section">
            <div>
              <h1>Home</h1>
              <p>{empData?.Name}</p>
            </div>
            <div className="header-right">
              <div className="user-avatar">
                {empData?.EmpPic ? (
                  <img
                    src={empData?.EmpPic}
                    alt="Employee Picture"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <User size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-cards">
        {isLoading ? (
          <LeaveSkeleton count={1} />
        ) : (
          <div className="main-card">
            <div className="card-header">
              <div className="card-icon">
                <Calendar size={24} />
              </div>
              <div className="total-number">
                <h1 className="main-number">{leaveRequests.length}</h1>
                <p className="main-number-text">Total</p>
              </div>
            </div>
            <div className="card-content">
              <h2>ATTENDANCE LEAVE</h2>
              <div className="sub-text">
                {leaveRequests.filter((req) => req.leaveStatus === 4).length}{" "}
                pending approval
              </div>
            </div>
          </div>
        )}

        {/* <div className="main-card">
          <div className="card-header">
            <div className="card-icon">
              <ShoppingCart size={24} />
            </div>
            <div className="trend-indicator">
              <TrendingUp size={14} />
              <span>+8%</span>
            </div>
          </div>
          <div className="card-content">
            <h2>PURCHASE ORDERS</h2>
            <div className="main-number">18</div>
            <div className="sub-text">2 awaiting approval</div>
          </div>
        </div> */}
      </div>

      <div className="recent-activity">
        <div className="activity-card">
          <div className="activity-header">
            <h2>Recent Activity</h2>
            {/* <button className="view-all-btn">View All</button> */}
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon approved">
                <Calendar size={16} />
              </div>
              <div className="activity-content">
                <p>Attendance leave approved for Hafiz Hasnain</p>
                <span className="activity-time">
                  <Clock size={12} />2 minutes ago
                </span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon pending">
                <ShoppingCart size={16} />
              </div>
              <div className="activity-content">
                <p>New purchase order from Tech Solutions</p>
                <span className="activity-time">
                  <Clock size={12} />
                  15 minutes ago
                </span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon rejected">
                <Calendar size={16} />
              </div>
              <div className="activity-content">
                <p>Attendance leave rejected for Mike Wilson</p>
                <span className="activity-time">
                  <Clock size={12} />1 hour ago
                </span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon approved">
                <ShoppingCart size={16} />
              </div>
              <div className="activity-content">
                <p>Purchase order approved for Office Supplies</p>
                <span className="activity-time">
                  <Clock size={12} />2 hours ago
                </span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon pending">
                <Calendar size={16} />
              </div>
              <div className="activity-content">
                <p>New attendance leave request from David Brown</p>
                <span className="activity-time">
                  <Clock size={12} />3 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
