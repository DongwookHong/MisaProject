// SearchBar.js
import React, { useState } from 'react';
import '../style/SearchMenu/SearchBar.css';
import Select from 'react-select';
import Findimogi from '../asset/tool/searchbtn3.png';

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
            className="search-input"
          />
          <div className="search-btn">
            <img width="20" height="20" src={Findimogi}></img>
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

export default SearchBar;
