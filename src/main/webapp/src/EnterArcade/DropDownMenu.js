import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../style/QRpage/Dropdown.css';
import jsonData from '../qrdata.json';

function Dropdown({ setBuilding, setFloor, initialBuilding, initialFloor }) {
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [allFloorOptions, setAllFloorOptions] = useState([]);
  const [filteredFloorOptions, setFilteredFloorOptions] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  useEffect(() => {
    if (jsonData && Array.isArray(jsonData)) {
      const uniqueBuildings = Array.from(
        new Set(
          jsonData.map((item) => `${item.building_name} ${item.building_dong}`)
        )
      );
      const buildingOpts = uniqueBuildings.map((building) => ({
        value: building,
        label: building,
      }));
      setBuildingOptions(buildingOpts);

      const allFloors = Array.from(
        new Set(jsonData.map((item) => item.floor_number))
      );
      const floorOpts = allFloors.map((floor) => ({
        value: floor.toString(),
        label: floor === 0 ? 'B1' : `${floor}층`,
      }));
      setAllFloorOptions(floorOpts);
      setFilteredFloorOptions(floorOpts);

      if (initialBuilding) {
        const initialBuildingOption = buildingOpts.find(
          (opt) => opt.value === initialBuilding
        );
        if (initialBuildingOption) {
          setSelectedBuilding(initialBuildingOption);
          setBuilding(initialBuildingOption.value);
          updateFloorOptions(initialBuildingOption.value);
        }
      }

      if (initialFloor) {
        const initialFloorOption = floorOpts.find(
          (opt) => opt.value === initialFloor
        );
        if (initialFloorOption) {
          setSelectedFloor(initialFloorOption);
          setFloor(initialFloorOption.value);
        }
      }
    } else {
      console.error('jsonData is not defined or not an array');
    }
  }, [initialBuilding, initialFloor, setBuilding, setFloor]);

  const updateFloorOptions = (building) => {
    if (building) {
      const floors = jsonData
        .filter(
          (item) => `${item.building_name} ${item.building_dong}` === building
        )
        .map((item) => item.floor_number.toString());
      setFilteredFloorOptions(
        allFloorOptions.filter((opt) => floors.includes(opt.value))
      );
    } else {
      setFilteredFloorOptions(allFloorOptions);
    }
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
          건물/동 선택
        </label>
        <Select
          id="building-select"
          options={buildingOptions}
          value={selectedBuilding}
          onChange={(selectedOption) => {
            setSelectedBuilding(selectedOption);
            setBuilding(selectedOption ? selectedOption.value : '');
            updateFloorOptions(selectedOption ? selectedOption.value : null);
          }}
          classNamePrefix="react-select"
          placeholder="동 선택"
          styles={customStyles}
          isClearable
        />
      </div>

      <div className="dropdown">
        <label className="announce" htmlFor="floor-select">
          층 선택
        </label>
        <Select
          id="floor-select"
          options={filteredFloorOptions}
          value={selectedFloor}
          onChange={(selectedOption) => {
            setSelectedFloor(selectedOption);
            setFloor(selectedOption ? selectedOption.value : '');
          }}
          classNamePrefix="react-select"
          placeholder="층 선택"
          styles={customStyles}
          isClearable
        />
      </div>
    </div>
  );
}

export default Dropdown;
