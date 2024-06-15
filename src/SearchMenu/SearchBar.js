// SearchBar.js
import React, { useState } from 'react';
import '../style/SearchMenu/SearchBar.css';
import Select from 'react-select';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDong, setSelectedDong] = useState(null);
  const [selectedCheung, setSelectedCheung] = useState(null);

  const dongOptions = [
    { value: 'dong1', label: '힐스테이트 A' },
    { value: 'dong2', label: '힐스테이트 B' },
    { value: 'dong3', label: '롯데캐슬' },
  ];

  const cheungOptions = [
    { value: 'cheung2', label: 'B2' },
    { value: 'cheung3', label: 'B1' },
    { value: 'cheung4', label: '1F' },
    { value: 'cheung5', label: '2F' },
    { value: 'cheung6', label: '3F' },
  ];

  return (
    <div className="searchbar-container">
      <div className="search-header">매장 검색</div>
      <div className="search-container">
        <div className="search-input-container">
          <i className="search-icon">🔍</i>
          <input
            type="text"
            placeholder="원하는 매장을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
        />
        <Select
          value={selectedCheung}
          onChange={setSelectedCheung}
          options={cheungOptions}
          placeholder="층 선택"
          classNamePrefix="custom-select"
          className="select-box"
        />
      </div>
    </div>
  );
};

export default SearchBar;
