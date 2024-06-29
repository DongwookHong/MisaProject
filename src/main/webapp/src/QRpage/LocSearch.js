import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import '../style/QRpage/LocSearch.css';
import MenuBar from '../Fix/MenuBar'; // MenuBar 컴포넌트 가져오기
import IconLoc from '../asset/tool/locpin.png';
import SearchBtn from '../asset/tool/searchbtn3.png';
import Menu from '../asset/tool/menu.png';
import jsonData from '../test.json';

function LocSearch() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  //검색 하면 나오게끔
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(jsonData); // 처음에 모든 데이터를 결과로 설정
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    console.log(value);
    if (value) {
      const cleanedValue = value.trim().replace(/\s+/g, ' ').toLowerCase();
      const filteredStores = jsonData.filter((store) =>
        store.store_name
          .trim()
          .replace(/\s+/g, ' ')
          .toLowerCase()
          .includes(cleanedValue)
      );
      setResults(filteredStores);
    } else {
      setResults(jsonData);
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigateToStore();
    }
  };

  const handleIconClick = () => {
    navigateToStore();
  };

  const navigateToStore = () => {
    const cleanedQuery = query.trim().replace(/\s+/g, ' ').toLowerCase();
    const matchingStore = jsonData.find(
      (store) =>
        store.store_name.trim().replace(/\s+/g, ' ').toLowerCase() ===
        cleanedQuery
    );
    if (matchingStore) {
      navigate(`/findspot/${matchingStore.id}`);
    }
  };
  return (
    <>
      <div className="locsearch-header">
        <div className="header-content">
          <div className="search-menu">
            <img
              className="logo-item"
              src={IconLoc}
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
            <img src={Menu} alt="menu-bar" width="30" height="30" />
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="장소 위치를 찾는 곳을 입력해주세요"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <img
            className="search-icon"
            src={SearchBtn}
            onClick={handleIconClick}
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
