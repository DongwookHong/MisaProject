import React, { useState, useRef } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import FS_FloorSpecific from './FS_FloorSpecific';
import GuideFloor from './GuideFloor';
import MainFooter from '../Fix/MainFooter';

export async function mainComponentLoader({ params }) {
  const { building, wing } = params;
  try {
    const response = await fetch(
      // `https://api.misarodeo.com/api/building/${encodeURIComponent(building)}/${encodeURIComponent(
        `/api/building/${encodeURIComponent(building)}/${encodeURIComponent(
        wing
      )}`,
      {
        headers: {
          accept: '*/*',
          'x-api-key': 'testapikey',
        },
      }
    );
    if (response.ok) {
      const rawData = await response.json();
      if (rawData.length === 0) {
        // 데이터가 비어있으면 유효하지 않은 building/wing으로 간주
        throw new Response('Not Found', { status: 404 });
      }
      const parsedData = rawData.map((item) => JSON.parse(item));
      return parsedData;
    } else {
      throw new Response('Not Found', { status: 404 });
    }
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
}

function MainComponent() {
  const floorData = useLoaderData();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedFloorData, setSelectedFloorData] = useState(floorData[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFacility, setIsFacility] = useState(true);

  const { building, wing } = useParams();
  // 추가된 부분: 데이터 유효성 검사
  React.useEffect(() => {
    if (!floorData || floorData.length === 0) {
      navigate('/404');
    }
  }, [floorData, navigate]);

  const handleFloorChange = (floorNumber) => {
    const newSelectedFloorData = floorData.find(
      (floor) => floor.floorNumber === floorNumber
    );
    setSelectedFloorData(newSelectedFloorData);
    setSelectedItems([]);
  };

  const handleIconClick = (blockIds, isFacilityClick = true) => {
    console.log('Clicked blockIds:', blockIds, 'isFacility:', isFacilityClick);
    setSelectedItems(Array.isArray(blockIds) ? blockIds : [blockIds]);
    setIsFacility(isFacilityClick);
  };

  // 데이터가 없으면 아무것도 렌더링하지 않음
  if (!floorData || floorData.length === 0) {
    return null;
  }

  return (
    <div>
      <FS_FloorSpecific
        canvasRef={canvasRef}
        selectedItems={selectedItems}
        selectedFloorData={selectedFloorData}
        floorData={floorData}
        onFloorChange={handleFloorChange}
        isFacility={isFacility}
      />
      <GuideFloor
        selectedFloorData={selectedFloorData}
        onIconClick={handleIconClick}
      />
      <MainFooter />
    </div>
  );
}

export default MainComponent;
