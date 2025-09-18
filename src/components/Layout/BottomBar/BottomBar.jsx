import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, User } from 'lucide-react';
import './BottomBar.css';

const BottomBar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/leaves', label: 'Attendance Leave', icon: Calendar },
    { path: '/purchase', label: 'Purchase', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bottom-bar">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-bar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <IconComponent className="bottom-bar-icon" size={20} />
            <span className="bottom-bar-label">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
