import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import '../style/QRpage/Dropdown.css';

function DropdownMenu({ floorData, onFloorSelect }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  const buildingOptions = useMemo(() => {
    const uniqueBuildings = [
      ...new Set(
        floorData.map((floor) => `${floor.buildingName} ${floor.buildingDong}`)
      ),
    ];
    return uniqueBuildings.map((building) => {
      const [name, dong] = building.split(' ');
      const label = name === '롯데캐슬' ? '롯데캐슬' : building;
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
          `${floor.buildingName} ${floor.buildingDong}` === selectedBuilding
      )
      .map((floor) => ({
        value: floor.floorNumber,
        label: floor.floorNumber === '0' ? 'B1층' : `${floor.floorNumber}층`,
      }));
    return floors.sort((a, b) =>
      a.value === '0' ? -1 : parseInt(a.value) - parseInt(b.value)
    );
  }, [floorData, selectedBuilding]);

  const handleBuildingChange = (selectedOption) => {
    setSelectedBuilding(selectedOption.value);
    setSelectedFloor('');
  };

  const handleFloorChange = (selectedOption) => {
    setSelectedFloor(selectedOption.value);
    const selectedFloorData = floorData.find(
      (floor) =>
        `${floor.buildingName} ${floor.buildingDong}` === selectedBuilding &&
        floor.floorNumber === selectedOption.value
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
          value={buildingOptions.find(
            (option) => option.value === selectedBuilding
          )}
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
          value={floorOptions.find((option) => option.value === selectedFloor)}
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
