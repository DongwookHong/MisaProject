import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Fix/MainHeader.css';
import MenuBar from './MenuBar';
import Menu from '../asset/tool/menu.png';

function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="main_header">
        <div className="logo-container">
          <Link to="/" onClick={closeMenu}>
            <img
              className="logo"
              src={`${process.env.PUBLIC_URL}/img/misalogo.png`}
              alt="MISA RODEO"
            />
          </Link>
        </div>
        <div className="menu-container">
          <img className="menubtn" src={Menu} alt="Menu" onClick={toggleMenu} />
        </div>
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
    </>
  );
}

export default MainHeader;
