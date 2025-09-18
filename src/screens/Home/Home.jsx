import React from 'react';
import { Calendar, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome back, John! 👋</h1>
        <p>Here's what's happening with your business today.</p>
      </div>

      <div className="main-cards">
        <div className="main-card">
          <div className="card-header">
            <div className="card-icon">
              <Calendar size={24} />
            </div>
            <div className="trend-indicator">
              <TrendingUp size={14} />
              <span>+12%</span>
            </div>
          </div>
          <div className="card-content">
            <h2>ATTENDANCE LEAVE</h2>
            <div className="main-number">24</div>
            <div className="sub-text">3 pending approval</div>
          </div>
        </div>

        <div className="main-card">
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
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-card">
          <div className="activity-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon approved">
                <Calendar size={16} />
              </div>
              <div className="activity-content">
                <p>Attendance leave approved for Sarah Johnson</p>
                <span className="activity-time">
                  <Clock size={12} />
                  2 minutes ago
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
                  <Clock size={12} />
                  1 hour ago
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
                  <Clock size={12} />
                  2 hours ago
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
                  <Clock size={12} />
                  3 hours ago
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
