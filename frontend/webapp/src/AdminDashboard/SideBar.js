import React from 'react';
import './SideBar.css';
import recordImage from './record.png';
import plusImage from './plus.png';
import logoutImage from './logouts.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="admin-logo">MISA</span>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-item">
          <div>
            <div>
              <img src={recordImage} alt="Record" className="sidebar-image" />
            </div>
            <div>
              <a href="/clients">상점 수정</a>
            </div>
          </div>
        </div>
        <div className="sidebar-item">
          <div>
            <img src={plusImage} alt="Plus" className="sidebar-image" />
          </div>
          <div>
            <a href="/monitoring">상점 등록</a>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <button className="logout-button">
          <img src={logoutImage} alt="Logout" className="sidebar-image" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
