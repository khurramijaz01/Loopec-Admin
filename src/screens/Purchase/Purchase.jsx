import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Package, Users, BarChart3 } from 'lucide-react';
import './Purchase.css';

const Purchase = () => {
  const [activeTab, setActiveTab] = useState('approved');

  const orders = [
    {
      id: 'PO-001',
      supplier: 'Tech Solutions Inc.',
      date: '2024-01-15',
      total: 2500.00,
      status: 'pending',
      items: 3
    },
    {
      id: 'PO-002',
      supplier: 'Office Supplies Co.',
      date: '2024-01-14',
      total: 450.00,
      status: 'approved',
      items: 5
    },
    {
      id: 'PO-003',
      supplier: 'Software Solutions',
      date: '2024-01-13',
      total: 1200.00,
      status: 'delivered',
      items: 2
    }
  ];

  const suppliers = [
    { id: 1, name: 'Tech Solutions Inc.', contact: 'john@techsolutions.com', rating: 4.8 },
    { id: 2, name: 'Office Supplies Co.', contact: 'sales@officesupplies.com', rating: 4.5 },
    { id: 3, name: 'Software Solutions', contact: 'info@software.com', rating: 4.9 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'delivered': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'approved': return 'rgba(16, 185, 129, 0.1)';
      case 'delivered': return 'rgba(59, 130, 246, 0.1)';
      case 'pending': return 'rgba(245, 158, 11, 0.1)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <div className="purchase-container">
      <div className="purchase-header">
        <h1>Purchase Management</h1>
        <p>Manage purchase orders and supplier relationships</p>
      </div>

      <div className="purchase-tabs">
        <button 
          className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          <CheckCircle size={16} />
          Approved
        </button>
        <button 
          className={`tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          <XCircle size={16} />
          Rejected
        </button>
        <button 
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <Clock size={16} />
          Pending
        </button>
      </div>

      <div className="purchase-content">
        {activeTab === 'approved' && (
          <div className="orders-section">
            <h2>Approved Purchase Orders</h2>
            <div className="orders-grid">
              {orders.filter(order => order.status === 'approved').map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.id}</h3>
                      <p>{order.supplier}</p>
                    </div>
                    <span 
                      className="status-badge"
                      style={{
                        color: getStatusColor(order.status),
                        backgroundColor: getStatusBg(order.status)
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{order.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.items}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="action-btn view">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="orders-section">
            <h2>Rejected Purchase Orders</h2>
            <div className="orders-grid">
              {orders.filter(order => order.status === 'rejected').map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.id}</h3>
                      <p>{order.supplier}</p>
                    </div>
                    <span 
                      className="status-badge"
                      style={{
                        color: getStatusColor(order.status),
                        backgroundColor: getStatusBg(order.status)
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{order.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.items}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="action-btn view">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="orders-section">
            <h2>Pending Purchase Orders</h2>
            <div className="orders-grid">
              {orders.filter(order => order.status === 'pending').map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.id}</h3>
                      <p>{order.supplier}</p>
                    </div>
                    <span 
                      className="status-badge"
                      style={{
                        color: getStatusColor(order.status),
                        backgroundColor: getStatusBg(order.status)
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{order.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.items}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="action-btn view">View Details</button>
                    <button className="action-btn approve">Approve</button>
                    <button className="action-btn reject">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;