import React, { useState, useRef, useEffect, useMemo } from 'react';
import Advertise from '../Fix/Advertise';

import DropDown from '../QRpage/Dropdown.js';
import MapLocation from '../QRpage/MapLocation';

import Guide_demo from '../QRpage/Guide_demo';
import PinMove from '../QRpage/PinMove';
import MainFooter from '../Fix/MainFooter';
import jsonData from '../qrdata.json';
import MainHeader from '../Fix/MainHeader.js';

function EnterArcade() {
  const [dong, setDong] = useState('');
  const [cheung, setCheung] = useState('');

  const filteredData = useMemo(() => {
    const allItems = jsonData.flatMap((item) => {
      if (
        (!dong || `${item.building_name} ${item.building_dong}` === dong) &&
        (!cheung || item.floor_number.toString() === cheung)
      ) {
        return item.data;
      }
      return [];
    });

    const stores = allItems.filter((item) => item.type === 'store');

    // 편의시설 중복 제거
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
  }, [dong, cheung]);
  const handleIconClick = (item) => {
    console.log(`${item} 위치로 이동합니다.`);
  };

  useEffect(() => {
    console.log('동:', dong);
    console.log('층:', cheung);
    console.log('필터링된 데이터:', filteredData);
  }, [dong, cheung, filteredData]);

  return (
    <div>
      <MainHeader />
      <Advertise />
      <DropDown setDong={setDong} setCheung={setCheung} />
      {/* <Guide_demo data={filteredData} onIconClick={handleIconClick} /> */}
      <PinMove filteredData={filteredData} />
      <MainFooter />
    </div>
  );
}

export default EnterArcade;
