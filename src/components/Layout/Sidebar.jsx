import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, User } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/leaves', label: 'Attendance Leave', icon: Calendar },
    { path: '/purchase', label: 'Purchase', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Loopec Admin</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <IconComponent className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
