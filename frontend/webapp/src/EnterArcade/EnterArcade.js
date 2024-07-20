import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Advertise from '../Fix/Advertise';
import DropDown from './DropDownMenu.js';
import PinMove from '../QRpage/PinMove';
import MainFooter from '../Fix/MainFooter';
import jsonData from '../qrdata.json';
import MainHeader from '../Fix/MainHeader.js';

const API_KEY = process.env.REACT_APP_API_KEY;

function EnterArcade() {
  const { id } = useParams();

  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const location = useLocation();
  const [floorData, setFloorData] = useState([]);
  const [selectedFloorData, setSelectedFloorData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://api.misarodeo.com/api/qr-page', {
        const response = await axios.get('/api/qr-page', {
          headers: {
            accept: '*/*',
            'x-api-key': API_KEY,
          },
        });
        const parsedData = response.data.map((item) => JSON.parse(item));
        setFloorData(parsedData);
        setIsLoading(false);

        if (id) {
          const building =
            id.charAt(0) === '1' ? 'A' : id.charAt(0) === '2' ? 'B' : 'C';
          const buildingName = id.charAt(0) === '3' ? '롯데캐슬' : '힐스테이트';
          const floor = id.charAt(1);

          const relevantFloorData = parsedData.find(
            (data) =>
              data.buildingName === buildingName &&
              data.buildingDong === building &&
              data.floorNumber === floor
          );

          if (relevantFloorData) {
            setSelectedFloorData(relevantFloorData);
            // 여기서 currentLocation을 id로 직접 설정합니다.
            setCurrentLocation({ blockId: id });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      <PinMove
        floorData={floorData}
        selectedFloorData={selectedFloorData}
        currentLocation={currentLocation}
      />
      <MainFooter />
    </div>
  );
}

export default EnterArcade;
