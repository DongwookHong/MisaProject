import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/QRpage/LocSearch.css';
import MenuBar from '../Fix/MenuBar';
import IconLoc from '../asset/tool/locpin.png';
import SearchBtn from '../asset/tool/searchbtn3.png';
import Menu from '../asset/tool/menu.png';

function LocSearch({ floorData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const cleanedValue = value.trim().replace(/\s+/g, ' ').toLowerCase();
      const filteredStores = floorData.flatMap(floor => 
        floor.data.filter(store => 
          store.type === 'store' && 
          store.name.trim().replace(/\s+/g, ' ').toLowerCase().includes(cleanedValue)
        )
      );
      setResults(filteredStores);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
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
      navigateToStore(query);
    }
  };

  const handleIconClick = () => {
    navigateToStore(query);
  };

  const navigateToStore = (storeName) => {
    const cleanedName = storeName.trim().replace(/\s+/g, ' ').toLowerCase();
    const matchingStore = floorData.flatMap(floor => floor.data).find(
      store => store.type === 'store' && 
               store.name.trim().replace(/\s+/g, ' ').toLowerCase() === cleanedName
    );
    if (matchingStore) {
      navigate(`/findspot/${encodeURIComponent(matchingStore.name)}`);
    }
    setShowResults(false);
  };

  const handleResultClick = (storeName) => {
    setQuery(storeName);
    navigateToStore(storeName);
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
        <div className="search-bar" ref={searchRef}>
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
          {showResults && results.length > 0 && (
            <div className="search-results">
              {results.map((store, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => handleResultClick(store.name)}
                >
                  {store.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
    </>
  );
}

export default LocSearch;