import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Advertise from '../Fix/Advertise';
import DropDown from './DropDownMenu.js';
import PinMove from '../QRpage/PinMove';
import MainFooter from '../Fix/MainFooter';
import jsonData from '../qrdata.json';
import MainHeader from '../Fix/MainHeader.js';

function EnterArcade() {
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialBuilding = searchParams.get('building');
    const initialFloor = searchParams.get('floor');

    if (initialBuilding) setBuilding(initialBuilding);
    if (initialFloor) setFloor(initialFloor);
  }, [location]);

  const filteredData = useMemo(() => {
    const allItems = jsonData.flatMap((item) => {
      if (
        (!building ||
          `${item.building_name} ${item.building_dong}` === building) &&
        (!floor || item.floor_number.toString() === floor)
      ) {
        return item.data;
      }
      return [];
    });

    const stores = allItems.filter((item) => item.type === 'store');

    const facilitiesMap = new Map();
    allItems.forEach((item) => {
      if (item.type === 'facility') {
        if (!facilitiesMap.has(item.name)) {
          facilitiesMap.set(item.name, item);
        }
      }
    });
    const facilities = Array.from(facilitiesMap.values());

    return [...stores, ...facilities];
  }, [building, floor]);

  // useEffect(() => {
  //   console.log('건물:', building);
  //   console.log('층:', floor);
  //   console.log('필터링된 데이터:', filteredData);
  // }, [building, floor, filteredData]);

  return (
    <div>
      <MainHeader />
      <Advertise />
      <DropDown
        setBuilding={setBuilding}
        setFloor={setFloor}
        initialBuilding={building}
        initialFloor={floor}
      />
      {/* <PinMove filteredData={filteredData} /> */}
      <MainFooter />
    </div>
  );
}

export default EnterArcade;
