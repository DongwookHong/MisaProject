






import React, { useState, useRef, useEffect, useMemo } from 'react';
import LocSearch from './LocSearch';
import AdvertiseQR from '../Fix/AdvertiseQR';
import axios from 'axios';
import DropDown from './Dropdown.js';
import MapLocation from './MapLocation';
import Guide from './Guide';
import Guide_demo from './Guide_demo';

import PinMove from './PinMove';
import MainFooter from '../Fix/MainFooter';
import jsonData from '../qrdata.json';

const API_KEY = process.env.REACT_APP_API_KEY;

function QrPage() {

  const [floorData, setFloorData] = useState([]);
  const [selectedFloorData, setSelectedFloorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/qr-page', {
          headers: {
            'accept': '*/*',
            'x-api-key': API_KEY
          }
        });
        const parsedData = response.data.map(item => JSON.parse(item));
        setFloorData(parsedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFloorSelect = (floorData) => {
    setSelectedFloorData(floorData);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
// ======= main
//   const [dong, setDong] = useState('');
//   const [cheung, setCheung] = useState('');

//   // const filteredData = jsonData
//   //   .filter(
//   //     (item) =>
//   //       `${item.building_name} ${item.building_dong}` === dong &&
//   //       item.floor_number.toString() === cheung
//   //   )
//   //   .flatMap((item) => item.data); // => 기존
//   // const filteredData = jsonData.flatMap((item) => {
//   //   if (
//   //     (!dong || `${item.building_name} ${item.building_dong}` === dong) &&
//   //     (!cheung || item.floor_number.toString() === cheung)
//   //   ) {
//   //     return item.data;
//   //   }
//   //   return [];
//   // });
//   const filteredData = useMemo(() => {
//     const allItems = jsonData.flatMap((item) => {
//       if (
//         (!dong || `${item.building_name} ${item.building_dong}` === dong) &&
//         (!cheung || item.floor_number.toString() === cheung)
//       ) {
//         return item.data;
//       }
//       return [];
//     });

//     const stores = allItems.filter((item) => item.type === 'store');

//     // 편의시설 중복 제거
//     const facilitiesMap = new Map();
//     allItems.forEach((item) => {
//       if (item.type === 'facility') {
//         if (!facilitiesMap.has(item.name)) {
//           facilitiesMap.set(item.name, item);
//         }
//       }
//     });
//     const facilities = Array.from(facilitiesMap.values());

//     return [...stores, ...facilities];
//   }, [dong, cheung]);
//   const handleIconClick = (item) => {
//     console.log(`${item} 위치로 이동합니다.`);
//   };

//   useEffect(() => {
//     console.log('동:', dong);
//     console.log('층:', cheung);
//     console.log('필터링된 데이터:', filteredData);
//   }, [dong, cheung, filteredData]);
// >>>>>>> main

  return (
    <div>
      <LocSearch floorData={floorData} />
      <AdvertiseQR />

      <DropDown floorData={floorData} onFloorSelect={handleFloorSelect} />
      <PinMove floorData={floorData} selectedFloorData={selectedFloorData} />

      <MainFooter />
    </div>
  );
}

export default QrPage;