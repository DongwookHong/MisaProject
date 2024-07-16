import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocSearch from './LocSearch';
import AdvertiseQR from '../Fix/AdvertiseQR';
import DropDown from './Dropdown';
import PinMove from './PinMove';
import MainFooter from '../Fix/MainFooter';

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