import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import '../style/QRpage/Dropdown.css';

function DropdownMenu({ floorData, onFloorSelect }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const buildingOptions = useMemo(() => {
    const uniqueBuildings = [
      ...new Set(
        floorData.map((floor) => `${floor.buildingName} ${floor.buildingDong}`)
      ),
    ];
    return uniqueBuildings.map((building) => {
      const [name, dong] = building.split(' ');
      let label;
      if (name === '롯데캐슬') {
        label = '롯데캐슬';
      } else if (name === '힐스테이트' && dong === 'A') {
        label = '힐스테이트 12BL';
      } else if (name === '힐스테이트' && dong === 'B') {
        label = '힐스테이트 11BL';
      } else {
        label = building;
      }
      return {
        value: building,
        label: label,
      };
    });
  }, [floorData]);

  const floorOptions = useMemo(() => {
    if (!selectedBuilding) return [];
    const floors = floorData
      .filter(
        (floor) =>
          `${floor.buildingName} ${floor.buildingDong}` ===
          selectedBuilding.value
      )
      .map((floor) => ({
        value: floor.floorNumber,
        label: floor.floorNumber === '0' ? 'B1층' : `${floor.floorNumber}층`,
      }));
    return floors.sort((a, b) =>
      a.value === '0' ? -1 : parseInt(a.value) - parseInt(b.value)
    );
  }, [floorData, selectedBuilding]);

  useEffect(() => {
    // 선택된 동이 변경될 때마다 층 선택 초기화
    setSelectedFloor(null);
  }, [selectedBuilding]);

  const handleBuildingChange = (selectedOption) => {
    setSelectedBuilding(selectedOption);
    // 층 선택 초기화
    setSelectedFloor(null);
    // 층 선택이 초기화되었으므로 onFloorSelect를 null로 호출
    onFloorSelect(null);
  };

  const handleFloorChange = (selectedOption) => {
    setSelectedFloor(selectedOption);
    const selectedFloorData = floorData.find(
      (floor) =>
        `${floor.buildingName} ${floor.buildingDong}` ===
          selectedBuilding.value && floor.floorNumber === selectedOption.value
    );
    onFloorSelect(selectedFloorData);
  };

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
        <label className="announce" htmlFor="building-select">
          동별 안내
        </label>
        <Select
          id="building-select"
          options={buildingOptions}
          value={selectedBuilding}
          onChange={handleBuildingChange}
          classNamePrefix="react-select"
          placeholder="동 선택"
          styles={customStyles}
        />
      </div>
      <div className="dropdown">
        <label className="announce" htmlFor="floor-select">
          층별 안내
        </label>
        <Select
          id="floor-select"
          options={floorOptions}
          value={selectedFloor}
          onChange={handleFloorChange}
          classNamePrefix="react-select"
          placeholder="층 선택"
          isDisabled={!selectedBuilding}
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default DropdownMenu;
