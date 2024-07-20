import React, { useState, useRef } from 'react';
import Guide from './Guide';
import FloorSpecific from './FloorSpecific';

function PinMove({ floorData, selectedFloorData, currentLocation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const canvasRef = useRef(null);

  const handleIconClick = (item) => {
    console.log(`${item} 위치로 이동합니다.`);
    setSelectedItem(item);
  };

  return (
    <div>
      <FloorSpecific
        canvasRef={canvasRef}
        selectedItem={selectedItem}
        selectedFloorData={selectedFloorData}
        currentLocation={currentLocation}
      />
      <Guide
        onIconClick={handleIconClick}
        floorData={selectedFloorData ? [selectedFloorData] : floorData}
      />
    </div>
  );
}

export default PinMove;
