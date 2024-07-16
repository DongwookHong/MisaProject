// import React, { useState, useRef } from 'react';
// import Guide_demo from './Guide_demo';
// import FloorSpecific from './FloorSpecific';

// function PinMove() {
//   const [shouldDrawDot, setShouldDrawDot] = useState(false);
//   const canvasRef = useRef(null);

//   const handleIconClick = (item) => {
//     console.log(`${item} 위치로 이동합니다.`);
//     setShouldDrawDot(true);
//   };

//   return (
//     <div>
//       <FloorSpecific canvasRef={canvasRef} />
//       <Guide_demo onIconClick={handleIconClick} />
//     </div>
//   );
// }

// export default PinMove;

import React, { useState, useRef } from 'react';
import Guide_demo from './Guide_demo';
import FloorSpecific from './FloorSpecific';


function PinMove({ floorData, selectedFloorData }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const canvasRef = useRef(null);

  const handleIconClick = (item) => {
    console.log(`${item} 위치로 이동합니다.`);
    setSelectedItem(item);
// =======
// function PinMove({ filteredData }) {
//   const [pinPosition, setPinPosition] = useState(null);
//   const canvasRef = useRef(null);

//   const handleIconClick = (item) => {
//     console.log(`${item.name} 위치로 이동합니다.`);
//     // 여기서 item의 위치 정보를 사용하여 핀 위치를 설정합니다.
//     // 예를 들어, item에 x와 y 좌표가 있다고 가정합니다.
//     // setPinPosition({ x: item.x, y: item.y });
// >>>>>>> main
  };

  return (
    <div>

      <FloorSpecific canvasRef={canvasRef} selectedItem={selectedItem} selectedFloorData={selectedFloorData} />
      <Guide_demo onIconClick={handleIconClick} floorData={selectedFloorData ? [selectedFloorData] : floorData} />
// =======
//       <FloorSpecific canvasRef={canvasRef} pinPosition={pinPosition} />
//       <Guide_demo data={filteredData} onIconClick={handleIconClick} />
// >>>>>>> main
    </div>
  );
}

export default PinMove;