import React from 'react';
import './AdminAddShop.css';
import DashSide from './DashSide';
import DashHeader from './DashHeader';
import ModifyStore from './ModifyStore.js';

function AdminModify() {
  return (
    <div className="admin-dashboard">
      <DashSide />
      <DashHeader />
      <div className="main-content">
        <ModifyStore />
      </div>
    </div>
  );
}

export default AdminModify;
