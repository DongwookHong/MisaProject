import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/MapGuide/LocSearch.css';
import MenuBar from '../Fix/MenuBar'; // MenuBar 컴포넌트 가져오기
import PurpleLoc from '../asset/tool/locpin.png';
import SearchBtn from '../asset/tool/searchbtn3.png';

function LocSearch() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // const handleFocus = () => {
  //   navigate('/searchshop'); // 검색 바에 포커스가 주어졌을 때 /menu 경로로 이동
  // };

  return (
    <>
      <div className="locsearch-header">
        <div className="header-content">
          <div className="search-menu">
            <img
              className="current-loc"
              src={PurpleLoc}
              alt="Logolocation"
              width="20"
              height="20"
            />
          </div>
          <div className="title">
            현재 위치는{' '}
            <span className="current-location">힐스테이트 A동 1층</span>
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            <img
              src="/icon/menubar.png"
              alt="menu-bar"
              width="30"
              height="30"
            />
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="찾는 곳을 입력해주세요"
            // onFocus={handleFocus} // 검색 바에 포커스가 주어졌을 때 handleFocus 함수 호출
          />
          <img
            className="search-icon"
            src="/icon/readglass.png"
            alt="search-bar"
            width="32"
            height="32"
          />
        </div>
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
    </>
  );
}

export default LocSearch;
