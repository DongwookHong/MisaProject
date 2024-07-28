import React, { useState, useRef, useCallback } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import FS_FloorSpecific from './FS_FloorSpecific';
import GuideFloor from './GuideFloor';
import MainFooter from '../Fix/MainFooter';

export async function mainComponentLoader({ params }) {
  const { building, wing } = params;
  try {
    const response = await fetch(
      `/api/building/${encodeURIComponent(building)}/${encodeURIComponent(wing)}`,
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

  React.useEffect(() => {
    if (!floorData || floorData.length === 0) {
      navigate('/404');
    }
  }, [floorData, navigate]);

  const handleFloorChange = useCallback((floorNumber) => {
    const newSelectedFloorData = floorData.find(
      (floor) => floor.floorNumber === floorNumber
    );
    if (newSelectedFloorData && newSelectedFloorData !== selectedFloorData) {
      console.log("Changing floor to:", floorNumber);
      console.log("New floor data:", newSelectedFloorData);
      setSelectedFloorData(newSelectedFloorData);
      setSelectedItems([]);
    }
  }, [floorData, selectedFloorData]);

  const handleIconClick = useCallback((blockIds, isFacilityClick = true) => {
    console.log('Clicked blockIds:', blockIds, 'isFacility:', isFacilityClick);
    setSelectedItems(Array.isArray(blockIds) ? blockIds : [blockIds]);
    setIsFacility(isFacilityClick);
  }, []);

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