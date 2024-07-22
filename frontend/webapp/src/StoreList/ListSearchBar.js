import React, { useState, useEffect } from 'react';
import '../style/StoreList/SearchBar.css';
import Select from 'react-select';
import Findimogi from '../asset/tool/searchbtn3.png';

const ListSearchBar = ({ setFilteredStores, allStores }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDong, setSelectedDong] = useState(null);
  const [selectedCheung, setSelectedCheung] = useState(null);

  const getModifiedBuildingDong = (buildingName, buildingDong) => {
    if (buildingDong === 'A') return `${buildingName} 12BL`;
    if (buildingDong === 'B') return `${buildingName} 11BL`;
    return `${buildingName} ${buildingDong}`;
  };

  const dongOptions = Array.from(
    new Set(
      allStores.map((store) => 
        getModifiedBuildingDong(store.buildingName, store.buildingDong)
      )
    )
  ).map((dong) => ({ value: dong, label: dong }));

  const cheungOptions = Array.from(
    new Set(allStores.map((store) => store.floorNumber))
  )
    .map((cheung) => ({
      value: cheung,
      label: cheung === '0' ? 'B1층' : `${cheung}층`,
    }))
    .sort((a, b) => (a.value === '0' ? -1 : parseInt(a.value) - parseInt(b.value)));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: '#f0f0ff',
      boxShadow: 'none',
      borderRadius: '5px',
      height: '40px',
      minHeight: '40px',
      width: '160px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#bdafff' : 'white',
      color: 'black',
    }),
  };

  const handleSearch = () => {
    const results = allStores.filter((store) => {
      const matchesSearchTerm = store.storeName.includes(searchTerm);
      const modifiedBuildingDong = getModifiedBuildingDong(store.buildingName, store.buildingDong);
      const matchesDong = selectedDong
        ? modifiedBuildingDong === selectedDong.value
        : true;
      const matchesCheung = selectedCheung
        ? store.floorNumber === selectedCheung.value
        : true;
      return matchesSearchTerm && matchesDong && matchesCheung;
    });
    setFilteredStores(results);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (selectedDong || selectedCheung || searchTerm) {
      handleSearch();
    } else {
      setFilteredStores(allStores);
    }
  }, [selectedDong, selectedCheung, searchTerm, allStores]);

  return (
    <div className="searchbar-container">
      <div className="search-header">
        <span className="emphasize">매장검색</span>
      </div>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="매장을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <div className="search-btn" onClick={handleSearch}>
            <img width="20" height="20" src={Findimogi} alt="search" />
          </div>
        </div>
      </div>
      <div className="select-container">
        <Select
          value={selectedDong}
          onChange={setSelectedDong}
          options={dongOptions}
          placeholder="구역선택"
          classNamePrefix="custom-select"
          className="select-box"
          styles={customStyles}
        />
        <Select
          value={selectedCheung}
          onChange={setSelectedCheung}
          options={cheungOptions}
          placeholder="층 선택"
          classNamePrefix="custom-select"
          className="select-box"
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default ListSearchBar;