// MenuBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Fix/MenuBar.css';

function MenuBar({ menuOpen, closeMenu }) {
  return (
    <>
      <div className={`background-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`wrap-menu ${menuOpen ? 'open' : ''}`}>
        <div className="wrap-menubar">
          <div className="menubar1">
            <Link to="/menu" onClick={closeMenu}>
              <h2>매장찾기</h2>
            </Link>
          </div>
          <div className="menubar2">
            <Link to="/parkinfo" onClick={closeMenu}>
              <h2>주차안내</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuBar;
