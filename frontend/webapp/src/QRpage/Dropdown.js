import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import '../style/QRpage/Dropdown.css';

function DropdownMenu({ floorData, onFloorSelect }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const { id } = useParams();

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
    if (id && id.length >= 2) {
      const building = parseInt(id[0]);
      const floor = parseInt(id[1]);

      let buildingValue;
      switch (building) {
        case 1:
          buildingValue = '힐스테이트 A';
          break;
        case 2:
          buildingValue = '힐스테이트 B';
          break;
        case 3:
          buildingValue = '롯데캐슬';
          break;
        default:
          buildingValue = null;
      }

      if (buildingValue) {
        const buildingOption = buildingOptions.find(
          (option) => option.value === buildingValue
        );
        setSelectedBuilding(buildingOption);
      }

      if (!isNaN(floor)) {
        const floorOption = {
          value: floor.toString(),
          label: floor === 0 ? 'B1층' : `${floor}층`,
        };
        setSelectedFloor(floorOption);
      }
    }
  }, [id, buildingOptions]);

  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      const selectedFloorData = floorData.find(
        (floor) =>
          `${floor.buildingName} ${floor.buildingDong}` ===
            selectedBuilding.value && floor.floorNumber === selectedFloor.value
      );
      onFloorSelect(selectedFloorData);
    }
  }, [selectedBuilding, selectedFloor, floorData, onFloorSelect]);

  const handleBuildingChange = (selectedOption) => {
    setSelectedBuilding(selectedOption);
    setSelectedFloor(null);
    onFloorSelect(null);
  };

  const handleFloorChange = (selectedOption) => {
    setSelectedFloor(selectedOption);
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
