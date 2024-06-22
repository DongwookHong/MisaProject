import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Fix/MenuBar.css';

function MenuBar({ menuOpen, closeMenu }) {
  return (
    <>
      <div
        className={`background-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}></div>
      <div className={`wrap-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="wrap-menubar">
          <div className="space" />
          <li className="menubar">
            <Link to="/main" onClick={closeMenu}>
              <h2>
                <span className="border-top">홈</span> 가기
              </h2>
            </Link>
          </li>
          <li className="menubar">
            <Link to="/menu" onClick={closeMenu}>
              <h2>
                <span className="border-top">매장</span> 찾기
              </h2>
            </Link>
          </li>
          <li className="menubar">
            <Link to="/parkinfo" onClick={closeMenu}>
              <h2>
                <span className="border-top">주차</span> 안내
              </h2>
            </Link>
          </li>
          <li className="menubar">
            <Link to="/parkinfo" onClick={closeMenu}>
              <h2>
                <span className="border-top">편의</span> 시설
              </h2>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuBar;
