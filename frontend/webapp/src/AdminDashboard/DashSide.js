import React from 'react';
import './DashSide.css';
import recordImage from './record.png';
import plusImage from './plus.png';
import logoutImage from './logouts.png';

function DashSide() {
  return (
    <div className="dash-sidebar">
      <div className="dashsidebar-logo">
        <span className="dash-logo">MISA</span>
      </div>
      <div className="dashside-menu">
        <div className="dashside-item">
          <div>
            <div>
              <img src={recordImage} alt="Record" className="dashside-image" />
            </div>
            <div>
              <a href="/clients">상점 조회</a>
            </div>
          </div>
        </div>
        <div className="dashside-item">
          <div>
            <img src={plusImage} alt="Plus" className="dashside-image" />
          </div>
          <div>
            <a href="/monitoring">상점 등록</a>
          </div>
        </div>
      </div>
      <div className="dashside-footer">
        <button className="logout-button">
          <img src={logoutImage} alt="Logout" className="dashside-image" />
        </button>
      </div>
    </div>
  );
}

export default DashSide;
