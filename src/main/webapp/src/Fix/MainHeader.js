import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Fix/MainHeader.css';
import { FaArrowLeft } from 'react-icons/fa';
import MenuBar from './MenuBar';

function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="main_header">
        <FaArrowLeft className="back-button" onClick={handleBackClick} />
        <div className="center-content">
          <Link to="/main" onClick={closeMenu}>
            <img
              className="Rogo"
              src={`${process.env.PUBLIC_URL}/img/logodown.png`}
              alt="MISA RODEO"
            />
          </Link>
        </div>
        <img
          className="menubtn"
          src={`${process.env.PUBLIC_URL}/img/menu.png`}
          alt="Menu"
          onClick={toggleMenu}
        />
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
    </>
  );
}

export default MainHeader;
