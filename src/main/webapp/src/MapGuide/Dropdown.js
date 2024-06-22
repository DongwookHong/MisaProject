import React, { useState } from 'react';
import Select from 'react-select';
import '../style/MapGuide/Dropdown.css';

function DropdownMenu() {
  const [dong, setDong] = useState('');
  const [cheung, setCheung] = useState('');

  const dongOptions = [
    { value: 'dong1', label: '힐스테이트 A' },
    { value: 'dong2', label: '힐스테이트 B' },
    { value: 'dong3', label: '롯데캐슬' },
  ];

  const cheungOptions = [
    { value: 'cheung-1', label: 'B2' },
    { value: 'cheung0', label: 'B1' },
    { value: 'cheung1', label: '1F' },
    { value: 'cheung2', label: '2F' },
    { value: 'cheung3', label: '3F' },
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
    <div className="dropdown-container">
      <div className="dropdown">
        <label className="announce" htmlFor="dong-select">
          동별 안내
        </label>
        <Select
          id="dong-select"
          options={dongOptions}
          value={dongOptions.find((option) => option.value === dong)}
          onChange={(selectedOption) => setDong(selectedOption.value)}
          classNamePrefix="react-select"
          placeholder="동을 선택하세요"
          styles={customStyles}
        />
      </div>

      <div className="dropdown">
        <label className="announce" htmlFor="cheung-select">
          층별 안내
        </label>
        <Select
          id="cheung-select"
          options={cheungOptions}
          value={cheungOptions.find((option) => option.value === cheung)}
          onChange={(selectedOption) => setCheung(selectedOption.value)}
          classNamePrefix="react-select"
          placeholder="층을 선택하세요"
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default DropdownMenu;
