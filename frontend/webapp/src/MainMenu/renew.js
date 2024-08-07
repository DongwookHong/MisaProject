import React from 'react';
import { Link } from 'react-router-dom';
import './renew.css';

function Renew() {
  return (
    <div className="renew-container">
      <div className="renew-content">
        <h1 className="renew-title">
          <span className="renew-brand">힐스테이트</span>
          <span className="renew-brand">롯데캐슬</span>
        </h1>
        <div className="renew-links">
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="renew-link">
            <span className="renew-link-text">11BL</span>
            <span className="renew-link-icon">›</span>
          </Link>
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="renew-link">
            <span className="renew-link-text">12BL</span>
            <span className="renew-link-icon">›</span>
          </Link>
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="renew-link">
            <span className="renew-link-text">LOTTE</span>
            <span className="renew-link-icon">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Renew;
