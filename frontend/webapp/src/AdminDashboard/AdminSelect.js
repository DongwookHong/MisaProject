import React from 'react';
import './AdminAddShop.css';
import DashSide from './DashSide';
import DashHeader from './DashHeader';
import SelectShop from './SelectShop.js';

function AdminSelect() {
  return (
    <div className="admin-dashboard">
      <DashSide />
      <DashHeader />
      <div className="main-content">
        <SelectShop />
      </div>
    </div>
  );
}

export default AdminSelect;
