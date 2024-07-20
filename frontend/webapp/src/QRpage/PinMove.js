import React, { useState, useRef } from 'react';
import Guide from './Guide_demo';
import FloorSpecific from './FloorSpecific';

function PinMove({ floorData, selectedFloorData, currentLocation }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const canvasRef = useRef(null);

  const handleIconClick = (item, type) => {
    if (type === 'facility') {
      console.log(`${item} 위치를 표시합니다.`);
      setSelectedFacility(prev => prev === item ? null : item);
      setSelectedStore(null);
    } else if (type === 'store') {
      console.log(`${item} 매장 위치를 표시합니다.`);
      setSelectedStore(item);
      setSelectedFacility(null);
    }
  };

  return (
    <div>
      <FloorSpecific 
        canvasRef={canvasRef} 
        selectedFacility={selectedFacility}
        selectedStore={selectedStore}
        selectedFloorData={selectedFloorData}
        currentLocation={currentLocation}
      />
      <Guide
        onIconClick={handleIconClick}
        floorData={selectedFloorData ? [selectedFloorData] : floorData}
        selectedFacility={selectedFacility}
        selectedStore={selectedStore}
      />
    </div>
  );
}

export default PinMove;
