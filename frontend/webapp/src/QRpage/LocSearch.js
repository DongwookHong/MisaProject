import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const { id } = useParams();
  const [currentLocation, setCurrentLocation] = useState('알 수 없는 위치');

  const [selectedResult, setSelectedResult] = useState(null);
  useEffect(() => {
    console.log('Location code (id):', id);

    if (id && id.length >= 2) {
      const building = parseInt(id[0]);
      const floor = parseInt(id[1]);
      // console.log('Building:', building, 'Floor:', floor);

      let locationString = '';

      switch (building) {
        case 1:
          locationString = '힐스테이트 A동';
          break;
        case 2:
          locationString = '힐스테이트 B동';
          break;
        case 3:
          locationString = '롯데캐슬';
          break;
        default:
          locationString = '알 수 없는 위치';
      }

      if (!isNaN(floor)) {
        locationString += ` ${floor}층`;
      }

      // console.log('Location string:', locationString);
      setCurrentLocation(locationString);
    } else {
      // console.log('No valid location code provided');
      setCurrentLocation('알 수 없는 위치');
    }
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setQuery(value);
  //   if (value) {
  //     const cleanedValue = value.trim().replace(/\s+/g, ' ').toLowerCase();
  //     const filteredStores = floorData.flatMap((floor) =>
  //       floor.data.filter(
  //         (store) =>
  //           store.type === 'store' &&
  //           store.name
  //             .trim()
  //             .replace(/\s+/g, ' ')
  //             .toLowerCase()
  //             .includes(cleanedValue)
  //       )
  //     );
  //     setResults(filteredStores);
  //     setShowResults(true);
  //   } else {
  //     setResults([]);
  //     setShowResults(false);
  //   }
  // };
  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const cleanedValue = value.trim().replace(/\s+/g, ' ').toLowerCase();
      const filteredStores = floorData.flatMap((floor) =>
        floor.data.filter(
          (store) =>
            store &&
            store.type === 'store' &&
            store.name &&
            store.name
              .trim()
              .replace(/\s+/g, ' ')
              .toLowerCase()
              .includes(cleanedValue)
        )
      );
      setResults(filteredStores);
      setShowResults(true);

      if (filteredStores.length === 1) {
        setSelectedResult(filteredStores[0]);
      } else {
        setSelectedResult(null);
      }
    } else {
      setResults([]);
      setShowResults(false);
      setSelectedResult(null);
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const performSearch = () => {
    console.log(
      'Performing search. Query:',
      query,
      'Selected result:',
      selectedResult
    ); // 디버깅을 위해 추가
    if (selectedResult) {
      navigateToStore(selectedResult.name);
    } else if (results.length === 1) {
      navigateToStore(results[0].name);
    } else if (query) {
      const matchingStore = results.find(
        (store) =>
          store.name.trim().replace(/\s+/g, ' ').toLowerCase() ===
          query.trim().replace(/\s+/g, ' ').toLowerCase()
      );
      if (matchingStore) {
        navigateToStore(matchingStore.name);
      } else {
        console.log('No exact matching store found for query:', query);
      }
    } else {
      console.log('No query or selected result');
    }
    setShowResults(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 폼 제출 방지
      performSearch();
    }
  };

  const handleIconClick = () => {
    performSearch();
  };

  const handleResultClick = (store) => {
    console.log('Clicked store:', store); // 디버깅을 위해 추가
    if (store && typeof store === 'object' && store.name) {
      setQuery(store.name);
      setSelectedResult(store);
      navigateToStore(store.name);
    } else {
      console.log('Invalid store data:', store);
    }
  };

  // JSX 부분에서 검색 결과 렌더링을 수정
  {
    showResults && results.length > 0 && (
      <div className="search-results">
        {results.map((store, index) => (
          <div
            key={index}
            className="search-result-item"
            onClick={() => handleResultClick(store)}>
            {store.name}
          </div>
        ))}
      </div>
    );
  }
  // navigateToStore 함수 수정
  const navigateToStore = (storeName) => {
    console.log('Navigating to store:', storeName); // 디버깅을 위해 추가
    if (storeName && typeof storeName === 'string') {
      const cleanedName = storeName.trim().replace(/\s+/g, ' ').toLowerCase();
      const matchingStore = floorData
        .flatMap((floor) => floor.data)
        .find(
          (store) =>
            store.type === 'store' &&
            store.name.trim().replace(/\s+/g, ' ').toLowerCase() === cleanedName
        );
      if (matchingStore) {
        navigate(`/findspot/${encodeURIComponent(matchingStore.name)}`);
      } else {
        console.log('No matching store found for:', cleanedName);
      }
    } else {
      console.log('Invalid store name:', storeName);
    }
    setShowResults(false);
  };
  // const handleResultClick = (store) => {
  //   if (store && store.name) {
  //     setQuery(store.name);
  //     navigateToStore(store.name);
  //   } else {
  //     console.log('Invalid store data');
  //   }
  // };
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
            <span className="current-location">{currentLocation}</span>
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            <img src={Menu} alt="menu-bar" width="30" height="30" />
          </div>
        </div>
        <div className="search-input-bar" ref={searchRef}>
          <input
            type="text"
            placeholder="장소 위치 찾는 곳을 입력해주세요"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            style={{ border: 'none', outline: 'none' }}
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
                  onClick={() => handleResultClick(store.name)}>
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
