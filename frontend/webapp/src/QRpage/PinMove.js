import React, { useState, useRef, useEffect } from "react";
import Guide from "./Guide";
import FloorSpecific from "./FloorSpecific";

function PinMove({ floorData, selectedFloorData, currentLocation }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 층수가 변경될 때마다 선택된 편의시설과 매장 초기화
    setSelectedFacility(null);
    setSelectedStore(null);
  }, [selectedFloorData]);

  const handleIconClick = (item, type) => {
    if (type === "facility") {
      console.log(`${item} 위치를 표시합니다.`);
      setSelectedFacility((prev) => (prev === item ? null : item));
      setSelectedStore(null);
    } else if (type === "store") {
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
