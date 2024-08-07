import React from 'react';
import './DashHeader.css';
import accountImg from './account.png';
import findiconImg from './findicon.png';

function DashHeader() {
  return (
    <>
      <div className="dashheader-container">
        <div className="dashheader-header">
          {/* <div className="dashheader-left">
            <span className="dash-logo">MISA</span>
          </div> */}
          {/* <div className="dashheader-right"> */}
          <nav className="dash-navmenu">
            {/* <ul>
              <li>
                <a href="/settings">설정</a>
              </li>
            </ul> */}
          </nav>
          <div className="dashheader-actions">
            <div className="dashheader-search">
              <input
                type="text"
                className="dashsearch-input"
                placeholder="매장 검색"
              />
              <img
                src={findiconImg}
                alt="search icon"
                className="findicon-image"
              />
            </div>
            <div className="dashuser-profile">
              <a href="/profile">
                <img
                  src={accountImg}
                  alt="account"
                  className="dashaccount-image"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashHeader;
