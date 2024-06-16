import React from 'react';
import '../style/Fix/MenuOpen.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';

function Banner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="banner">
      <div className="banner-header">
        <BiSolidDownArrow />
        힐스테이트 A동 1층
        <img
          className="menubtn"
          // src={require('../img/menu.png')}
          alt="Menu"
          onClick={toggleMenu}
        />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      {menuOpen && <MenuContent />}
    </div>
  );
}

function MenuContent() {
  return (
    <div className="wrap-menu">
      <div className="wrap-menubar">
        <div className="menubar1">
          <Link to="/search">
            <h2>매장찾기</h2>
          </Link>
        </div>
        <div>
          <h2>주차안내</h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
