import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../style/QRpage/Dropdown.css';
import jsonData from '../qrdata.json';

function DropdownMenu({ setDong, setCheung }) {
  const [dongOptions, setDongOptions] = useState([]);
  const [cheungOptions, setCheungOptions] = useState([]);

  useEffect(() => {
    if (jsonData && Array.isArray(jsonData)) {
      const uniqueDongs = Array.from(
        new Set(
          jsonData.map((item) => `${item.building_name} ${item.building_dong}`)
        )
      );
      const uniqueCheungs = Array.from(
        new Set(jsonData.map((item) => item.floor_number))
      );

      setDongOptions(uniqueDongs.map((dong) => ({ value: dong, label: dong })));
      setCheungOptions(
        uniqueCheungs.map((cheung) => ({
          value: cheung.toString(),
          label: cheung === 0 ? 'B1' : `${cheung}층`,
        }))
      );
    } else {
      console.error('jsonData is not defined or not an array');
    }
  }, []);

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
          onChange={(selectedOption) => setCheung(selectedOption.value)}
          classNamePrefix="react-select"
          placeholder="층 선택"
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default DropdownMenu;
